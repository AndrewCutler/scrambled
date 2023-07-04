import { Component, onMount } from 'solid-js';

import { Chess } from 'chessjs';

const B: Component<{}> = (props) => {
	onMount(() => {
		const board = new Chess();
	});

	return <div></div>;
};
