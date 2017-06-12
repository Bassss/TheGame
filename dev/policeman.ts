/// <reference path="gameObject.ts"/>

class Policeman extends GameObject implements Observer{

private game : Game
public behavior : PoliceBehavior;
public leftSpeed:number;
public rightSpeed:number;
public downSpeed: number;

constructor(g: Game){
    super("policeman", document.getElementById("container"));

    this.game = g;
    this.behavior = new MovingPolice(this);
 
    this.game.supporter.subscribe(this);

    this.x = 0;
    this.y = 100;
    this.downSpeed = 0.1;

    this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
}
public notify(n: number){
this.downSpeed = n;


}


public update() : void {
   
    //Behaviors
    this.behavior.doStuff()
}
}