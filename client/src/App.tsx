import Board from './components/Board';
import { createSignal, type Component, createEffect } from 'solid-js';
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

					connection()?.on('GameJoined', (gameId: string) => {
						console.log({ gameJoined: gameId });
						setGameId(gameId);
					});
					connection()?.on(
						'OnActionAsync',
						(gameId: string, action: string) => {
							console.log({ onActionAsync: { gameId, action } });
						}
					);
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

	async function handleAction(fen: string): Promise<void> {
		if (connection()) {
			try {
				await connection()?.invoke('OnActionAsync', gameId(), fen);
			} catch (e) {
				console.error(e);
			}
		}
	}

	async function handlePositionChange(fen: string): Promise<void> {
		await handleAction(fen);
	}

	const isGameSet = () => !!gameId()?.trim();

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
