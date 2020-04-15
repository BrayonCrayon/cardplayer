using System.Collections.Generic;
using System.Linq;
using System.Security.Permissions;
using CardPlayer.Data;
using CardPlayer.Models;
using Microsoft.AspNetCore.Mvc;

namespace CardPlayer.DAL
{
    public class UserCardDal
    {
        private readonly ApplicationDbContext _context;

        public UserCardDal(ApplicationDbContext context)
        {
            _context = context;
        }


        public IEnumerable<UserCard> getUserCards(int gameId, string userId)
        {
            // Get users cards if user already has been invited to the game.
            var cards = _context.UserCards.Where(userCard => userCard.GameId == gameId && userCard.UserId == userId);

            if (cards.Any())
            {
                return cards;
            }
            
            
            // Get new cards for user excluding all other cards that other users are using.
            //var takenCards = _context.UserCards.Select((cardId)).Where(userCard => userCard.GameId == gameId);
            
            
            return cards;
        }
        
    }
}