import ChessBoard from "./objects/chessBoard";
import Movement from "./objects/movement";
import Piece from "./objects/piece/piece";
import Square from "./objects/square";

class Game {
        ChessBoard: ChessBoard;
        canvas: HTMLCanvasElement;
        width: number;
        height: number;
        turn: string = 'black';
        Movement: Movement;
        context: CanvasRenderingContext2D;
        moveHistory :MoveHistory[];
        constructor(width: number, height: number, context: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
                this.ChessBoard = new ChessBoard(width, height, context);
                this.canvas = canvas;
                this.width = width;
                this.height = height;
                this.context = context;
        this.Movement= new Movement(this, canvas);
                this.moveHistory = [];
        }

        onMouseClick(event: React.MouseEvent<HTMLElement>) {
                this.Movement.onClickMove(event);
        }

        OnMouseMove(event: React.MouseEvent<HTMLElement>) {
                this.Movement.onMouseMove(event);
        }
        
        MakeMove(PrevSquare:Square,NextSquare:Square) {
                const piece = PrevSquare.getPiece();
                if (!piece) return;
                NextSquare.setPiece(piece,this.context);
                PrevSquare.setPiece(null, this.context);
                piece.setSquare(NextSquare);
                this.moveHistory.push(
                        new MoveHistory(PrevSquare, NextSquare, piece)
                );
        }
        undoMove() {
                const move = this.moveHistory.pop();
                if (!move) return;
                move.from.setPiece(move.to.piece,this.context);
                move.to.setPiece(null,this.context);
                move.piece.setSquare(move.from);
        }
        
        getState() {
                return this.ChessBoard.state;
        }
}

class MoveHistory{
        from: Square;
        to: Square;
        piece: Piece;
        constructor(from:Square,to:Square,piece:Piece) {
                this.from = from;
                this.to = to;
                this.piece = piece;
        
        }
}


export default Game;