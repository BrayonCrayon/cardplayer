using System.IO;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace CardPlayer.Data
{
    public class CardPlayerContextFactory : IDesignTimeDbContextFactory<CardPlayerContext>
    {
        public CardPlayerContext CreateDbContext(string[] args)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json")
                .Build();
            
            var builder = new DbContextOptionsBuilder<CardPlayerContext>();
            builder.UseNpgsql(configuration.GetConnectionString("CardPlayerDatabase"));
            return new CardPlayerContext(builder.Options);
        }
    }
}