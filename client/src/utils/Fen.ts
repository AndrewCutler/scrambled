type CastleDirection = 'kingside' | 'queenside';

export class Fen {
	#fen: string;
	#placement: string;
	#activeColor: 'black' | 'white';
	#whiteCastling?: CastleDirection[];
	#blackCastling?: CastleDirection[];
	#enPassant: string;
	#halfMove: number;
	#fullMove: number;

	constructor(fen: string) {
		this.#fen = fen;

		const [
			placement,
			activeColor,
			castling,
			enPassant,
			halfMove,
			fullMove
		] = fen.split(' ');

		this.#placement = placement;
		this.#activeColor = activeColor === 'b' ? 'black' : 'white';
		this.#enPassant = ''; // todo
		this.#halfMove = parseInt(halfMove, 10);
		this.#fullMove = parseInt(fullMove, 10);
		this.assignCastling(castling);
	}

	private assignCastling(castling: string): void {
		if (castling === '-') {
			this.#whiteCastling = undefined;
			this.#blackCastling = undefined;

			return;
		}

		const whiteCastle: CastleDirection[] = [],
			blackCastle: CastleDirection[] = [];
		if (castling.includes('K')) {
			whiteCastle.push('kingside');
		}
		if (castling.includes('Q')) {
			whiteCastle.push('queenside');
		}
		if (castling.includes('k')) {
			blackCastle.push('kingside');
		}
		if (castling.includes('q')) {
			blackCastle.push('queenside');
		}

		this.#whiteCastling = whiteCastle.length ? whiteCastle : undefined;
		this.#blackCastling = blackCastle.length ? blackCastle : undefined;
	}

	get fen(): string {
		return this.#fen;
	}

	get activeColor(): string {
		return this.#activeColor;
	}
}
