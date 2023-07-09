import Board from './components/chess/board/Board';
import type { Component } from 'solid-js';
import Lobby from './components/app/Lobby';
import styles from './App.module.css';

const App: Component = () => {
	return (
		<div class={styles.App}>
			< Lobby/>
			<Board />
		</div>
	);
};

export default App;
