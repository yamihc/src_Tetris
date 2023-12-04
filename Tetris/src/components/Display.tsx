import React from "preact/compat";

import css from "./CSS/display.module.css"

const Display: React.FC<MesProps> = ({info}) => {
    

    return (
        
            <div class={css.container}>
                <span class={css.info}>{info}</span>
            </div>
        
    )
}

export default Display;

interface MesProps {
    info: number;
}