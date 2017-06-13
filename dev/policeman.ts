/// <reference path="gameObject.ts"/>
enum isDead {
    YES,
    NO
}
class Policeman extends GameObject implements Observer {

    private game: Game
    public behavior: PoliceBehavior;
    public leftSpeed: number;
    public rightSpeed: number;
    public downSpeed: number;
    public isDead: isDead = isDead.NO;

   
    constructor(g: Game) {
        super("policeman", document.getElementById("container"));

        this.game = g;
        this.behavior = new MovingPolice(this);

        this.game.supporter.subscribe(this);

        this.x = 0;
        this.y = 100;
       
        this.width = 83;
        this.height = 200;

        this.downSpeed = 0.1;

        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    }
    public notify(n: number) {
        this.downSpeed = n;


    }
    public dead() {
        this.isDead = isDead.YES;
        this.div.remove()

    }


    public update(): void {
        if (this.y > document.getElementById("container").clientHeight - 200) {
            this.game.endGame()
        } else {
            // console.log(this.y)
        }
        //Behaviors
        this.behavior.doStuff()
    }
}