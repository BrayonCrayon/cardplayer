using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CardPlayer.Models
{
    public class CardType
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        
        [Column("name")]
        public string Name { get; set; }
    }
}