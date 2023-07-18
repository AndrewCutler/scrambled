public interface IGameService
{
    /// <summary>
    /// If no games are pending, creates a new one; otherwise joins a game in the queue.
    /// </summary>
    /// <param name="connectionId">The user's connection ID.</param>
    /// <returns>The game ID.</returns>
    Task<Guid> CreateOrJoinGame(string connectionId);

    /// <summary>
    /// Gets a game by its ID.
    /// </summary>
    /// <param name="gameId">The game ID.</param>
    /// <returns>The game.</returns>
    Game GetGameByGameId(Guid gameId);
}

public class GameService : IGameService
{
    private readonly Dictionary<Guid, Game> games;
    private readonly Queue<Guid> pendingGameIds;

    public GameService()
    {
        this.games = new Dictionary<Guid, Game>();
        this.pendingGameIds = new Queue<Guid>();
    }

    /// </ inheritdoc>
    public Task<Guid> CreateOrJoinGame(string connectionId)
    {
        var gameId = this.pendingGameIds.FirstOrDefault();

        if (gameId == default)
        {
            gameId = Guid.NewGuid();
            var game = new Game(gameId).AssignColor(connectionId);
            this.games.Add(gameId, game);
			this.pendingGameIds.Enqueue(gameId);
        }
        else
        {
            var game = this.GetGameByGameId(gameId).AssignColor(connectionId);
            this.pendingGameIds.Dequeue();
        }

        return Task.FromResult(gameId);
    }

    /// </ inheritdoc>
    public Game GetGameByGameId(Guid gameId)
    {
        var game = this.TryGetGameByGameId(gameId);

        return game;
    }

    private Game TryGetGameByGameId(Guid gameId)
    {
        if (this.games.TryGetValue(gameId, out var game))
        {
            return game;
        }

        throw new Exception($"Game not found with gameId {gameId}.");
    }
}
