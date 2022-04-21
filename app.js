canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d')


let width = canvas.width = screen.width,
    height = canvas.height = 900,
    mid = width / 2,
    stackActive = [],
    frameCount = 0,
    ground = false,
    decay = dk = .97;

const x = Math.random() * width,
      y = 0,
      str = 4,
      clr = "rgb(255, 255, 120)",
      lk = 2,
      sd = 120,
      rt = true,
      indx = -1;


canvas.style.background = 'black'
//                         (X1, Y1, strength, color, luck, splitDistance, root)


function init() {

   stackActive = []
   let temp = new LightningNode(x, y, str, clr, lk, sd, rt, indx)
   stackActive.push(temp)
   // temp = new LightningNode(x + 10, y, str, clr, lk, sd, rt, indx)
   // stackActive.push(temp)
   new Promise((resolve, reject) => {
          resolve(new Audio('rain.mp3'))
   })
   .then((arg)=>{
      arg.play()
      arg.addEventListener("ended", ()=>{
         arg.play()
      })
   })
   loop()
}

function loop() {
   frameCount++
   ctx.clearRect(0,0,width,height)
   canvas.style.background = 'black'

   for (s of stackActive){
      let temp = s.updateLoc(stackActive.length)
      if (temp != undefined && stackActive.length < 500){
         for (t of temp){
            stackActive.push(t)
         }
      }
      let temp2 = s.draw()
      if (temp2){
         canvas.style.background = 'rgb(16, 16, 74)'
         for (s of temp2){
            stackActive[s].strength += 6
            // if(stackActive[s].wasRoot){
            //    stackActive[s].color = 'blue'
            // }
         }

         decay = 1
      }
   }


   // console.log(frameCount);
   if (frameCount > 300){
      frameCount = 0
      ground = false
      decay = dk
      stackActive = []
      stackActive.push(new LightningNode(Math.random() * width, y, str, clr, lk, sd, rt, indx))
      // stackActive.push(new LightningNode(x - 10, y, str, clr, lk, sd, rt, indx))
   }

   window.requestAnimationFrame(loop)
}


canvas.addEventListener('click', ()=>{
   init()
})
