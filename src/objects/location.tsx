import { FilesAndRanks } from "../defs";

const files = Object.keys(FilesAndRanks);
const ranks = Object.values(FilesAndRanks)

export default class Location{
       private file: number;
       private rank: number;
       private name: string;
        constructor(file:number,rank:number) {
                this.file = file;
                this.rank = rank;
                this.name = files[file] + "" + ranks[rank]; 
        }
        
        getFile() {
                return this.file;
        }
        
        getRank() {
                return this.rank
        }
        getName() {
                return this.name;
        }

}