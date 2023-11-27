import { signal } from "@preact/signals";
import Grille from "./class/Grille";

const hauteur = signal(15);
const largeur = signal(9);


const initalBoard = (): number[][] => {
    const lignes = new Array(hauteur.value)
    const grille = Array.from(lignes, () => (new Array(largeur.value)).fill(0))

    return grille;
}


const boardGame = signal(new Grille(initalBoard()));

const tetramino = signal([{x:3,y:5}]);  // non utilisé



export { hauteur, largeur, boardGame, tetramino }