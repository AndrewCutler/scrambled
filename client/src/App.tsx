import Board from './components/Board';
import {
	createSignal,
	type Component,
	createMemo,
	createEffect
} from 'solid-js';
import JoinButton from './components/JoinButton';
import styles from './App.module.css';
import { Fen } from './utils/Fen';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

const App: Component = () => {
	const [gameId, setGameId] = createSignal<string>();
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
						setGameId(gameId);
					});
				})
				.catch(console.error);
		}
	});

	function handleJoin(): void {
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

	function handlePositionChange(fen: string): void {
		console.log({ fen: new Fen(fen) });
	}

	const isGameSet = createMemo(() => !!gameId()?.trim());

	return (
		<div class={styles.App}>
			<JoinButton onJoin={handleJoin} isGameSet={isGameSet()} />
			<Board
				isGameSet={isGameSet()}
				onPositionChange={handlePositionChange}
			/>
		</div>
	);
};

export default App;
