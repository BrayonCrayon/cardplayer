using CardPlayer.Models;

namespace CardPlayer.DTOs
{
    public class UserCardDto
    {
        public int Id { get; set; }
        
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        
        public int GameId { get; set; }
        public Game Game { get; set; }
        
        public int CardId { get; set; }
        public Card Card { get; set; }
        
        public bool Selected { get; set; }
    }
}