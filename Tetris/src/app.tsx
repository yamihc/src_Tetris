
import { useEffect, useState } from 'preact/hooks';
import './app.css';

import Canvas from './components/canvas/Canvas';

import { boardGame, hauteur, largeur, vitesse, score, scale, highScore, totalLignes, localStorageName } from './signals/tetrisGrille';

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
 
      if (!focus && tetrisGrille.isGame) message(ctx,"Clic to continue") ; 
      if (!tetrisGrille.isGame) { message(ctx, "** Game Over **");} else {setChrono(chronometre());}
      if (focus) nbSec += (Date.now() - tZero);
      tZero = Date.now();
      
    });
  }

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
    width: `${containerWidth() < window.innerWidth ? containerWidth() : containerWidth() - 180}px`,
    margin: 'auto',
    display: 'flex',
    justifyContent: `${containerWidth() < window.innerWidth ? "space-around" : "center"}`,
    border: "2px solid black",
    padding: "4px",
    borderRadius: "15px",
  },
  slimInfo: {
    width:"50px",
    backgroundColor:`${codeCouleur(tetrisGrille.nextTetra.color)}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
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
          <div style={CSS.setting}>
              <Setting callback={settingOff} />
          </div>
      </>
    )
  }


  return (
    <>    
          <div tabIndex={0} onKeyDown={keyBoardEvent} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={cssResponsive.container}>
            <Canvas draw={draw} width={`${largeur.value*scale.value}`} height={`${hauteur.value*scale.value}`} style={CSS.canvasBoard} />
            { containerWidth() < window.innerWidth ?  
                  <div style={CSS.containerRight} >
                    <GridBloc colors={nextTetraGrid()} />
                    <Display titre="High Score :" info={ getHighScore() } />
                    <Display titre="Score :" info={score.value} />
                    <Display titre="Total lines :" info={totalLignes.value} />
                    <Display titre="Chrono :" info={chrono} /> 
                    <button onClick={settingOn} style={CSS.bouton} >Setting</button>
                  </div>    
                  :
                  <div style={cssResponsive.slimInfo}>
                    <button onClick={settingOn} style={CSS.slimBouton} >
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                      </svg>
                    </button>                    
                  </div>
          
            }           
            
          </div>
    </>
  )
}

export default App

function containerWidth():number {
  return  largeur.value*scale.value + 280;
}

function getHighScore(): number {

  if (highScore.value >= score.value) {
    return highScore.value;
  } else {
    localStorage.setItem(localStorageName,(score.value).toString())
    return score.value;
  }   
}


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
  setting: {
    width: `80%`,
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
  },
  slimBouton : {
    width : "45px",
    backgroundColor: 'rgba(200,200,200,0.2)',
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
