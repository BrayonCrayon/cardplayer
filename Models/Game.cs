using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CardPlayer.Models
{
    [System.Serializable]
    public class Game
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("id")]
        public int Id { get; set; }
        
        [Required]
        [Column("name")]
        [Index(IsUnique = true)]
        public string Name { get; set; }

        [Column("deleted_at")]
        [DataType(DataType.Date)]
        public DateTime? DeletedAt { get; set; }
    }
}