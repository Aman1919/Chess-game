import Location from "./location";
import Piece from "./piece/piece";
import { SquareColor } from "../defs";


class Square{
        width: number;
        height: number;
        location: Location
        color: string;
        piece: Piece | null;
        constructor(width:number,height:number,location:Location,context:CanvasRenderingContext2D,piece:Piece | null) {
                this.width = width;
                this.height = height;
                this.location = location
                this.color = this.selectColor();
                this.piece = piece;
                this.DrawSquare(context);
        }
        
        
        setPiece(piece: Piece | null,context:CanvasRenderingContext2D) {
                this.piece = piece;
                this.DrawSquare(context);
        }
        
        getPiece() {
                return this.piece;
        }
        
        removeHightLight(context: CanvasRenderingContext2D) {
                this.DrawSquare(context);
        }
        
        HighLightSquare(context:CanvasRenderingContext2D) {
                const colour = !this.piece ? 'yellow' : 'red';
                let location = this.getLocation();
                
                context.fillStyle = colour;
                context.globalAlpha = 0.2
                context.fillRect(
                        location.file * this.width,
                        location.rank * this.height,
                        this.width,
                        this.height
                );
                
                this.DrawPiece(context);
        }
        
        private DrawSquare(context: CanvasRenderingContext2D) {
                let location = this.getLocation();
                context.clearRect(
                        location.file * this.width,
                        location.rank * this.height,
                        this.width,
                        this.height
                );
                context.globalAlpha = 1
                context.fillStyle = this.color;
                context.fillRect(
                        location.file * this.width,
                        location.rank * this.height,
                        this.width,
                        this.height
                );
                this.DrawPiece(context);
        }
        

        private DrawPiece(context: CanvasRenderingContext2D) {
                if (!this.piece) return;
                
                let location = this.getLocation();
                
                context.font = this.height * .9  + 'px sans-serif';
                context.fillStyle = (this.piece.pieceColor)?'black':'white';
                context.textAlign = 'start'
                context.textBaseline =  'top';
                context.fillText(
                        this.piece.unicode,
                        location.file * this.width,
                        (location.rank) * this.height + this.height * 0.1,
                )
        }
        
        

        getLocation() {
               return { file: this.location.getFile(), rank: this.location.getRank(), name: this.location.getName() };
        }
        
        private selectColor() {
                let location = this.getLocation();
                if((location.file % 2 === 0 && location.rank % 2 === 0) || (location.file % 2 !== 0 && location.rank % 2 !== 0)) return SquareColor.light
                return SquareColor.Dark;
        }

}


export default Square;