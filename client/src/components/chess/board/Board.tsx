import { Component, onCleanup, onMount } from 'solid-js';

import { Api } from 'chessground/api';
import { Chess } from 'chess.js';
import { Chessground } from 'chessground';

const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const fen =
	'rnb1k1r1/1p1p4/2p1p3/4Pn1p/p2P1P2/2P2N1q/PP1QB1p1/R3K1R1 b q - 11 23';

const Board: Component<{}> = (props) => {
	let cgApi: Api | undefined;
	let board: Chess | undefined;

	onMount(() => {
		board = new Chess(fen);
	});

	onCleanup(() => {
		cgApi?.destroy();
	});

	const mount = (el: HTMLDivElement) => {
		cgApi = Chessground(el, {
			animation: { enabled: true, duration: 250 },
			movable: {
				free: true,
				color: 'both',
				events: {
					after: (original, dest, meta) => {
						console.log({ original, dest, meta });
					}
				}
			},
			draggable: {
				enabled: true
			},
			drawable: {
				enabled: true
			},
			selectable: {
				enabled: true
			},
			events: {
				move: console.log
			},
			fen
		});
	};

	return <div ref={(el) => mount(el)} />;
};

export default Board;
