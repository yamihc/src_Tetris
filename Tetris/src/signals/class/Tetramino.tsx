import { coord, tetraArray } from "../../types/mestypes";
import { Bloc } from "./Bloc";

const axe = [{x:-1,y:0},{x:0,y:-1},{x:1,y:0},{x:0,y:1}];
const diag = [{x:-1,y:-1},{x:1,y:-1},{x:1,y:1},{x:-1,y:1}];



export class Tetramino {
   core : coord ;
   perif : Bloc[] ;
   color : string ;

   constructor(position: coord, perifs: Bloc[], color: string){
      this.core = position ;
      this.perif = perifs ;
      this.color = color;
   }


   getAllPosition(): coord[] {
      const retour = [{...this.core}] ;

      this.perif.forEach( blc => {
         retour.push({x:this.core.x + blc.positions[blc.idx].x * blc.dist , y: this.core.y + blc.positions[blc.idx].y * blc.dist})
      })

      return retour ;
   }


   turnTrigo() {
      this.perif.forEach( blc => blc.turnTrigo() )
   }

   testTurnTrigo() {

      const retour = [{...this.core}] ;

      this.perif.forEach( blc => {
         const virtalIdx = blc.getVirtualTrigo();
         retour.push({x:this.core.x + blc.positions[virtalIdx].x * blc.dist , y: this.core.y + blc.positions[virtalIdx].y * blc.dist})
      })

      return retour ;

   }

   testMovePosition(virtalCore: coord): coord[] {
      const retour = [virtalCore] ;

      this.perif.forEach( blc => {
         retour.push({x:virtalCore.x + blc.positions[blc.idx].x * blc.dist , y: virtalCore.y + blc.positions[blc.idx].y * blc.dist})
      })

      return retour ;
   }

   moveLeft() {
      this.core.y-- ;
   }

   moveRight() {
      this.core.y++ ;
   }

   moveDown() {
      this.core.x++ ;
   }

   testMoveLeft() {
      return this.testMovePosition({x: this.core.x , y: this.core.y - 1 })
   }

   testMoveRight() {
      return this.testMovePosition({x: this.core.x , y: this.core.y + 1 })
   }

   testMoveDown() {
      return this.testMovePosition({x: this.core.x + 1 , y: this.core.y })
   }




}



export class TetraminoCube extends Tetramino {
  
   constructor(position: coord){
      super(position,[new Bloc(axe,3,1),new Bloc(axe,2,1),new Bloc(diag,2,1)],'blue');
   }
}

export class TetraminoLigne extends Tetramino {
  
   constructor(position: coord){
     super(position,[new Bloc(axe,0,1),new Bloc(axe,2,1),new Bloc(axe,2,2)],'yellow');
   }
}
 
export class TetraminoLGauche extends Tetramino {
  
   constructor(position: coord){
     super(position,[new Bloc(axe,0,1),new Bloc(axe,2,1),new Bloc(diag,1,1)],'brown');
   }
}

export class TetraminoLDroit extends Tetramino {
  
   constructor(position: coord){
     super(position,[new Bloc(axe,0,1),new Bloc(axe,2,1),new Bloc(diag,2,1)],'pink');
   }
}

export class TetraminoLT extends Tetramino {
  
   constructor(position: coord){
     super(position,[new Bloc(axe,0,1),new Bloc(axe,1,1),new Bloc(axe,3,1)],'violet');
   }
}

export class TetraminoSGauche extends Tetramino {
  
   constructor(position: coord){
     super(position,[new Bloc(axe,0,1),new Bloc(axe,1,1),new Bloc(diag,1,1)],'red');
   }
}

export class TetraminoSDroit extends Tetramino {
  
   constructor(position: coord){
     super(position,[new Bloc(axe,0,1),new Bloc(axe,3,1),new Bloc(diag,2,1)],'blue');
   }
}
