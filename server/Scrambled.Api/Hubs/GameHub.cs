using Microsoft.AspNetCore.SignalR;

namespace Scrambled.Api.Hubs
{
    public class GameHub : Hub
    {
        private readonly IGameService gameService;

        public GameHub(IGameService gameService)
        {
            this.gameService = gameService;
        }

        public override async Task OnConnectedAsync()
        {
            var gameId = await this.gameService.CreateGame(this.Context.ConnectionId);

            await this.Groups.AddToGroupAsync(this.Context.ConnectionId, gameId.ToString());

            await Clients.Caller.SendAsync("OnConnected", gameId.ToString(), DateTime.UtcNow);

            await base.OnConnectedAsync();
        }

        public async Task Send(string message)
        {
            var gameId = await this.gameService.GetGameIdFromConnectionId(Context.ConnectionId);

            var msg = new
            {
                // SenderName = name,
                Text = message,
                SentAt = DateTimeOffset.UtcNow
            };

            // Broadcast to all clients
            await Clients
                .Group(gameId.ToString())
                .SendAsync(
                    "ReceiveMessage",
                    msg.Text,
                    msg.SentAt /*, message.SenderName */
                );
        }
    }
}
