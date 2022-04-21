let thunderAudio = [];

// ra

class LightningNode {
   constructor(X1, Y1, strength, color, luck, splitDistance, root, prev) {
      this.X1 = X1
      this.Y1 = Y1
      this.X2 = X1
      this.Y2 = Y1
      this.dy = this.delta('y')
      this.dx = this.delta('x')
      this.dist = 0
      this.color = color
      this.child = false
      this.luck = Math.max(luck, 0)
      this.splitDistance = splitDistance + (Math.random() * 10 - 5)
      this.root = root
      this.wasRoot = root
      this.strength = (root === true ? 6 : 3)
      this.index = stackActive.length
      this.prev = prev

   }


   updateLoc = (len)=>{
      // console.log(ground);
      console.log(this.index, len);
      this.dist = this.distance(this.X1, this.Y1, this.X2, this.Y2)
      if (this.dist < this.splitDistance) {
         // Move
         console.log(1);
         this.X2 += this.dx
         this.Y2 += this.dy
      } else if (this.dist > this.splitDistance && this.child === false) {
         // Make children
         console.log(2);
         let temp = [],
             rt = this.root
         for (let i = 0; i < this.luck; i++){
            if (i > 0){
               rt = false
            }
            temp.push(new LightningNode(this.X2, this.Y2, this.strength, this.color, Math.floor(Math.random() * 3), this.splitDistance * .85, rt, this.index))
         }
         this.root = false
         this.child = true;
             return temp
      } else if (this.root) {
         console.log(3);
         this.root = false
         // this.children = false;
         return [new LightningNode(this.X2, this.Y2, this.strength, this.color, 2, this.splitDistance * .85, true, this.index)]
         // return [new LightningNode(this.X2, this.Y2, this.strength, 'this.color', 2, this.splitDistance * .85, true, this.index)]

      } else {

      }

   }


   updateColor = ()=>{
      // TODO
      // Transparency should begin to fade in each update
   }


   draw = ()=>{
      ctx.beginPath()
      ctx.lineWidth = this.strength
      ctx.strokeStyle = this.color
      ctx.moveTo(this.X1, this.Y1)
      ctx.lineTo(this.X2, this.Y2)
      ctx.stroke()
      this.strength *= decay
      // GLOW
      ctx.beginPath()

      ctx.strokeStyle = "rgba(255, 255, 120,.05)"
      // ctx.strokeStyle = "rgba(0, 15, 130,.05)"
      ctx.rect(this.X1 -1, this.Y1 -1, 3, 3)
      ctx.stroke()

      if (this.Y2 > height && ground == false){
         let t = thunderAudio.length
            thunderAudio.push(new Audio('thunder_sound_effect.mp3'))
            thunderAudio[t].play()
            thunderAudio[t].addEventListener("ended", ()=>{
               thunderAudio.shift()
         })
         ground = true;
         let temp = [],
             temp2 = this.prev
         temp.push(this.index)
         while(temp2 != -1){
            temp.push(stackActive[temp2].index)
            temp2 = stackActive[temp2].prev
         }

         console.log(temp);
         return temp
      }

      return false

   }


   distance = (x1, y1, x2, y2)=>{
      return Math.sqrt(Math.pow((x2 - x1),2) + Math.pow((y2 - y1),2))
   }


   delta = (v)=>{
      if (v === 'x'){
         return (Math.random() * 15 + 5) * (Math.random() - .5)
      } else if (v === 'y') {
         return (Math.random() * 10 + 4)  // * (Math.random() - .0005)
      }
   }
}
