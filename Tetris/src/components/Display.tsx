import React from "preact/compat";

import css from "./CSS/display.module.css";

const Display: React.FC<MesProps> = ({titre,info}) => {
   
    return (
        <>
            <div class={css.container}>
                <p class={css.titre} >{titre}</p>
                <span class={css.info}>{info}</span>
            </div>
        </>
    )
}

export default Display;

interface MesProps {
    info: number;
    titre: string;
}