import Piece from "./piece";
import { Pieces } from "../defs";
import Square from "../square";

export default class Bishop extends Piece {

        constructor(pieceColor: string) {
                super(pieceColor);
                this.name = "Bishop"
                this.unicode = Pieces.b;
        }
        
        upRight(file:number, rank:number, board:Square[][]) {
        // file + , rank +
        let ValidMove = [];
        while (++file < 8 && ++rank < 8) {
            let square = board[rank][file];
            if (!square.piece) {
                ValidMove.push(square);
            }
            else if (square.piece && this.pieceColor !== square.piece.pieceColor) {
                ValidMove.push(square);
                break
            }
            else {
                break;
            }

        }
        return ValidMove;
    }
    downRight(file:number, rank:number, board:Square[][]) {
        // file + , rank -
        let ValidMove = [];
        while (++file < 8 && --rank >= 0) {
            let square = board[rank][file];
            if (!square.piece) {
                ValidMove.push(square);
            }
            else if (square.piece && this.pieceColor !== square.piece.pieceColor) {
                ValidMove.push(square);
                break
            }
            else {
                break;
            }

        }
        return ValidMove;

    }
    downLeft(file:number, rank:number, board:Square[][]) {
        // file - , rank -
        let ValidMove = [];
        while (--file >= 0 && --rank >= 0) {
            let square = board[rank][file];
            if (!square.piece) {
                ValidMove.push(square);
            }
            else if (square.piece && this.pieceColor !== square.piece.pieceColor) {
                ValidMove.push(square);
                break
            }
            else {
                break;
            }

        }
        return ValidMove;

    }
    upLeft(file:number, rank:number, board:Square[][]) {
        // file - , rank +
        let ValidMove = [];
        while (--file >= 0 && ++rank < 8) {
            let square = board[rank][file];
            if (!square.piece) {
                ValidMove.push(square);
            }
            else if (square.piece && this.pieceColor !== square.piece.pieceColor) {
                ValidMove.push(square);
                break
            }
            else {
                break;
            }

        }
        return ValidMove;

    }
        getValidMoves(board: Square[][]) {
                if (!this.square) return[];
                const location = this.square.getLocation();
                const Upleft = this.upLeft(location.file, location.rank, board);
                const Downleft = this.downLeft(location.file, location.rank, board);
                const Upright = this.upRight(location.file, location.rank, board);
                const Downright = this.downRight(location.file, location.rank, board);
                const validMoves = [...Upleft, ...Upright, ...Downleft, ...Downright];
                return validMoves;
}
}