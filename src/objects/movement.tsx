import Square  from "./square";

export default class Movement{
        game;
        canvas;
        CurrentSquare: Square | null = null;
        NextSquare: Square | null  = null;
        ValidMoves:Square[] = [];
        constructor(Game: any, canvas:any) {
                this.game = Game;
                this.canvas = canvas;
        }

        OnMouseDown(event: React.MouseEvent<HTMLElement>) {
                const square = this.getSquare(event);
                if (!square.getPiece()) return;
                this.CurrentSquare = square;
                
                this.ValidMoves = square.getPiece().getValidMoves(this.game.getState());
                this.ValidMoves.forEach(s => s.HighLightSquare(this.game.context));
                console.log(this.ValidMoves);
        }
        
        onClickMove(event: React.MouseEvent<HTMLElement>) {
                if (!this.CurrentSquare) {
                        this.OnMouseDown(event);
                } else if (this.CurrentSquare && this.NextSquare) {
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
        
        onMouseUp(event: React.MouseEvent<HTMLElement>) {
                if (!this.CurrentSquare || !this.NextSquare) return;
                        const l2 = this.NextSquare.getLocation();
                const invalidmoves = this.ValidMoves.some((s) => {
                        const l = s.getLocation();
                        return l2.name === l.name;
                })
                
                if (!invalidmoves) return;
                this.game.MakeMove(this.CurrentSquare, this.NextSquare);
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