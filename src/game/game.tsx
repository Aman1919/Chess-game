import ChessEngine from "./chess";
import ChessBoard from "./objects/chessBoard";
import Movement from "./objects/movement";
import Piece from "./objects/piece/piece";
import Square from "./objects/square";
import square from "./objects/square";

class Game {
        ChessBoard: ChessBoard;
        canvas: HTMLCanvasElement;
        width: number;
        height: number;
        turn: number = 0;
        Movement: Movement;
        context: CanvasRenderingContext2D;
        moveHistory: MoveHistory[];
        winner: string = "";
        room:string | undefined;
        setTurn: (val: string) => void;
        setGameover: (val: string) => void;

        constructor(width: number, height: number,
                    context: CanvasRenderingContext2D,
                    canvas: HTMLCanvasElement,
                    setTurn: (val: string) => void,
                    setGameOver: (val: string) => void,
                    room?: string) {
                this.ChessBoard = new ChessBoard(width, height, context);
                this.canvas = canvas;
                this.width = width;
                this.height = height;
                this.context = context;
                this.Movement = new Movement(this, canvas);
                this.moveHistory = [];
                this.setTurn = setTurn;
                this.setGameover = setGameOver
                this.room = room;
        }

        onMouseClick(event: React.MouseEvent<HTMLElement>) {
                this.Movement.onClickMove(event);
        }

        OnMouseMove(event: React.MouseEvent<HTMLElement>) {
                this.Movement.onMouseMove(event);
        }
        
        MakeMove(PrevSquare:Square,NextSquare:Square) {
                const piece = PrevSquare.getPiece();
                const nextPiece = NextSquare.getPiece();
                if (!piece) return;
                NextSquare.setPiece(piece,this.context);
                PrevSquare.setPiece(null, this.context);
                piece.setSquare(NextSquare);
                nextPiece?.setSquare(null);
                this.moveHistory.push(
                        new MoveHistory(PrevSquare, NextSquare, piece,nextPiece)
                );

                this.changeTurn();
        }
        undoMove() {
                const move = this.moveHistory.pop();
                if (!move) return;
                
                move.from.setPiece(move.to.piece,this.context);
                move.to.setPiece(move.toPiece, this.context);
                move.fromPiece.setSquare(move.from);
                if (move.toPiece) {
                        move.toPiece.setSquare(move.to);
                }
                this.changeTurn();
        }
        MakeSocketMove(data:any){
                const nL = data.move.nextSquare;
                const pL = data.move.prevSquare;
                const state = this.getState()
                const nextSquare = state[nL.rank][nL.file];
                const prevSquare = state[pL.rank][pL.file];
                this.Movement.makeSocketMove(prevSquare,nextSquare,this.getState());
        }
        changeTurn() {
                this.turn = this.turn ? 0 : 1;
                const turn = this.turn?'Black':'White'
                
                this.setTurn(turn);        
        }
        
        getState() {
                return this.ChessBoard.state;
        }
        
        getPieces() {
                return this.ChessBoard.pieces;
        }
        setWinner(player:string) {
                this.winner = player;
                this.setGameover(this.winner);       
        }
}

class MoveHistory{
        from: Square;
        to: Square;
        fromPiece: Piece;
        toPiece: Piece | null;
        constructor(from: Square, to: Square, piece: Piece,topiece:Piece | null) {
                this.from = from;
                this.to = to;
                this.fromPiece = piece;
                this.toPiece = topiece;
        }
}


export default Game;