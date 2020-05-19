using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using CardPlayer.Helpers;

namespace CardPlayer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args)
                .Build()
                .SeedCardPlayerTables()
                .Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
