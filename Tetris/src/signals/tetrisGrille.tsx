import { signal } from "@preact/signals";
import Grille from "./class/Grille";
import { resetChrono } from "../app";


const highScore = signal(0);

const localHighScore = localStorage.getItem("YamihcGame_Tetris_HighScore");

if (localHighScore == null) {
    localStorage.setItem("YamihcGame_Tetris_HighScore",(0).toString())

} else {
    highScore.value = parseInt(localHighScore);
}

const hauteur = signal(22);
const largeur = signal(10);
const scale = signal(window.innerHeight/(hauteur.value+1));

window.addEventListener('resize', () => {scale.value = window.innerHeight/(hauteur.value+1) } )

const vitesse = signal(1000);
const score = signal(0);
const totalLignes = signal(0);



const initBoard = (): number[][] => {
    const lignes = new Array(hauteur.value)
    const grille = Array.from(lignes, () => (new Array(largeur.value)).fill(0))

    return grille;
}

const boardGame = signal(new Grille(initBoard(),4));

function resetBoard():void {
    scale.value = window.innerHeight/(hauteur.value+2);
    boardGame.value = new Grille(initBoard(),Math.floor(largeur.value/2));
    resetChrono();
}

export { hauteur, largeur, boardGame, vitesse, score, scale, highScore,totalLignes, resetBoard }