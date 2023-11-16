import Piece from "./piece";
import { Pieces } from "../defs";
import Square from "../square";

export default class Rook extends Piece {

        constructor(pieceColor: string) {
                super(pieceColor);
                this.name = "Rook"
                this.unicode = Pieces.r;
        }

        HorizontalMoves(file: number, rank: number, board: Square[][]) {
        let ValidMove = [];
        let i = file + 1;
        while (i < 8) {
            let square = board[rank][i];
            if (!square.piece) {
                ValidMove.push(square);
            } else if (square.piece && this.pieceColor !== square.piece.pieceColor) {
                ValidMove.push(square);
                break
            }
            else {
                break;
            }
            i++;
        }
        i = file - 1;
        while (i >= 0) {
            let square = board[rank][i];
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
            i--;
        }
        return ValidMove;
    }
    VerticalMoves(file:number, rank:number, board:Square[][]) {

        let ValidMove = [];
        let i = rank + 1;
        while (i < 8) {
            let square = board[i][file];
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
            i++;
        }
        i = rank - 1;
        while (i >= 0) {
            let square = board[i][file];
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
            i--;
        }
        return ValidMove;
    }
        
        getValidMoves(board: Square[][]) {
                if (!this.square) return [];
                const location = this.square.getLocation();
                const h = this.HorizontalMoves(location.file, location.rank, board);
                const v = this.VerticalMoves(location.file, location.rank,  board);
                const ValidMove = [...h, ...v];
                return ValidMove;
}


}