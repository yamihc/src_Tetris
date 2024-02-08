
import { useEffect, useState } from 'preact/hooks';
import './app.css';

import Canvas from './components/canvas/Canvas';

import { boardGame, hauteur, largeur, vitesse, score, scale, highScore, totalLignes } from './signals/tetrisGrille';
import Display from './components/Display';
import Setting from './components/Setting';
import GridBloc from './components/GridBloc';




let tZero = Date.now() ;
let nbSec = 0 ;

function App() {

  const tetrisGrille = boardGame.value;

  const [tictac, setTicTac] = useState(true);
  const [focus,setFocus] = useState(false);
  const [chrono,setChrono] = useState(0);
  const [setting, setSetting ] = useState(false);
  

  const draw = (ctx: CanvasRenderingContext2D) => {

    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)

    tetrisGrille.grille.forEach((ligne,i) => { 
      ligne.forEach((cel,j) => {

        ctx.fillStyle = codeCouleur(cel);

        ctx.fillRect(1+j*scale.value,1+i*scale.value,scale.value-2,scale.value-2)
        
      });

      ctx.fillStyle = codeCouleur(tetrisGrille.tetra.color);
      tetrisGrille.tetra.getAllPosition().forEach( cel => {
        
        ctx.fillRect(1+cel.y*(scale.value),1+cel.x*(scale.value),(scale.value)-2,(scale.value)-2)

      } )
 
      if (!focus && tetrisGrille.isGame) message(ctx,"Clic to continue") ; //alertFocus(ctx);
      if (!tetrisGrille.isGame) { message(ctx, " ** Game Over **");} else {setChrono(chronometre());}
      if (focus) nbSec += (Date.now() - tZero);
      tZero = Date.now();
      
    });
  }


  // const nextTetra = (ctx: CanvasRenderingContext2D) => {
  //   const localScale = scale.value * .85;
  //   ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  //   ctx.fillStyle = codeCouleur(tetrisGrille.nextTetra.color);
  //   tetrisGrille.nextTetra.getAllPosition().forEach( blc => {
  //     ctx.fillRect((1+(blc.y-2)*localScale),(1+(blc.x+1.5)*localScale)-20,localScale-2,localScale-2);
  //   })
  // }



  const keyBoardEvent = ({key}: any) => {

    switch (key) {
      case 'ArrowLeft':
        tetrisGrille.tetraMvLeft();
        break;
      case 'ArrowRight':
        tetrisGrille.tetraMvRight();
        break;
      case 'ArrowUp':
        tetrisGrille.tetraTurn();
        break;
      case 'ArrowDown':
        tetrisGrille.tetraMvDown();
        break;    
    
      default:
        break;
    }
  }

  const settingOn = () => {
    setSetting(true);
    tetrisGrille.endGame();
    vitesse.value = 1000;
  }

  const settingOff = () => {
    setSetting(false);
    setTicTac(!tictac);
  }



  useEffect( () => {
    
    if (tetrisGrille.isGame) {
      setTimeout( () => {
        if (focus && tetrisGrille.isGame) tetrisGrille.tetraMvDown()
         setTicTac(!tictac)
      },vitesse.value);
    }

  },[tictac]) 


  if (setting) {
    return(
      <>
          <div style={CSS.container}>
              <Setting callback={settingOff} />
          </div>
      </>
    )
  }

  const nextTetraGrid = () => {
    const size = 5;
    const center = 2;
    const ligne = new Array(size);
    const stringGrille = Array.from(ligne, () => new Array(size).fill("white"));

    const tetraColor = codeCouleur(tetrisGrille.nextTetra.color)

    stringGrille[center][center] = tetraColor;

    for (let i = 0 ; i < tetrisGrille.nextTetra.perif.length ; i++) {
      
      let relativCoordBloc = tetrisGrille.nextTetra.perif[i].getRelativePosition();
      
      stringGrille[center+relativCoordBloc.x][center+relativCoordBloc.y] = tetraColor;
    
    }

    return stringGrille;
  }

const cssResponsive = {
  container :{
    width: `${largeur.value*scale.value + 280 }px`,
    margin: 'auto',
    display: 'flex',
    justifyContent: "space-around",
    border: "2px solid black",
    padding: "4px",
    borderRadius: "15px",
  }
}

  return (
    <>    
          <div tabIndex={0} onKeyDown={keyBoardEvent} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={cssResponsive.container}>
            <Canvas draw={draw} width={`${largeur.value*scale.value}`} height={`${hauteur.value*scale.value}`} style={CSS.canvasBoard} />
            <div style={CSS.containerRight} >
              {/* <Canvas draw={nextTetra} width={`${4*scale.value}`} height={`${4*scale.value}`}  style={CSS.canvasSide} /> */}
              <GridBloc colors={nextTetraGrid()} />
              <Display titre="High Score :" info={ getHighScore() } />
              <Display titre="Score :" info={score.value} />
              <Display titre="Total lines :" info={totalLignes.value} />
              <Display titre="Chrono :" info={chrono} /> 
              <button onClick={settingOn} style={CSS.bouton} >Setting</button>
            </div>
          </div>
    </>
  )
}

export default App

function getHighScore(): number {

  if (highScore.value >= score.value) {
    return highScore.value;
  } else {
    localStorage.setItem("YamihcGame_Tetris_HighScore",(score.value).toString())
    return score.value;
  }   
}


// function alertFocus(ctx: CanvasRenderingContext2D) {

//   ctx.font = `${scale}px Arial`;
//   ctx.fillStyle = "white";
//   ctx.fillText("Clic to continue",largeur.value*scale.value/8,hauteur.value*scale.value/2)

// }

// function gameOver(ctx: CanvasRenderingContext2D) {

//   ctx.font = `${scale}px Arial`;
//   ctx.fillStyle = "white";
//   ctx.fillText(" !! GAME OVER !!",largeur.value*scale.value/8,hauteur.value*scale.value/2)

// }


function message(ctx: CanvasRenderingContext2D, message:string){
  ctx.font = `${scale.value}px VT323, monospace`;
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText(message,largeur.value*scale.value/2,hauteur.value*scale.value/2 )
}


function chronometre():number {
  return Math.floor(nbSec/1000);

}

export function resetChrono() {
  tZero = Date.now();
  nbSec = 0;
  
}


const CSS = {
  container :{
    width: `${largeur.value*scale.value + 280 }px`,
    margin: 'auto',
    display: 'flex',
    justifyContent: "space-around",
    border: "2px solid black",
    padding: "4px",
    borderRadius: "15px",
  },
  containerRight :{
    display: 'flex',
    flexDirection : 'column',
    alignItems: "center",
    
    justifyContent: "space-around",
  },
  canvasBoard : {
    border: '5px solid black',
    backgroundColor: 'black',
  },
  canvasSide : {
    border: '3px solid black',
    backgroundColor: '#e1e1e1',
    width: '160px',
    height: '160px',
  },
  bouton :{
    fontSize: '26px',
    textAlign: 'center',
    fontWeight: 700,
    border: "2px solid black",
    borderRadius: "15px",
    padding: "12px",
    width: '150px',
    backgroundColor: '#9DF0A4'
  }
}


function codeCouleur ( code: number):string {

  switch (code) {
    case 0 :
      return '#2F2F2F';
    case 1 : 
      return '#FF0000';
    case 2 : 
      return '#0000FF';
    case 3 : 
      return '#00FF00';
    case 4 : 
      return '#FFFF00';
    case 5 : 
      return '#00FFFF';
    case 6 : 
      return '#FF00FF';
    case 7 : 
      return '#FFA500';

    default:
      return 'white';
      
  }

}
