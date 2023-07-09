import { Chess, Move } from 'chess.js';
import { Component, createSignal, onCleanup, onMount } from 'solid-js';
import { Key, MoveMetadata } from 'chessground/types';

import { Api } from 'chessground/api';
import { Chessground } from 'chessground';

const startingFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';
const fen =
	'rnb1k1r1/1p1p4/2p1p3/4Pn1p/p2P1P2/2P2N1q/PP1QB1p1/R3K1R1 b q - 11 23';

const Board: Component<{}> = (props) => {
	const [cgApi, setCgApi] = createSignal<Api | undefined>(undefined);
	const [board, setBoard] = createSignal<Chess | undefined>(undefined);

	onMount(() => {
		console.log('onMount');
		setBoard(new Chess(fen));
	});

	onCleanup(() => {
		console.log('onCleanup');
		cgApi()?.destroy();
	});

	const handleMove = (from: Key, to: Key, meta: MoveMetadata): void => {
		console.log({ from, to, meta });
		try {
			const move = board()?.move({ from, to });
			console.log({ move });
			cgApi()?.move(from, to);
		} catch (e) {
			console.log('err');
			cgApi()?.set({
				fen: board()?.fen()
			});
			console.error(e);
		}
	};

	const mount = (el: HTMLDivElement) => {
		console.log('mount');
		setCgApi(
			Chessground(el, {
				animation: { enabled: true, duration: 250 },
				movable: {
					free: true,
					color: 'both',
					events: {
						after: handleMove
					}
				},
				draggable: {
					enabled: true
				},
				selectable: {
					enabled: true
				},
				fen
			})
		);
	};

	return <div ref={(el) => mount(el)} />;
};

export default Board;
