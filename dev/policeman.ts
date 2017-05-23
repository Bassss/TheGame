/// <reference path="gameObject.ts"/>

class Policeman extends GameObject {

private game : Game
public behavior : PoliceBehavior;

constructor(g: Game){
    super("policeman", document.getElementById("container"));

    this.game = g;
    this.behavior = new MovingPolice(this);

    this.x = 0;
    this.y = 0;

    this.div.style.transform ="translate("+this.x+"px,"+this.y+"px)";
}


}