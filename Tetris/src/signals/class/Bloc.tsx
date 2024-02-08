import { coord, idTable, range } from "../../types/mestypes";


export class Bloc {
    idx: idTable;
    positions: coord[];
    dist: range ;

    constructor(positions: coord[], id: idTable, dist: range ) {
        this.idx = id;
        this.positions = positions ;
        this.dist = dist ;
    }

    turnTrigo() {
        if (this.idx > 0) {
            this.idx-- ;
        } else {
            this.idx = 3 ;
        }
    }

    getVirtualTrigo() {
        if (this.idx > 0) {
            return this.idx - 1 ;
        } else {
            return 3 ;
        }
    }

    getRelativePosition():coord {
        let ret = {
            x : this.positions[this.idx].x*this.dist,
            y : this.positions[this.idx].y*this.dist
        }
        return ret;
    }

}



