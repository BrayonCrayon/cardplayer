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
            var cards = _context.UserCards.Select(userCard => userCard.UserId == userId && userCard.GameId == gameId);

            // Get new cards for user excluding all other cards that other users are using.
            return cards.All();
        }
        
    }
}