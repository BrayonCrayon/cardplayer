using System.Collections.Generic;
using CardPlayer.DAL;
using CardPlayer.Models;
using CardPlayer.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardPlayer.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class GameController : ControllerBase
    {
        private readonly GameDal _gameDal;

        public GameController(GameDal gameDal)
        {
            _gameDal = gameDal;
        }
        
        [HttpGet("is-turn")]
        public ActionResult<bool> IsUserTurn([FromQuery] GameViewModel gameVm)
        {
            return _gameDal.IsUserTurn(gameVm);
        }
        
        [HttpGet]
        public IEnumerable<Game> Get([FromQuery] GameViewModel gameVm)
        {
            return _gameDal.GetAllGames(gameVm);
        }

        [HttpGet("join")]
        public ActionResult<Game> JoinGame([FromQuery] GameViewModel gameVm)
        {
            var game = _gameDal.GetGameByName(gameVm.gameName);

             if (game == null)
             {
                 return NotFound();
             }
            
             _gameDal.AddUserToGame(game.Id, gameVm.userId);
             return game;
        }

        [HttpGet("{name}")]
        public ActionResult<Game> GetGameByName(string name)
        {
            var game = _gameDal.GetGameByName(name);

            if (game == null)
            {
                return NotFound();
            }
            
            return game;
        }

        [HttpPost]
        public ActionResult<Game> CreateGame([FromBody] GameViewModel gameVm)
        {
            var game = _gameDal.StoreGame();

            if (game == null)
            {
                return NotFound();
            }
            
            _gameDal.AddUserToGame(game.Id, gameVm.userId, true, true);
            return game;        
        }

    }
}