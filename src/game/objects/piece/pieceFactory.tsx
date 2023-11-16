import Piece from "./piece";
import Rook from "./rook";
import King from "./king";
import Bishop from "./bishop";
import Pawn from "./pawn";
import Knight from "./knight";
import Queen from "./queen";
import { FilesAndRanks } from "../defs";

export default class PieceFactory{
        create() {
                const pieces = new Map<string, Piece>()
        //Rooks        
                pieces.set("A1", new Rook('white'));
                pieces.set("H1", new Rook('white'));
                pieces.set("A8", new Rook('black'));
                pieces.set("H8", new Rook('black'));

        //Knights
                pieces.set("B1", new Knight('white'));
                pieces.set("G1", new Knight('white'));
                pieces.set("B8", new Knight('black'));
                pieces.set("G8", new Knight('black'));

        //Bishop
                pieces.set("C1", new Bishop('white'));
                pieces.set("F1", new Bishop('white'));
                pieces.set("C8", new Bishop('black'));
                pieces.set("F8", new Bishop('black'));

        //Queens
                pieces.set("D1", new Queen('white'));
                pieces.set("D8", new Queen('black'));

        //kings
                pieces.set("E1", new King('white'));
                pieces.set("E8", new King('black'));
                
        //Pawns
                const fileKeys = Object.keys(FilesAndRanks);
                
                for (let file = 0; file < fileKeys.length;file++) {                        
                pieces.set(fileKeys[file] + "2", new Pawn('white'));
                pieces.set(fileKeys[file] + "7", new Pawn('black'));
        }
        
                return pieces;
        }
}