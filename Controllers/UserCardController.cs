using System.Collections.Generic;
using CardPlayer.DAL;
using CardPlayer.Models;
using CardPlayer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage;

namespace CardPlayer.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class UserCardController
    {
        private readonly UserCardDal _userCardDal;

        public UserCardController(UserCardDal userCardDal)
        {
            _userCardDal = userCardDal;
        }
        
        [HttpGet]
        public IEnumerable<UserCard> getCards([FromBody] UserCardViewModel userCardVm)
        {
            return _userCardDal.getUserCards(userCardVm.gameId, userCardVm.userId);
        }

    }
}