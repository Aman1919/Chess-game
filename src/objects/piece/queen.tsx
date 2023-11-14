import Piece from "./piece";
import { Pieces } from "../../defs";
import Square from "../square";
import Bishop from "./bishop";
import Rook from "./rook";

export default class Queen extends Piece {

        constructor(pieceColor: string) {
                super(pieceColor);
                this.name = "Queen"
                this.unicode = Pieces.q;
        }
        getPieceColor() {
                return this.pieceColor? 'black': 'white';
        }
        getValidMoves(board:Square[][]) {
                const diagonalMoves = new Bishop(this.getPieceColor()).getValidMoves(board);
                const straightMoves = new Rook(this.getPieceColor()).getValidMoves(board);
                const validMoves = [...diagonalMoves, ...straightMoves];
                return validMoves;
    }

}