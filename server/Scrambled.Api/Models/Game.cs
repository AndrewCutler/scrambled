public class Game
{
    /// <summary>
    /// Gets or sets a unique ID for the game.
    /// </summary>
    public Guid GameId { get; init; }

    /// <summary>
    /// Gets or sets the connectionId for the white player.
    public string? White { get; set; }

    /// <summary>
    /// Gets or sets the connectionId for the black player.
    public string? Black { get; set; }

    public string Fen { get; set; } = string.Empty;

    public Game() { }

    public Game(Guid gameId)
    {
        this.GameId = gameId;
    }

    public Game AssignColor(string connectionId)
    {
        if (this.White is null && this.Black is null)
        {
            var isWhite = new Random().Next(2) > 0;

            if (isWhite)
            {
                this.White = connectionId;
            }
            else
            {
                this.Black = connectionId;
            }
        }
        else
        {
            this.Black ??= connectionId;
            this.White ??= connectionId;
        }

		return this;
    }
}
