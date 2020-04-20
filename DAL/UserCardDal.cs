using System;
using System.Collections.Generic;
using System.Linq;
using CardPlayer.Data;
using CardPlayer.DTOs;
using CardPlayer.Models;
using CardPlayer.ViewModels;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Internal;

namespace CardPlayer.DAL
{
    public class UserCardDal
    {
        public const int HAND_LIMIT = 7;
        public const int BLACK_CARD_LIMIT = 1;
        public const string BLACK_CARD_TYPE = "black";
        public const string WHITE_CARD_TYPE = "white"; 
        private readonly ApplicationDbContext _context;

        public UserCardDal(ApplicationDbContext context)
        {
            _context = context;
        }

        public bool IsUserTurn(string userId, int gameId)
        {
            return _context.GameUsers
                .Single(g => g.UserId == userId && g.GameId == gameId)
                .IsTurn;
        }

        public List<UserCard> GetWhiteCards(string userId, int gameId)
        {
            return _context.UserCards
            .Where(userCard => userCard.GameId == gameId && userCard.UserId == userId)
            .Include(uc => uc.Card)
            .Where(userCard => userCard.Card.TypeId == GetWhiteType().Id)
            .ToList();
        }

        public UserCard GetBlackCard(int gameId)
        {
            return _context.UserCards
                .Where(userCard => userCard.GameId == gameId)
                .Include(uc => uc.Card)
                .Single(userCard => userCard.Card.TypeId == GetBlackType().Id);
        }

        public CardType GetBlackType()
        {
            return _context.CardTypes.FirstOrDefault(type => type.Name == BLACK_CARD_TYPE);
        }
        
        public CardType GetWhiteType()
        {
            return _context.CardTypes.FirstOrDefault(type => type.Name == WHITE_CARD_TYPE);
        }

        public IQueryable<UserCard> GetTakenCards(int gameId)
        {
            return _context.UserCards.Where(userCard => userCard.GameId == gameId);
        }

        public List<int> DrawNewWhiteCards(List<int> takenCards, int limit)
        {
            var whiteCards = _context.Cards
                .Where(c => c.TypeId == GetWhiteType().Id)
                .Where(c => !takenCards.Contains(c.Id))
                .IgnoreQueryFilters()
                .Select(c => c.Id)
                .ToList();

            var random = new Random();
            var whiteCardsToDraw = new List<int>();
            for (var i = 0; i < limit; ++i)
            {
                var cardIdx = random.Next(0, whiteCards.Count - 1);
                whiteCardsToDraw.Add(whiteCards[cardIdx]);
                whiteCards.RemoveAt(cardIdx);
            }

            return whiteCardsToDraw;
        }

        public int DrawNewBlackCard(List<int> usedCards)
        {
            var blackCards = _context.Cards
                .Where(c => c.TypeId == GetBlackType().Id)
                .Where(c => !usedCards.Contains(c.Id))
                .IgnoreQueryFilters()
                .Select(c => c.Id)
                .ToList();
            
            var random = new Random();
            return blackCards[random.Next(0, blackCards.Count - 1)];
        }

        public List<UserCard> GetNewWhiteCards(List<int> takenCards, int gameId, string userId, int limit = HAND_LIMIT)
        {
            var drawnCardIds = DrawNewWhiteCards(takenCards, limit);
            
            var usersHand = new List<UserCard>();

            foreach (var drawnCardId in drawnCardIds)
            {
                usersHand.Add(new UserCard
                {
                    CardId = drawnCardId,
                    GameId = gameId,
                    UserId = userId
                });
            }
            
            _context.UserCards.AddRange(usersHand);
            _context.SaveChanges();

            return GetWhiteCards(userId, gameId);
        }

        public UserCard GetNewBlackCard(UserCardViewModel userCardVm, List<int> usedCards)
        {
            var drawnBlackCardId = DrawNewBlackCard(usedCards);

            var drawnBlackCard = new UserCard
            {
                UserId = userCardVm.userId,
                GameId = userCardVm.gameId,
                CardId = drawnBlackCardId
            };

            _context.UserCards.Add(drawnBlackCard);
            _context.SaveChanges();

            return GetBlackCard(userCardVm.gameId);
        }


        public UserHandDto GetUserCards(UserCardViewModel userCardVm)
        {
            var cardsInHand = new UserHandDto();
            var whiteCards = GetWhiteCards(userCardVm.userId, userCardVm.gameId);

            if (whiteCards.Any())
            {
                cardsInHand.whiteCards = whiteCards;
                cardsInHand.blackCard = GetBlackCard(userCardVm.gameId);
                return cardsInHand;
            }
            
            var takenCards = GetTakenCards(userCardVm.gameId)
                .IgnoreQueryFilters()
                .Select(userCard => userCard.CardId)
                .ToList();
            cardsInHand.whiteCards = GetNewWhiteCards(takenCards, userCardVm.gameId, userCardVm.userId);

            if (IsUserTurn(userCardVm.userId, userCardVm.gameId))
            {
                cardsInHand.blackCard = GetNewBlackCard(userCardVm, takenCards);
            }
            else
            {
                cardsInHand.blackCard = GetBlackCard(userCardVm.gameId);
            }

            return cardsInHand;
        }
        
        public bool AnyCardsSelected(string userId, int gameId)
        {
            var selectedCards = _context.UserCards
                .Where(userCard => userCard.GameId == gameId)
                .Where(userCard => userCard.UserId == userId)
                .Where(uCard => uCard.Selected);

            return selectedCards.Any();
        }
        
        public bool SelectUserCards(UserCardViewModel userCardVm)
        {
            if (AnyCardsSelected(userCardVm.userId, userCardVm.gameId))
            {
                return true;
            }
            
            foreach (var cardId in userCardVm.cardIds)
            {
                try
                {
                    var userCardToSelect = _context.UserCards.Single(userCard =>
                        userCard.CardId == cardId && userCard.GameId == userCardVm.gameId &&
                        userCard.UserId == userCardVm.userId);
                    userCardToSelect.Selected = true;
                    _context.SaveChanges();
                }
                catch (Exception)
                {
                    return false;
                }
            }

            return true;
        }
        
        public int SoftDeleteUserCards(UserCardViewModel userCardVm)
        {
            foreach (var cardId in userCardVm.cardIds)
            {
                try
                {
                    var userCardToSelect = _context.UserCards.Single(userCard =>
                        userCard.CardId == cardId && userCard.GameId == userCardVm.gameId &&
                        userCard.UserId == userCardVm.userId);
                    userCardToSelect.DeletedAt = DateTime.Now;
                    _context.SaveChanges();
                }
                catch (Exception)
                {
                    return -1;
                }
            }

            return 1;
        }
        
        public IEnumerable<UserCard> GrabNewUserCards(UserCardViewModel userCardVm)
        {
            var usedCards = GetTakenCards(userCardVm.gameId).IgnoreQueryFilters().Select(usedCard => usedCard.CardId).ToList();
            var numOfCardsToDraw = HAND_LIMIT - GetTakenCards(userCardVm.gameId).Count(usedCard => usedCard.UserId == userCardVm.userId);
            return GetNewWhiteCards(usedCards, userCardVm.gameId, userCardVm.userId, numOfCardsToDraw);
        }
        
        public List<UserCard> GetSelectedCards(UserCardViewModel userCardVm)
        {
            var selectedCards = _context.UserCards.Where(uCard => uCard.GameId == userCardVm.gameId)
                .Include(uCard => uCard.Card)
                .Where(uCard => uCard.Selected)
                .ToList();
            return selectedCards;
        }
        
    }
}