using System.Linq;
using CardPlayer.DAL;
using CardPlayer.Data;
using CardPlayer.DTOs;
using CardPlayer.Helpers;

namespace CardPlayer.Services
{
    public class GameViewModel
    {
        public string userId { get; set; }
        public GameDto game { get; set; }


    }
}