import { Component, onMount } from 'solid-js';

import { Chess } from 'chess.js';
import { Chessground } from 'chessground';

const Board: Component<{}> = (props) => {
	onMount(() => {
		const board = new Chess();
	});

	const mount = (el: HTMLDivElement) => {
		const x = Chessground(el, {
			viewOnly: true,
			fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
			// fen: 'rnb1k1r1/1p1p4/2p1p3/4Pn1p/p2P1P2/2P2N1q/PP1QB1p1/R3K1R1 b q - 11 23'
		});
		console.log({ x });
	};

	return <div ref={(el) => mount(el)} />;
};

export default Board;