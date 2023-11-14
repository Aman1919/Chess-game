import Location from "./location";
import Piece from "./piece/piece";
import PieceFactory from "./piece/pieceFactory";
import Square from "./square";
class ChessBoard {
        width: number;
        height: number;
        context: CanvasRenderingContext2D;
        state: Square[][];
        pieces: Map<string, Piece>;
        constructor(
                width: number,
                height: number,
                context: CanvasRenderingContext2D
        ) {
                this.width = width;
                this.height = height;
                this.context = context;
                this.state = [[], [], [], [], [], [], [], []];
                this.pieces = new PieceFactory().create();
                this.InitializeChessBoard();
        }

        
        getSquare(file: number, rank: number) {
                if (rank < 0 || file > 7 || rank < 0 || rank > 7) { 
                        throw new Error('Index out of bound in chess board'); 
        } 
                return this.state[rank][file];
        }
        private InitializeChessBoard() {
                for (let rank = 0; rank < 8; rank++) {
          for (let file = 0; file < 8; file++) {
                                this.InitSquare(file, rank);
                        }
                }
        }

        private InitSquare(file: number, rank: number) {
                const squareWidth = this.width / 8,
                        squareHeight = this.height / 8;
                const location = new Location(file, rank);
                const piece = this.pieces.get(location.getName()) || null;
                const square = new Square(
                        squareWidth,
                        squareHeight,
                        location,
                        this.context,
                        piece,
                );
                piece?.setSquare(square)
                this.state[rank][file] = square;
        }
}

export default ChessBoard;
