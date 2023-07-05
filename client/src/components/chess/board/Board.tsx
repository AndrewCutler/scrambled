import { Component, onMount } from 'solid-js';

import { Chess } from 'chessjs';
import { Chessground } from 'chessground';

const Board: Component<{}> = (props) => {
	onMount(() => {
		const board = new Chess();
	});

	const mount = (el: HTMLDivElement) => {
		const x = Chessground(el, {});
		console.log({ x });
	};

	return <div ref={(el) => mount(el)} />;
};

export default Board;