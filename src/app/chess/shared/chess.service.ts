import { Injectable } from '@angular/core';
import { Chess } from 'chess-es6.js/chess';
import { Move } from 'chess-es6.js/move';
import { PieceType } from 'chess-es6.js/piece_type';

import { chess2groundPieceType, chess2groundColor } from './.';

@Injectable()
export class ChessService {

  chess: Chess;

  constructor() {
    this.chess = new Chess();
  }

  chess2groundPiece(piece: any): any {
    if (piece.type === PieceType.NONE) {
        return null;
    }
    return {
      color: chess2groundColor(piece.color),
      role: chess2groundPieceType(piece.type)
    };
  }

  getDests(): any {
    let dests = this.chess.moves({onlyAlgebraicSquares: true});
    let splitDests = dests.map(move => move.split('-'));
    let ret = {};
    let move;

    for (move of splitDests) {
      if (!ret[move[0]]) {
        ret[move[0]] = [move[1]];
      } else {
        ret[move[0]].push(move[1]);
      }
    }
    return ret;
  }

  getFullTurnColor(): string {
    if (this.whitesTurn()) {
      return 'white';
    }
    return 'black';
  }

  getFullNotTurnColor(): string {
    if (!this.whitesTurn()) {
      return 'white';
    }
    return 'black';
  }

  squareToAlgebraic(square: number): string {
      return Move.SQUARES_LOOKUP[square];
  }

  whitesTurn(): boolean {
    return this.chess.whoseTurn() === 'w';
  }
}
