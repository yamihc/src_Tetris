

import { useEffect, useState } from 'preact/hooks';
import './app.css';

import Canvas from './components/canvas/Canvas';

import { boardGame, hauteur, largeur } from './signals/tetrisGrille';



function App() {

  const tetrisGrille = boardGame.value;
  const scale = 50;

  const [tictac, setTicTac] = useState(true)

  //console.dir(tetrisGrille);
    
  const draw = (ctx: CanvasRenderingContext2D) => {

    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)

    tetrisGrille.grille.forEach((ligne,i) => { 
      ligne.forEach((cel,j) => {

        switch (cel) {
          case 0 :
            ctx.fillStyle = 'black';
            break;
          case 1 : 
            ctx.fillStyle = 'red';
            break;
          default:
            ctx.fillStyle = 'white';
            break;
        }

        ctx.fillRect(1+j*scale,1+i*scale,scale-2,scale-2)
        
      });

      
      tetrisGrille.tetra.getAllPosition().forEach( cel => {
        ctx.fillStyle = 'yellow' ;
        ctx.fillRect(1+cel.y*scale,1+cel.x*scale,scale-2,scale-2)

      } )

     // tetrisGrille.tetraDown();
      
    });

  }

  const keyBoardEvent = ({key}) => {

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

   // console.log(key);
  }
  

  const css = {
    border: '5px solid black',
  }


  useEffect( () => {
    setTimeout( () => {
    //  console.dir(tetrisGrille.tetra.getAllPosition())
      tetrisGrille.tetraMvDown();
      setTicTac(!tictac)
    },2000)


  },[tictac]) 


  useEffect( () => {
    tetrisGrille.newTetra();
  },[])


  return (
    <div tabIndex={0}  onKeyDown={keyBoardEvent}>
      <Canvas draw={draw} width={`${largeur.value*scale}`} height={`${hauteur.value*scale}`} style={css} />
    </div>
  )
  
}

function keyBoardEventA() {
  console.log('test')
}


export default App

