
 class Game {

    private static _instance: Game;

    public supporter: Supporter;
    private policeForge: Array<Policeman> = new Array<Policeman>();

    private active : boolean = true;


    public static instance(): Game {
        if (!Game._instance) Game._instance = new Game();
        return Game._instance;

    }
    constructor() {
        this.supporter = new Supporter(this);
        this.policemanCreator2000()
        requestAnimationFrame(() => this.gameLoop());

    }
    private policemanCreator2000() {


        for (var i = 0; i < 25; i++) {
            this.policeForge.push(new Policeman(this));
            this.policeForge[i].x = i * 100;


        }
    }
    public collisionCheck(c1: GameObject, c2: GameObject): boolean {
        return !(c2.x > c1.x + c1.width ||
            c2.x + c2.width < c1.x ||
            c2.y > c1.y + c1.height ||
            c2.y + c2.height < c1.y);
    }

    private gameLoop() {
        this.supporter.update();
        for (var i = 0; i < 25; i++) {
            this.policeForge[i].update();
        }
        for (var i = 0; i < 25; i++) {
            if (this.policeForge[i].isDead) {

            }
        }
        for (var i = 0; i < 25; i++) {
            for (var b = 0; b < this.supporter.bottles.length; b++) {
                if (this.collisionCheck(this.policeForge[i], this.supporter.bottles[b])) {
                    this.policeForge[i].dead()
                }
            }
        }
        if (this.active) {
            requestAnimationFrame(() => this.gameLoop());
        }
    }


    public endGame() {
        console.log("end");
        this.active = false;
        document.getElementById("score").innerHTML = "GAME OVER";
    }
}


// load
window.addEventListener("load", function () {
    Game.instance();
});

// window.addEventListener("load", function() {
//     new Game();
// });