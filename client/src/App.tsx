import Board from './components/chess/board/Board';
import type { Component } from 'solid-js';
import SignalTest from './components/signal-test/SignalTest';
import styles from './App.module.css';

const App: Component = () => {
	return (
		<div class={styles.App}>
			{/* <SignalTest /> */}
			<Board />
		</div>
	);
};

export default App;
