export type idTable = 0 | 1 | 2 | 3 ;

export type range = 1 | 2 ;

export type coord = {
    x:number,
    y:number,
}

export interface tetraArray {
    center: coord,
    perif: coord[],
}