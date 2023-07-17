import Board from './components/chess/board/Board';
import { createSignal, type Component } from 'solid-js';
import Lobby from './components/app/Lobby';
import styles from './App.module.css';
import { Fen } from './utils/Fen';

const App: Component = () => {
	const [gameId, setGameId] = createSignal<string>();

	function handleGameSet(id: string): void {
		setGameId(id);
	}

	function handlePositionChange(fen: string): void {
		console.log({ fen: new Fen(fen) });
	}

	return (
		<div class={styles.App}>
			<Lobby onGameSet={handleGameSet} />
			<Board
				isGameSet={!!gameId()?.trim()}
				onPositionChange={handlePositionChange}
			/>
		</div>
	);
};

export default App;
