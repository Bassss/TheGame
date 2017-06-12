
class Game {

    private static _instance : Game;

    public supporter : Supporter;
    private policeForge : Array<Policeman>  = new Array<Policeman>();
    

    public static instance() : Game {
        if(!Game._instance) Game._instance = new Game();
        return Game._instance;

    }
    constructor() {
        this.supporter = new Supporter(this);
        this.policemanCreator2000()

        requestAnimationFrame(() => this.gameLoop());
    }
   private policemanCreator2000(){
  

        for (var i = 0; i < 25; i++) {
        this.policeForge.push(new Policeman(this));
       this.policeForge[i].x = i*100;
        
        
         }
    }

    private gameLoop(){
        this.supporter.update();
        for (var i = 0; i < 25; i++) {
             this.policeForge[i].update();
        }
        requestAnimationFrame(() => this.gameLoop());
    }


    public endGame(){
        document.getElementById("score").innerHTML = "Score : 0";
    }
} 


// load
window.addEventListener("load", function() {
    Game.instance();
});

// window.addEventListener("load", function() {
//     new Game();
// });