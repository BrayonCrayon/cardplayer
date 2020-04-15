using CardPlayer.Models;

namespace CardPlayer.DTOs
{
    public class CardDto
    {
        public int Id { get; set; }
        
        public int TypeId { get; set; }
        
        public CardType Type { get; set; }
        
        public string Text { get; set; }
        
        public int? Pick { get; set; }
    }
}