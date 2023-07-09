public interface IGameService
{
    Task<Guid> CreateGame(string gameId);
    Task<Guid> GetGameIdFromConnectionId(string gameId);
}

public class GameService : IGameService
{
    private readonly Dictionary<Guid, Game> games;

    public GameService()
    {
        this.games = new Dictionary<Guid, Game>();
    }

    public Task<Guid> CreateGame(string connectionId)
    {
        var id = Guid.NewGuid();
        this.games.Add(id, new Game { ConnectionId = connectionId, });

        return Task.FromResult(id);
    }

    public Task<Guid> GetGameIdFromConnectionId(string connectionId)
    {
        // todo: use a better data structure.
        var game = this.games.FirstOrDefault(g => g.Value.ConnectionId == connectionId);

        if (game.Key == Guid.Empty)
        {
            throw new Exception("Invalid connection ID.");
        }

        return Task.FromResult(game.Key);
    }
}
