using System.Collections.Generic;
using CardPlayer.DAL;
using CardPlayer.DTOs;
using CardPlayer.Models;
using CardPlayer.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CardPlayer.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/cards")]
    [Produces("application/json")]
    public class UserCardController : ControllerBase
    {
        private readonly UserCardDal _userCardDal;

        public UserCardController(UserCardDal userCardDal)
        {
            _userCardDal = userCardDal;
        }
        
        [HttpGet]
        public UserHandDto Get([FromQuery] UserCardViewModel userCardVm)
        {
            return _userCardDal.GetUserCards(userCardVm);
        }
        
        [HttpGet("any-selected-cards")]
        public ActionResult<bool> AnyCardsSelected([FromQuery] UserCardViewModel userCardVm)
        {
            return _userCardDal.AnyCardsSelected(userCardVm.userId, userCardVm.gameId);
        }

        [HttpPut]
        public ActionResult<bool> SelectCards([FromBody] UserCardViewModel userCardVm)
        {
            return _userCardDal.SelectUserCards(userCardVm);
        }

        [HttpDelete]
        public IEnumerable<UserCard> DeleteCards([FromBody] UserCardViewModel userCardVm)
        {
            var cardsDeleted = _userCardDal.SoftDeleteUserCards(userCardVm);
            return cardsDeleted < 1 ? _userCardDal.GrabNewUserCards(userCardVm) : new List<UserCard>();
        }
        
        [HttpGet("selected-cards")]
        public List<UserCard> GetSelectedCards([FromQuery] UserCardViewModel userCardVm)
        {
            return _userCardDal.GetSelectedCards(userCardVm);
        }
        

    }
}