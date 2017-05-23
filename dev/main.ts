
class Game {

    private static _instance : Game;

    private supporter : Supporter;
    
    public static instance() : Game {
        if(!Game._instance) Game._instance = new Game();
        return Game._instance;

    }
    constructor() {
        this.supporter = new Supporter(this);
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        this.supporter.update();
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