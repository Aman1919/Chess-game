import Square from "../square";

export default abstract class Piece{
        pieceColor: number;
        name: string | undefined;
        square: Square | null | undefined;
        unicode: string;
        private Killed = false;
        constructor(pieceColor: string) {
                this.pieceColor = (pieceColor === 'white') ? 0 : 1;
                this.unicode = ''
        }

        getValidMoves(board: Square[][]): Square[] {
                return []
        }
        
        isKilled() {
                return this.Killed;
        }
        
        isTurn(turn:number) {
                return turn === this.pieceColor;
        }
        
        setSquare(square:Square) {
                this.square = square;
        }
        
        validSquare(file:number, rank:number, board:any) {
                if (file >= 8 || file < 0 || rank < 0 || rank >= 8) return null;
                
                return board[rank][file];
        }

}