import { coord } from "../../types/mestypes";
import { Tetramino, TetraminoCube, TetraminoLDroit, TetraminoLGauche, TetraminoLT, TetraminoLigne, TetraminoSDroit, TetraminoSGauche } from "./Tetramino";


const initialCoord: coord = {x:1,y:4};

class Grille {
    grille: number[][];
    tetra: Tetramino;
    nextTetra: Tetramino;
    isGame : boolean;

    constructor(grille:number[][]) {
        this.grille = grille;
        this.tetra = this.randomTetra({...initialCoord});
        this.nextTetra = this.randomTetra({...initialCoord});
        this.isGame = true ;
    }

    newTetra() {
        if (this.isGame) {
            this.tetra = this.nextTetra;
            this.nextTetra= this.randomTetra({...initialCoord});
            if (!this.isValidMov(this.tetra.getAllPosition())) this.isGame = false;
        }
    }

    randomTetra(position : coord): Tetramino {

        const NB_TETRA = 7;
        const randNumb = Math.floor(Math.random()*NB_TETRA)

        switch (randNumb) {
            case 0:
                return new TetraminoLigne(position) ;
            case 1:
                return new TetraminoCube(position) ;
            case 2:
                return new TetraminoLGauche(position) ;
            case 3 :
                return new TetraminoSGauche(position) ;
            case 4:
                return new TetraminoLDroit(position) ;
            case 5:
                return new TetraminoSDroit(position) ;
            default:
                return new TetraminoLT(position) ;
        }

    }


    isValidMov(vBloc: coord[]): boolean {
        
        let ret = true;
        
        vBloc.forEach( bl => {
            if ( bl.x > this.grille.length-1 || this.grille[bl.x][bl.y] != 0 || bl.y < 0 || bl.y > this.grille[0].length ) ret = false;
            return;
        })

        
        return ret ;
    }

    tetraMvLeft() {
        const vBloc = this.tetra.testMoveLeft();

        if (this.isValidMov(vBloc)) {
            this.tetra.moveLeft();
        }

    }

    tetraMvRight() {
        const vBloc = this.tetra.testMoveRight();

        if (this.isValidMov(vBloc)) {
            this.tetra.moveRight();
        }

    }

    tetraMvDown() {
        const vBloc = this.tetra.testMoveDown();

        if (this.isValidMov(vBloc)) {
            this.tetra.moveDown();
        } else {
            this.fixTetramino();
        }
    }

    tetraTurn() {
        const vBloc = this.tetra.testTurnTrigo();

        if (this.isValidMov(vBloc)) {
            this.tetra.turnTrigo();
        }
    }


    fixTetramino() {
        this.tetra.getAllPosition().forEach( bl => {
            this.grille[bl.x][bl.y] = this.tetra.color ;
        })

        this.removeLines();
        this.newTetra();

    }

    removeLines() {

        const newGrille = this.grille.filter( ligne =>  !this.isLigneCompleted(ligne) )


        if (newGrille.length != this.grille.length) {
            
            const nbNewLignes = this.grille.length - newGrille.length ;
            const largeur = this.grille[0].length;

            for (let i = 0 ; i < nbNewLignes ; i++ ) {
                newGrille.unshift((new Array(largeur)).fill(0))
            }

             this.grille = newGrille;               
        }

    }

    isLigneCompleted( ligne: number[]): boolean {

        for (let i = 0 ; i < ligne.length ; i++ ) {
            if (ligne[i] == 0 ) return false ;
        }

        return true;
    }


}


export default Grille;