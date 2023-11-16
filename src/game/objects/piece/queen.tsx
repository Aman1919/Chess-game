import Piece from "./piece";
import { Pieces } from "../defs";
import Square from "../square";
import Bishop from "./bishop";
import Rook from "./rook";

export default class Queen extends Piece {
        rook; bishop;
        constructor(pieceColor: string) {
                super(pieceColor);
                this.name = "Queen"
                this.unicode = Pieces.q;
                this.rook = new Rook(this.getPieceColor())
                this.bishop = new Bishop(this.getPieceColor());
        }
        getPieceColor() {
                return this.pieceColor? 'black': 'white';
        }
        getValidMoves(board:Square[][]) {
                const diagonalMoves = this.bishop.getValidMoves(board);
                const straightMoves = this.rook.getValidMoves(board);
                const validMoves = [...diagonalMoves, ...straightMoves];
                return validMoves;
    }
        setSquare(square:Square) {
                this.square = square;
                this.rook.setSquare(square);
                this.bishop.setSquare(square);

        }

}