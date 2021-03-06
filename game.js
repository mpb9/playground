
window.addEventListener('load', () => {
    const container = document.querySelector('#gameDisplay');
    
    class Player {
        constructor(x, y, xSpeed, ySpeed, width, height, color) {
            // Initial model
            
            Object.assign(this, { x, y, xSpeed, ySpeed, width, height})
            
            // Initial view
            this.userdiv = document.createElement('div')
            Object.assign(this.userdiv.style, {
              left: `${x}px`,
              top: `${y}px`,
              width: `${width}px`,
              height: `${height}px`,
              backgroundColor: color,
              position: 'absolute',
            })
            container.appendChild(this.userdiv)

            
            
            document.addEventListener('keydown', (e) => {
                if (e.code === "ArrowUp") {
                    this.userMove(0,-1)
                    /*
                    document.addEventListener('keyup', (e) => {
                        this.userMove(0,-1)
                    });    */
                }
                else if (e.code === "ArrowDown") this.userMove(0,1)
                else if (e.code === "ArrowLeft") this.userMove(-1,0)
                else if (e.code === "ArrowRight") this.userMove(1,0)
            }); 
            
            //requestAnimationFrame(advance)
    
            
          }
          userMove(xMove,yMove){
              if(xMove!=0){
                [this.x, this.y] = [this.x + xMove*this.xSpeed, this.y ];

                [this.userdiv.style.left, this.userdiv.style.top] = [`${this.x + xMove*this.xSpeed}px`, `${this.y }px`]
              } else {
                [this.x, this.y] = [this.x, this.y + yMove*this.ySpeed];

                [this.userdiv.style.left, this.userdiv.style.top] = [`${this.x}px`, `${this.y + yMove*this.ySpeed}px`]
              }
          }
          movePlayer() {
            // Update the model
            let top = container.offsetTop +5;
            let left = container.offsetLeft +5;
            [this.x, this.y] = [this.x + this.xSpeed, this.y + this.ySpeed]
            if (this.x < left || this.x > container.clientWidth + left -this.width ) {
              this.x = Math.max(left, Math.min(this.x, container.clientWidth + left -this.width))
              this.xSpeed = -this.xSpeed
            } 
            if (this.y < top || this.y > container.clientHeight - this.width  + top) {
              this.y = Math.max(top, Math.min(this.y, container.clientHeight - this.width + top))
              this.ySpeed = -this.ySpeed
            } 
      
            // Update the view
            [this.userdiv.style.left, this.userdiv.style.top] = [`${this.x}px`, `${this.y}px`]
            
            
          } 

          removePlayer() {
            [this.userdiv.style.width, this.userdiv.style.height] = [`0px`, `0px`]
          }
    }
        
    
    class Game {
      constructor(pawns, player) {
        
        this.pawns = pawns;
        this.player = player;

        requestAnimationFrame(advance)
        
      }
      
      

      remove() {
        [this.div.style.width, this.div.style.height] = [`0px`, `0px`]
      }

    }
  
    
    const advance = () => {
      
        game.pawns.forEach(pawn => {
            if(game.player.x+(game.player.width) >= pawn.x 
            && game.player.x <= pawn.x + pawn.width
            && game.player.y <= pawn.y + pawn.height
            && game.player.y + game.player.height >= pawn.y){
            
            /*if(game.player.width >= pawn.diameter){
                pawn.remove()
            } else { */
                game.player.removePlayer()
            //} 

            }

            pawn.move()
        });
        

        //game.player.movePlayer()
        
        
        requestAnimationFrame(advance)
      
    }
  
    const playerW = 100;
    const playerH = 30;
    const player = new Player(
        container.offsetLeft + 5 + container.clientWidth/2 - playerW/2,
        container.offsetTop + 5 + container.clientHeight - playerH,
        10,
        10,
        playerW,
        playerH,
        'rgba(29, 29, 29, 1)'
    );
    const pawns = [
        new Pawn(container.offsetLeft +5, 
                container.offsetTop +5,
                3,
                20, 24),
        new Pawn(container.offsetLeft + container.clientWidth/2, 
                container.offsetTop + 5,
                3,
                30, 36)
    ];
    const game = new Game(pawns, player);
    
})