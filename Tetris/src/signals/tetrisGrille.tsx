import { signal } from "@preact/signals";
import Grille from "./class/Grille";
import { resetChrono } from "../app";


const highScore = signal(0);
const localStorageName = "YamihcGame_TetrisV1.1_HighScore";
initHighScore();

const hauteur = signal(22);
const largeur = signal(10);
const scale = signal(window.innerHeight/(hauteur.value+1));

window.addEventListener('resize', reScale )

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
    reScale();
    score.value = 0;
    initHighScore();
    boardGame.value = new Grille(initBoard(),Math.floor(largeur.value/2));
    resetChrono();
}

function initHighScore():void {

    const localHighScore = localStorage.getItem(localStorageName);

    if (localHighScore == null) {
        localStorage.setItem(localStorageName,(0).toString())
    
    } else {
        highScore.value = parseInt(localHighScore);
    }

}


function reScale() {
    scale.value = window.innerHeight/(hauteur.value+2) 
    while (scale.value * largeur.value + 200 > window.innerWidth ) {
        scale.value--;
    }
    while (scale.value * largeur.value + 280 > window.innerHeight ) {
        scale.value--;
    }
}

export { hauteur, largeur, boardGame, vitesse, score, scale, highScore,totalLignes, resetBoard, localStorageName }