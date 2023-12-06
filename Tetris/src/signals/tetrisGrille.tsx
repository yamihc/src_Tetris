import { signal } from "@preact/signals";
import Grille from "./class/Grille";

const hauteur = signal(22);
const largeur = signal(10);

const vitesse = signal(1500);
const score = signal(0);

const initalBoard = (): number[][] => {
    const lignes = new Array(hauteur.value)
    const grille = Array.from(lignes, () => (new Array(largeur.value)).fill(0))

    return grille;
}

const boardGame = signal(new Grille(initalBoard()));


export { hauteur, largeur, boardGame, vitesse, score }