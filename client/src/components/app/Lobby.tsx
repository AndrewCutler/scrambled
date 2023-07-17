import { Component, createEffect, createSignal, onMount } from 'solid-js';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

const Lobby: Component<{
	onGameSet: (id: string) => void;
}> = ({ onGameSet }) => {
	const [connection, setConnection] = createSignal<HubConnection>();

	createEffect(() => {
		if (connection()) {
			connection()
				?.start()
				.then((result) => {
					console.log({ result });

					connection()?.on('OnAction', (message) => {
						console.log({ onAction: message });
					});
					connection()?.on('OnConnected', (gameId) => {
						console.log({ onConnected: gameId });
						onGameSet(gameId);
					});
				})
				.catch(console.error);
		}
	});

	function onJoin(): void {
		if (!connection()) {
			const _connection = new HubConnectionBuilder()
				.withUrl('http://localhost:5219/game')
				.withAutomaticReconnect()
				.build();

			setConnection(_connection);
		}
	}

	async function onAction(): Promise<void> {
		if (connection()) {
			console.log('Joining...');
			await connection()?.send('Join', 'join game!');
		}
	}

	return (
		<div>
			{!connection() ? (
				<button type='button' onClick={onJoin}>
					Join game
				</button>
			) : (
				<div>Game in progress...</div>
			)}
		</div>
	);
};

export default Lobby;
