using CardPlayer.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace CardPlayer.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
            
        }
        
        public DbSet<CardType> CardTypes { get; set; }
        
        public DbSet<Card> Cards { get; set; }
        
        public DbSet<UserCard> UserCards { get; set; }
        
        public DbSet<Game> Games { get; set; }
        
        public DbSet<GameUser> GameUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<CardType>().ToTable("card_types");
            modelBuilder.Entity<Card>().ToTable("cards");
            
            modelBuilder.Entity<UserCard>().ToTable("user_cards");
            modelBuilder.Entity<UserCard>().HasQueryFilter(userCard => userCard.DeletedAt == null);

            modelBuilder.Entity<Game>().ToTable("games");
            modelBuilder.Entity<Game>().HasQueryFilter(game => game.DeletedAt == null);
            
            modelBuilder.Entity<GameUser>().ToTable("game_users");
            modelBuilder.Entity<GameUser>().HasQueryFilter(gameUser => gameUser.DeletedAt == null);
        }

        
    }
}
