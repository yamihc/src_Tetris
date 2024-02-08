//import React from "preact/compat";

import { scale } from "../signals/tetrisGrille";


const FrontBloc: React.FC<bProps> = ({color}) => {

    const css = {
        bloc: {
            width: `${scale.value/2}px`,
            height: `${scale.value/2}px`,
            backgroundColor: color,
            margin: '1px'
        }
    }

    return (
        <div style={css.bloc}>
        </div>
    )

}

interface bProps {
    color: string;
}


const LigneBloc: React.FC<lProps> = ({row}) => {

    const css = {
        ligne :{
            display :'flex',
            flexDirection: "row"   
        }
    }
    
    return (
        <div style={css.ligne} >
            {row.map(bloc => <FrontBloc color={bloc} />)}
        </div>
    )
}

interface lProps {
    row :string[];
}

const GridBloc: React.FC<Props> = ({colors}) => {

    const css = {
        container :{
            border: "3px solid",
            borderRadius: "12px",   
            padding: "1rem"
        }
    }


    return (
        <div style={css.container}>
            {colors.map(ligne => <LigneBloc row={ligne} />)}
        </div>
    )
}

export default GridBloc;

interface Props {
    colors : string[][];
}
