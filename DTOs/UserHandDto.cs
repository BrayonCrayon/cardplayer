using System;
using System.Collections.Generic;
using CardPlayer.Models;

namespace CardPlayer.DTOs
{
    [Serializable]
    public class UserHandDto
    {
        public List<UserCard> whiteCards { get; set; }
        public UserCard blackCard { get; set; }
    }
}