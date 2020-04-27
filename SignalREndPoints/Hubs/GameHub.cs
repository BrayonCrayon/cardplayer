using System.Threading.Tasks;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace CardPlayer.SignalREndPoints.Hubs
{
    [Authorize]
    public class GameHub : Hub
    {

        public async Task JoinGame(string gameName, string userName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, gameName);
            await Clients.Group(gameName).SendAsync("PlayerJoined", userName);
        }

        public async Task LeaveGame(string gameName, string userName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, gameName);
            await Clients.Group(gameName).SendAsync("PlayerLeft", userName);
        }

        public async Task UpdateActivePlayers(string gameName, string[] players)
        {
            await Clients.Group(gameName).SendAsync("UpdateActivePlayers", players);
        }

        public async Task PlayerSelectedCardsNotify(string gameName)
        {
            await Clients.Group(gameName).SendAsync("UpdatePlayerSelectedCards");
        }

        public async Task ShowWinner(string gameName, string winnerName)
        {
            await Clients.Group(gameName).SendAsync("ShowWinner", winnerName);
        } 
    }
}