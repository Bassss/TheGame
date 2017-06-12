/// <reference path="gameObject.ts"/>

class Supporter extends GameObject implements Subject{

    public observers: Array<Observer> = new Array<Observer>();
    public bottles: Array<Bottle> = new Array<Bottle>();
    private game:Game;
    public behavior: SupporterBehavior

    public leftKey : number;
    public rightKey : number;
    public spaceKey : number;
    public enterKey : number;

    public leftSpeed:number;
    public rightSpeed:number;

    constructor(g: Game){
        super("supporter", document.getElementById("container"));
        this.game = g;
        this.behavior = new Moving(this);
        this.x = 525;
        this.y = 600;

        this.leftKey = 37;
        this.rightKey = 39;
        this.spaceKey = 32;
        this.enterKey = 13;


         this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
         }
   
   public subscribe(o : Observer){
       this.observers.push(o);

   }
   public unsubscribe(o : Observer){
       
   }

public update() : void {
   
   for (var i = 0; i < this.bottles.length; i++) {
             this.bottles[i].update();
        }
    //Behaviors 
    this.behavior.doStuff()
 
    }
}