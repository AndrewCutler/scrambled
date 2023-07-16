using Microsoft.AspNetCore.SignalR;

namespace Scrambled.Api.Hubs
{
    // TODO: type
    // https://learn.microsoft.com/en-us/aspnet/core/signalr/hubs?view=aspnetcore-7.0#strongly-typed-hubs
    public class GameHub : Hub
    {
        private readonly IGameService gameService;

        public GameHub(IGameService gameService)
        {
            this.gameService = gameService;
        }

        // Create or join game
        public override async Task OnConnectedAsync()
        {
            // Get the id of a game
            var gameId = await this.gameService.CreateOrJoinGame(this.Context.ConnectionId);

            // Add id to group for that game
            await this.Groups.AddToGroupAsync(
                connectionId: this.Context.ConnectionId,
                groupName: gameId.ToString()
            );

            // Send client gameId
            await Clients.Caller.SendAsync("OnConnected", gameId);

            await base.OnConnectedAsync();
        }

        // Make a move, resign, lost on time, etc.
        public async Task OnAction(string gameId, string action)
        {
            var game = this.gameService.GetGameByGameId(gameId);

            // Broadcast to all clients
            await Clients
                .Group(gameId.ToString())
                .SendAsync(
                    "OnAction" /*, msg.Text, msg.SentAt, msg.SenderName*/
                );
        }
    }
}
