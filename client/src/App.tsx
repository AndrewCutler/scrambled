import Board from './components/chess/board/Board';
import { createSignal, type Component } from 'solid-js';
import Lobby from './components/app/Lobby';
import styles from './App.module.css';

const App: Component = () => {
	const [gameId, setGameId] = createSignal<string>();

	const handleGameSet = (id: string): void => {
		setGameId(id);
	};

	return (
		<div class={styles.App}>
			<Lobby onGameSet={handleGameSet} />
			<Board isGameSet={!!gameId()?.trim()} />
		</div>
	);
};

export default App;
