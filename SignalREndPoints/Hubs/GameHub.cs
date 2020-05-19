using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CardPlayer.SignalREndPoints.Hubs.HelperClasses;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace CardPlayer.SignalREndPoints.Hubs
{
    [Authorize]
    public class GameHub : Hub
    {
        private static readonly List<GameHubClient> _clients = new List<GameHubClient>();

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var connectionsToLeave = _clients.Where(client => client.connectionId == Context.ConnectionId);
            foreach (var connection in connectionsToLeave)
            {
                Groups.RemoveFromGroupAsync(connection.connectionId, connection.gameName);
                
                Clients.Group(connection.gameName)
                    .SendAsync("PlayerLeft", connection.name);
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task JoinGame(string gameName, string userName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, gameName);
            _clients.Add(new GameHubClient()
            {
                connectionId = Context.ConnectionId,
                gameName = gameName,
                name = userName
            });
            await Clients.Group(gameName).SendAsync("PlayerJoined", userName);
        }

        public async Task LeaveGame(string gameName, string userName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, gameName);

            var leavingClientIdx = _clients.FindIndex(client =>
                client.connectionId == Context.ConnectionId && client.gameName == gameName && client.name == userName);

            await Clients.Group(_clients[leavingClientIdx].gameName)
                .SendAsync("PlayerLeft", _clients[leavingClientIdx].name);

            _clients.RemoveAt(leavingClientIdx);
        }

        public async Task UpdateActivePlayers(string gameName, string[] players)
        {
            await Clients.Group(gameName).SendAsync("UpdateActivePlayers", players);
        }

        public async Task PlayerSelectedCardsNotify(string gameName)
        {
            await Clients.Group(gameName).SendAsync("UpdatePlayerSelectedCards");
        }

        public async Task ShowWinner(string gameName, string winnerName, string[] winnerCards)
        {
            await Clients.Group(gameName).SendAsync("ShowWinner", winnerName, winnerCards);
        }
    }
}