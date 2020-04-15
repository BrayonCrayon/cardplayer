using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace CardPlayer.Models
{
    [Serializable]
    public class UserCard
    {
        [Key]
        [Column("id")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        
        [Column("user_id")]
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        
        [Column("game_id")]
        [ForeignKey("Game")]
        public int GameId { get; set; }
        public Game Game { get; set; }
        
        [Column("card_id")]
        [ForeignKey("Card")]
        public int CardId { get; set; }
        public Card Card { get; set; }
        
        [Column("selected")]
        [DefaultValue(false)]
        public bool Selected { get; set; }
        
        [Column("deleted_at")]
        [DataType(DataType.Date)]
        public DateTime? DeletedAt { get; set; }
    }
}