import Piece from "./piece";
import { Pieces } from "../defs";
import Square from "../square";

export default class King extends Piece {

        constructor(pieceColor: string) {
                super(pieceColor);
                this.name = "King"
                this.unicode = Pieces.k;
        }

        getValidMoves(board: Square[][]) {
                if (!this.square) return [];
                const location = this.square.getLocation();

                const squares = [
                        this.validSquare(location.file + 1,location.rank, board),
                        this.validSquare(location.file - 1,location.rank, board),
                        this.validSquare(location.file,    location.rank + 1, board),
                        this.validSquare(location.file,    location.rank - 1, board),
                        this.validSquare(location.file + 1,location.rank + 1, board),
                        this.validSquare(location.file - 1,location.rank - 1, board),
                        this.validSquare(location.file + 1,location.rank - 1, board),
                        this.validSquare(location.file - 1,location.rank + 1, board),];

                const validMove = squares.filter(move => {
                        return move && (!move.piece || (move.piece && move.piece.pieceColor !== this.pieceColor));
                });
                return validMove;
    }
        
}