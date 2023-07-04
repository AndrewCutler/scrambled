import type { Component } from 'solid-js';
import SignalTest from './components/signal-test/SignalTest';
import logo from './logo.svg';
import styles from './App.module.css';

const App: Component = () => {
	return (
		<div class={styles.App}>
			<SignalTest />
		</div>
	);
};

export default App;
