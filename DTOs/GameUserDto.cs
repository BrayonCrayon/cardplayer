using CardPlayer.Models;

namespace CardPlayer.DTOs
{
    public class GameUserDto
    {
        public int Id { get; set; }
        
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        
        public int GameId { get; set; }
        public Game Game { get; set; }
        
        public bool IsHost { get; set; }
        
        public bool IsTurn { get; set; }
    }
}