import Piece from "./piece";
import { Pieces } from "../../defs";
import Square from "../square";

export default class Pawn extends Piece {

        constructor(pieceColor: string) {
                super(pieceColor);
                this.name = "Pawn"
                this.unicode = Pieces.p;
        }

        StepMoves(file:number, rank:number, board:Square[][]) {
                const one = !this.pieceColor ? this.validSquare(file, rank + 1, board) : this.validSquare(file, rank - 1, board);
                const two = !this.pieceColor ? this.validSquare(file, rank + 2, board) : this.validSquare(file, rank - 2, board); 
                
                const Moves = [];
                if (one && !one.piece) {
                        Moves.push(one);
                        if (two && !two.piece) {
                                Moves.push(two);
                        }
                }
                return Moves;
        }
    
        CaptureMove(file: number, rank: number, board: Square[][]) {
                const left = !this.pieceColor ? this.validSquare(file - 1, rank + 1, board) : this.validSquare(file - 1, rank - 1, board);
                const right = !this.pieceColor ? this.validSquare(file + 1, rank + 1, board) : this.validSquare(file + 1, rank - 1, board);
                const Moves = [];
                if (left&&left.piece && left.piece.pieceColor !== this.pieceColor) Moves.push(left);
                if (right&&right.piece && right.piece.pieceColor!==this.pieceColor) Moves.push(right);
                return Moves;
        }

        getValidMoves(board: Square[][]):Square[]
        {
                if (!this.square) return [];
                const location = this.square.getLocation();        
                const step = this.StepMoves(location.file, location.rank,  board);
                const capture = this.CaptureMove(location.file, location.rank, board);

                return [...step,...capture];
        }

}