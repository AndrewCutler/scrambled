using Microsoft.AspNetCore.SignalR;

namespace Scrambled.Api.Hubs
{
	public class GameHub : Hub
	{
		public async Task Send(string message)
		{
			await Clients.All.SendAsync("ReceiveMessage", message + " received.");
		}
	}
}