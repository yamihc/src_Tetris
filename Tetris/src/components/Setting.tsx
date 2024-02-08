//import React from "preact/compat";

import { useState } from "preact/hooks"
import { hauteur, largeur,resetBoard, vitesse } from "../signals/tetrisGrille"

import css from "./CSS/setting.module.css";

const Setting: React.FC<{callback: () => void }> = ({callback}) => {

    const [largeurTmp, setLargeurTmp] = useState(largeur.value);
    const [hauteurTmp, setHauteurTmp] = useState(hauteur.value);
    const [vitesseTmp, setVitesseTmp] = useState(vitesse.value);

    const confirmSetting = () => {
        largeur.value = largeurTmp;
        hauteur.value = hauteurTmp;
        vitesse.value = vitesseTmp;

        resetBoard();
        callback();
    }

    
    return (
        <>  
            <div class={css.form}>
                <form >
                    <div>
                        <h2>Dimmension de la grille</h2>
                        <label htmlFor="hauteur">Hauteur ({hauteurTmp}) :</label>
                        <input
                            type="range"
                            id="hauteur"
                            name="hauteur"
                            min="5"
                            max="55"
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
                    </div>                        

                    <div>
                        <h2>Vitesse de départ</h2>
          
                        <label htmlFor="vitesse">Vitesse :</label>
                        <input
                            type="range"
                            id="vitesse"
                            name="vitesse"
                            min="200"
                            max="2000"
                            dir={"rtl"}
                            value={vitesseTmp}
                            onChange={(e) => { if (e.target instanceof HTMLInputElement)  {setVitesseTmp(parseInt(e.target.value))} }}
                        />
                     </div>

                     <button type="button" onClick={confirmSetting} class={css.button}>Restart Game</button>

                   
               </form>

               
            </div>
        </>

    )
}

export default Setting;