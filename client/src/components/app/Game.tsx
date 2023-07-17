import { Component, createEffect, createSignal, onMount } from 'solid-js';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';

const Game: Component<{
	onJoin: () => void;
	isGameSet: boolean;
}> = (props) => (
	<div>
		{props.isGameSet ? (
			<button type='button' onClick={props.onJoin}>
				Join game
			</button>
		) : (
			<div>Game in progress...</div>
		)}
	</div>
);

export default Game;
