using System;

namespace CardPlayer.DTOs
{
    public class GameDto
    {

        public GameDto()
        {
        }

        public GameDto(int id, string name)
        {
            this.Id = id;
            this.Name = name;
        }
        

        public int Id { get; set; }
        
        public string Name { get; set; }
    }
}