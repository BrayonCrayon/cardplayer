using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace CardPlayer.Models
{
    [System.Serializable]
    public class GameUser
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }
        
        [Column("user_id")]
        [ForeignKey("User")]
        public string UserId { get; set; }
        public virtual ApplicationUser User { get; set; }
        
        [Column("game_id")]
        [ForeignKey("Game")]
        public int GameId { get; set; }
        public Game Game { get; set; }
        
        [Column("is_turn")]
        public bool IsTurn { get; set; }
        
        [Column("is_host")]
        public bool IsHost { get; set; }
        
        [Column("deleted_at")]
        [DataType(DataType.Date)]
        public DateTime? DeletedAt { get; set; }
    }
}