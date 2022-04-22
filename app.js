canvas = document.querySelector('canvas');
ctx = canvas.getContext('2d')


let width = canvas.width = screen.width,
    height = canvas.height = 900,
    mid = width / 2,
    stackActive = [],
    frameCount = 0,
    ground = false,
    decay = dk = .98,
    bgAudio = null;

let colors = ['AliceBlue','AntiqueWHite','Aqua','Azure','CornflowerBlue','Coral','Cyan','DarkGreen','DarkOliveGreen','DarkSalmon','DeepPink','DodgerBlue','FireBrick'],
    cLen = colors.length

const x = mid
      y = 0,
      str = 4,
      clr = colors[Math.floor(Math.random()*cLen)],
      lk = 2,
      sd = 120,
      rt = true,
      indx = 0
      prev = -1;


canvas.style.background = 'black'
//                         (X1, Y1, strength, color, luck, splitDistance, root)

function reset() {
   stackActive = []
   try {
      bgAudio.pause()
   } catch(e) {

   }

   init()
}

function init() {
   let temp = new LightningNode(x, y, str, clr, lk, sd, rt, indx, prev)
   stackActive.push(temp)
   // temp = new LightningNode(x + 10, y, str, clr, lk, sd, rt, indx, prev)
   // stackActive.push(temp)
   let bgAudio = new Audio('rain.mp3')
   bgAudio.play()

   // new Promise((resolve, reject) => {
   //        resolve(new Audio('rain.mp3'))
   // })
   // .then((arg)=>{
   //    arg.play()
   //    arg.addEventListener("ended", ()=>{
   //       arg.play()
   //    })
   // })
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

         decay = .97
      }
   }


   // console.log(frameCount);
   if (frameCount > 300){
      frameCount = 0
      ground = false
      decay = dk
      stackActive = []
      stackActive.push(new LightningNode(mid, y, str, clr, lk, sd, rt, indx, prev))
      // stackActive.push(new LightningNode(x - 10, y, str, clr, lk, sd, rt, indx, prev))
   }

   window.requestAnimationFrame(loop)
}


canvas.addEventListener('click', ()=>{
   reset()
})
