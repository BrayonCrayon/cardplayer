using System.Collections.Generic;
using CardPlayer.DTOs;
using CardPlayer.Models;

namespace CardPlayer.ViewModels
{
    public class UserCardViewModel
    {
        public string userId { get; set; }
        public int gameId { get; set; }
        public bool isTurn { get; set; }
        public List<int> cardIds { get; set; }
    }
}