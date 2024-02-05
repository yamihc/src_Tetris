//import React from "preact/compat";
import { useState } from "preact/hooks"
import { hauteur, largeur,resetBoard } from "../signals/tetrisGrille"


const Setting: React.FC = () => {

    const [largeurTmp, setLargeurTmp] = useState(largeur.value);
    const [hauteurTmp, setHauteurTmp] = useState(hauteur.value);

    const confirmSetting = () => {
        largeur.value = largeurTmp;
        hauteur.value = hauteurTmp;

        resetBoard();

    }


    return (
        <>
            <form >
            <label htmlFor="hauteur">Hauteur ({hauteurTmp}) :</label>
            <input
                type="range"
                id="hauteur"
                name="hauteur"
                min="5"
                max="35"
                value={hauteurTmp}
                onChange={(e) => { if (e.target instanceof HTMLInputElement)  {setHauteurTmp(parseInt(e.target.value))} }}
            />

            <label htmlFor="largeur">Largeur ({largeurTmp}) :</label>
            <input
                type="range"
                id="largeur"
                name="largeur"
                min="5"
                max="35"
                value={largeurTmp}
                onChange={(e) => { if (e.target instanceof HTMLInputElement) {setLargeurTmp(parseInt(e.target.value))} }}
            />

            <button type="button" onClick={confirmSetting}>Valider</button>
            </form>

        </>

    )
}

export default Setting;