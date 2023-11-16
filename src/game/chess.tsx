import Game from "./game";
import Piece from "./objects/piece/piece";
import Square from "./objects/square";

export default class ChessEngine{
        game;
        constructor(game:Game) {
                this.game = game;
        }
        checkForCheck(pieces:Map<string,Piece>,turn:number,state:Square[][]) {
                //if king is location === opponenent any  of the validMoves
                const king:any = this.getKing(pieces, turn);
                const opponentMoves = this.getAllMoves(pieces, turn?0:1, state)

                if (!king) return;

                for (const move of opponentMoves) {
                        if (move.getLocation().name === king.square.getLocation().name) {
                                console.log('check');
                                return true;
                        }
                }                
;

                return false;
        }

        checkforValidMove(state:Square[][],validSquare:Square[],turn:number,prevSquare:Square,pieces:Map<string,Piece>) {
                const validMovePin: Square[] = [];
                validSquare.forEach(move => {
                        this.game.MakeMove(prevSquare, move)
                        if (!this.checkForCheck(pieces, turn, state)) {
                        validMovePin.push(move)
                        }
                        this.game.undoMove();
                })                
                return validMovePin;
        }

        checkForWinner(pieces:Map<string,Piece>,turn:number,state:Square[][]) {

                let moves: Square[] = [];
                if (this.checkForCheck(pieces, turn, state)) {
                        pieces.forEach(piece => {
                                if (piece.pieceColor === turn) {
                                const Moves = piece.getValidMoves(state);
                                const validMoves = piece.square ? this.checkforValidMove(state, Moves,turn, piece.square, pieces) : [];
                                moves = [...validMoves, ...moves];                                
                                }
                        })                        
                        if (!moves.length) {
                                return true;
                        }
                        return false;
                }
        }
        
        private getAllMoves(pieces: Map<string, Piece>, turn: number, state: Square[][]) {
                let moves:Square[] = [];
                pieces.forEach((piece) => {
                        if (piece.pieceColor === turn&& piece.square) {
                                const Moves = piece.getValidMoves(state);
                                moves = [...Moves, ...moves];
                        }
                })
                
                return moves;
        }
        
        
        private getKing(pieces: Map<string, Piece>, turn: number) {
                let king;
                
                pieces.forEach((value) => {
                        if (value.name === 'King' && value.pieceColor === turn) {
                                king = value;                               
                        } 
                })
                return king;
        }

}