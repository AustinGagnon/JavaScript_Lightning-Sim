let thunderAudio = [];


class LightningNode {
   constructor(X1, Y1, strength, color, luck, splitDistance, root, curr, prev) {
      this.index = curr
      this.prev = prev
      this.root = root
      this.wasRoot = root
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
      this.strength = (root === true ? 6 : 3)


   }


   updateLoc = (len)=>{
      this.dist = this.distance(this.X1, this.Y1, this.X2, this.Y2)
      if (this.dist < this.splitDistance) {
         // Move
         if (stackActive[3]){
            console.log(stackActive[2].prev);
         }
         this.X2 += this.dx
         this.Y2 += this.dy

      }
      else if (this.dist > this.splitDistance && this.child === false) {

         let temp = [],
             rt = this.root;

         for (let i = 0; i < this.luck; i++){
            if (i > 0){
               rt = false
            }
            //                              (X1,      Y1,      strength,      color,                           luck,    splitDistance,       root,   curr, prev)
            temp.push(new LightningNode(this.X2, this.Y2, this.strength, this.color, Math.floor(Math.random() * 3 + .2), this.splitDistance * .85 + 1, rt, stackActive.length + i, this.index))
            // temp.push(new LightningNode(this.X2, this.Y2, this.strength, colors[Math.floor(Math.random()*cLen)], 1, this.splitDistance * .85 + 1, rt, stackActive.length + i, this.index))
            // temp.push(new LightningNode(this.X2, this.Y2, this.strength, this.color, Math.floor(Math.random() * 3 + .2), this.splitDistance * .85, rt, this.index))
         }

         this.root = false
         this.child = true

            return temp
      }
      else if (this.root) {
         this.root = false
         //                            (X1,      Y1,      strength,      color,luck,    splitDistance,       root,       prev)
         temp.push(new LightningNode(this.X2, this.Y2, this.strength, this.color, Math.floor(Math.random() * 3 + .2), this.splitDistance * .85 + 1, true, stackActive.length, this.index))
         // return [new LightningNode(this.X2, this.Y2, this.strength, colors[Math.floor(Math.random()*cLen)], 2, this.splitDistance * .65 + 3, true, this.index)]

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
      ctx.fillStyle = `rgba(255, 255, 120, ${this.strength / 3})`
      ctx.arc(this.X2, this.Y2, 2, 0, 2*Math.PI)
      ctx.fill()


      if (this.Y2 > height && ground == false){
         let t = thunderAudio.length
         thunderAudio.push(new Audio('thunder_sound_effect.mp3'))
         thunderAudio[t].play()
         thunderAudio[t].addEventListener("ended", ()=>{ thunderAudio.shift() })
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
