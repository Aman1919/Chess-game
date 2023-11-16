import Piece from "./piece";
import { Pieces } from "../defs";
import Square from "../square";

export default class Knight extends Piece {

        constructor(pieceColor: string) {
                super(pieceColor);
                this.name = "Knight"
                this.unicode = Pieces.n;
        }

        getValidMoves(board: Square[][]) :Square[]{
                 if(!this.square)return []
                 const location = this.square.getLocation();
                 
                const squares = [
                        this.validSquare(location.file + 2,location.rank + 1, board),
                        this.validSquare(location.file + 2,location.rank - 1, board),
                        this.validSquare(location.file - 2,location.rank + 1, board),
                        this.validSquare(location.file - 2,location.rank - 1, board),
                        this.validSquare(location.file + 1,location.rank + 2, board),
                        this.validSquare(location.file - 1,location.rank + 2, board),
                        this.validSquare(location.file + 1,location.rank - 2, board),
                        this.validSquare(location.file - 1,location.rank - 2, board),
                ];

                const validMoves: any[] = [];
                squares.forEach(move => {
                        if (move && !move.piece) validMoves.push(move);
                        if (move&&move.piece && move.piece.pieceColor !== this.pieceColor) validMoves.push(move);
                })
                // don't know what's wrong foreach code was't working in filter 
                const validMove = squares.filter(move => {
                        return move && (!move.piece || (move.piece && move.piece.pieceColor !== this.pieceColor));
                });
                return validMove;
        }
        
}