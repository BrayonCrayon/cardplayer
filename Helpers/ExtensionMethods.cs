using CardPlayer.Data;
using CardPlayer.Data.Seeders;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace CardPlayer.Helpers
{
    public static class ExtensionMethods
    {
        public static IHost SeedCardPlayerTables(this IHost host)
        {
            var serviceScopeFactory = (IServiceScopeFactory)host
                .Services.GetService(typeof(IServiceScopeFactory));

            using (var scope = serviceScopeFactory.CreateScope())
            {
                var services = scope.ServiceProvider;
                var appContext = services.GetRequiredService<ApplicationDbContext>();
                appContext.Database.Migrate();
                
                var dbContext = services.GetRequiredService<CardPlayerContext>();
                SeedData.Initialize(dbContext);
            }

            return host;
        }
        
        
        public static IHost SeedTable<T>(this IHost host) where T:DbContext
        {
            var serviceScopeFactory = (IServiceScopeFactory)host
                .Services.GetService(typeof(IServiceScopeFactory));

            using (var scope = serviceScopeFactory.CreateScope())
            {
                var services = scope.ServiceProvider;

                var dbContext = services.GetRequiredService<T>();
                 // Do some generic class calling based on the DbContext
            }

            return host;
        }
    }
}