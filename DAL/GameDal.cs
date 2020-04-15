﻿using System.Collections.Generic;
using System.Linq;
using CardPlayer.Data;
using CardPlayer.Helpers;
using CardPlayer.Models;

namespace CardPlayer.DAL
{
    public class GameDal
    {
        private readonly ApplicationDbContext _context;
        private const int GAME_NAME_LENGTH = 10;
        
        public GameDal(ApplicationDbContext context)
        {
            _context = context;
        }


        public IEnumerable<Game> GetAllGames()
        {
            return _context.Games;
        }

        public Game GetGameByName(string name)
        {
                return _context.Games.FirstOrDefault(g => g.Name.Equals(name));
        }
        
        public Game StoreGame()
        {
            var name = GetNewGameName();

            _context.Games.Add(new Game{
                Name = name,
            });
            _context.SaveChanges();

            return _context.Games.FirstOrDefault(g => g.Name.Equals(name));
        }
        
        public void AddUserToGame(int gameId, string userId, bool isTurn = false, bool isHost = false)
        {
            _context.GameUsers.Add(new GameUser
            {
                GameId = gameId,
                UserId = userId,
                IsTurn = isTurn,
                IsHost = isHost
            });
            _context.SaveChanges();
        }
        
        public string GetNewGameName()
        {
            var foundGameName = true;
            string generatedGameName; 
            do
            {
                generatedGameName = StringHelpers.randomString(GAME_NAME_LENGTH, false);
                foundGameName = _context.Games.Count(g => g.Name.Equals(generatedGameName)) > 0;
            } while (foundGameName);

            return generatedGameName;
        }
        
    }
}