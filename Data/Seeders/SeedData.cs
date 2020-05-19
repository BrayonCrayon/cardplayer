using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using CardPlayer.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Npgsql;

namespace CardPlayer.Data.Seeders
{
    public static class SeedData
    {
        private static CardPlayerContext _context;
        
        public static void Initialize(CardPlayerContext context)
        {
            _context = context;
            SeedCardTypes();
            SeedCards();
        }
        
        private static void SeedCardTypes()
        {
            if (_context.CardTypes.Any())
            {
                return;
            }

            _context.CardTypes.AddRange(
                new CardType { Name = "black" },
                    new CardType { Name = "white" }
                );

            _context.SaveChanges();
        }

        private static void SeedCards()
        {
            if (_context.Cards.Any())
            {
                return;
            }
            var jsonString = File.ReadAllText( "./Data/Seeders/cards_against_humanity_cards.json");
            var jsonObj = JObject.Parse(jsonString);
            List<Card> blackCards = JsonConvert.DeserializeObject<List<Card>>(jsonObj.GetValue("blackCards").ToString());

            var blackCardType = _context.CardTypes.Single(type => type.Name == "black");
            foreach (var blackCard in blackCards)
            {
                blackCard.TypeId = blackCardType.Id;
                _context.Cards.Add(blackCard);
            }


            List<String> whiteCards = JsonConvert.DeserializeObject<List<String>>(jsonObj.GetValue("whiteCards").ToString());
            var whiteCardType = _context.CardTypes.Single(type => type.Name == "white");
            foreach (var whiteCardText in whiteCards)
            {
                _context.Cards.Add(new Card
                {
                    Text = whiteCardText,
                    TypeId = whiteCardType.Id,
                });
            }
            _context.SaveChanges();
            
            
        }
        
    }
}