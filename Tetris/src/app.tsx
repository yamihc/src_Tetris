
import { useEffect, useState } from 'preact/hooks';
import './app.css';

import Canvas from './components/canvas/Canvas';

import { boardGame, hauteur, largeur } from './signals/tetrisGrille';

const scale = 50;


function App() {

  const tetrisGrille = boardGame.value;

  const [tictac, setTicTac] = useState(true);
  const [focus,setFocus] = useState(false);

  const codeCouleur = ( code: number):string => {

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


  const draw = (ctx: CanvasRenderingContext2D) => {

    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)

    tetrisGrille.grille.forEach((ligne,i) => { 
      ligne.forEach((cel,j) => {

        ctx.fillStyle = codeCouleur(cel);

        ctx.fillRect(1+j*scale,1+i*scale,scale-2,scale-2)
        
      });

      ctx.fillStyle = codeCouleur(tetrisGrille.tetra.color);
      tetrisGrille.tetra.getAllPosition().forEach( cel => {
        
        ctx.fillRect(1+cel.y*scale,1+cel.x*scale,scale-2,scale-2)

      } )
      
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

  const css = {
    border: '5px solid black',
    backgroundColor: 'black',
  }


  useEffect( () => {
    
    
    if (tetrisGrille.isGame) {
      setTimeout( () => {
        if (focus) tetrisGrille.tetraMvDown();
        setTicTac(!tictac)
      },1500)
    }

  },[tictac]) 


  useEffect( () => {
    tetrisGrille.newTetra();
  },[])


  return (
    <div tabIndex={0} onKeyDown={keyBoardEvent} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)} style={CSS.container}>
      <Canvas draw={draw} width={`${largeur.value*scale}`} height={`${hauteur.value*scale}`} style={css} />
    </div>
  )
  
}

const CSS = {
  container :{
    width: `${largeur.value*scale}px`,
    margin: 'auto',

  }
}


export default App

