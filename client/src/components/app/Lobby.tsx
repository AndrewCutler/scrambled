import { Component, createEffect, createSignal, onMount } from 'solid-js';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

const Lobby: Component<{}> = (props) => {
	const [connection, setConnection] = createSignal<HubConnection>();

	createEffect(() => {
		if (connection()) {
			connection()
				?.start()
				.then((result) => {
					console.log({ result });

					connection()?.on('ReceiveMessage', (message) => {
						console.log({ message });
					});
				})
				.catch(console.error);
		}
	});

	const joinGame = (): void => {
		const connection = new HubConnectionBuilder()
			.withUrl('http://localhost:5219/game')
			.withAutomaticReconnect()
			.build();

		setConnection(connection);
	};

	const sendMove = async (): Promise<void> => {
		if (connection()) {
			await connection()?.send('Send', 'join game!');
		}
	};

	return (
		<div>
			{!connection() ? (
				<button type='button' onClick={joinGame}>
					Join game
				</button>
			) : (
				<div>Game in progress...</div>
			)}
		</div>
	);
};

export default Lobby;
