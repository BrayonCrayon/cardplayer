﻿using System.Threading.Tasks;
using IdentityServer4.Extensions;
using Microsoft.AspNetCore.SignalR;

namespace CardPlayer.SignalREndPoints.Hubs
{
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

        public async Task SendMessageToGroup(string gameName, string message)
        {
            await Clients.Group(gameName).SendAsync("ReceiveMessage", message);
        }

        public async Task PlayerSelectedCardsNotify(string gameName)
        {
            await Clients.Group(gameName).SendAsync("UpdatePlayerSelectedCards");
        }
    }
}