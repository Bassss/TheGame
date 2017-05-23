/// <reference path="gameObject.ts"/>

class Supporter extends GameObject {

    public bottles:number;
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
   

public update() : void {
   
    //Behaviors
    this.behavior.doStuff()
 
    }
}