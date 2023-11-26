import ChessEngine from "../chess";
import Piece from "./piece/piece";
import Square  from "./square";
import socket from "../../components/socket";
import square from "./square";

export default class Movement{
        game;
        canvas;
        CurrentSquare: Square | null = null;
        NextSquare: Square | null  = null;
        ValidMoves: Square[] = [];
        chessEngine;
        
        constructor(Game: any, canvas:any) {
                this.game = Game;
                this.canvas = canvas;
                this.chessEngine = new ChessEngine(this.game);
        }


        onClickMove(event: React.MouseEvent<HTMLElement>) {
                if (!this.CurrentSquare) {
                        this.OnMouseDown(event);
                } else if (this.CurrentSquare && this.NextSquare) {
                        if(socket.connected){
                                const move = {
                                        prevSquare:this.CurrentSquare.getLocation(),
                                        nextSquare:this.NextSquare.getLocation()

                                };
                                const room = this.game.room;
                              socket.emit('move',{move,room});
                                console.log('connected move')
                        }
                        this.onMouseUp(event);
                        this.emty();

                } else {
                        this.emty();
                }
        }
        
        onMouseMove(event: React.MouseEvent<HTMLElement>) {
                if (!this.CurrentSquare) return;
                const square = this.getSquare(event);
                this.NextSquare = square;
        }
             
        private OnMouseDown(event: React.MouseEvent<HTMLElement>) {
                const square = this.getSquare(event);
                const piece = square.getPiece();
                if (!piece || (piece && piece.pieceColor !== this.game.turn)) return;
                this.CurrentSquare = square;
                this.selectPiece(piece, square);
        }
        
     
        private onMouseUp(event: React.MouseEvent<HTMLElement>) {
                if (!this.CurrentSquare || !this.NextSquare) return;
                        const l2 = this.NextSquare.getLocation();
                const invalidmoves = this.ValidMoves.some((s) => {
                        const l = s.getLocation();
                        return l2.name === l.name;
                })

                if (!invalidmoves) return;
                this.game.MakeMove(this.CurrentSquare, this.NextSquare);
                this.checkForCheckMate();
        }

        makeSocketMove(prevSquare:Square,nextSquare:square,state:square[][]){
                const piece = prevSquare.getPiece();
                if(!piece)return;
                const moves = piece.getValidMoves(this.game.getState());
                const validMove = this.chessEngine.checkforValidMove(this.game.getState(), moves, this.game.turn, prevSquare, this.game.getPieces());
                const isValidMoves = validMove.some(s=>{
                        const l = s.getLocation();
                        return nextSquare.getLocation().name === l.name;
                })
                if(!isValidMoves)return;
                this.game.MakeMove(prevSquare,nextSquare);
                this.checkForCheckMate();
        }

        private checkForCheckMate() {
                
                if (this.chessEngine.checkForWinner(this.game.getPieces(), this.game.turn, this.game.getState())) {
                        const winner = this.game.turn ? 'White':'Black';               
                        this.game.setWinner(winner);
                        console.log(winner+ ' wins');
                }
        }
        
        private selectPiece(piece: Piece,square:Square) {
                
                const moves = piece.getValidMoves(this.game.getState());
                const validMove = this.chessEngine.checkforValidMove(this.game.getState(), moves, this.game.turn, square, this.game.getPieces());
                
                this.ValidMoves = validMove;
                this.ValidMoves.forEach(s => s.HighLightSquare(this.game.context));

        }
        
        private emty() {
                this.CurrentSquare = null;
                this.NextSquare = null;
                this.ValidMoves.forEach(s => s.removeHightLight(this.game.context));
                this.ValidMoves = [];
        }

        private getSquare(event: React.MouseEvent<HTMLElement>) {
                const rect = this.canvas.getBoundingClientRect();                
                const file = Math.floor((event.clientX - rect.x)/(this.game.width/8));
                const rank = Math.floor((event.clientY - rect.y) / (this.game.height / 8));
                return this.game.ChessBoard.state[rank][file];
        }

}