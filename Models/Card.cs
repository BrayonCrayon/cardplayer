using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CardPlayer.Models
{
    [System.Serializable]
    public class Card
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Column("card_type_id")]
        [ForeignKey("Type")]
        public int TypeId { get; set; }
        
        [Required]
        public CardType Type { get; set; }
        
        [Required]
        [Column("text", TypeName = "text")]
        public string Text { get; set; }
        
        [Column("pick")]
        public int? Pick { get; set; }
    }
}