/// <reference path="gameObject.ts"/>

class Supporter extends GameObject implements Subject {

    public observers: Array<Observer> = new Array<Observer>();
    public bottles: Array<FightObject.Bottle> = new Array<FightObject.Bottle>();
    public ammo: number;
    private game: Game;
    public behavior: SupporterBehavior

    public leftKey: number;
    public rightKey: number;
    public spaceKey: number;
    public enterKey: number;

    public leftSpeed: number;
    public rightSpeed: number;

    constructor(g: Game) {
        super("supporter", document.getElementById("container"));
        this.game = g;
        this.behavior = new Moving(this);
        this.x = 525;
        this.y = 600;

        this.width = 145;
        this.height = 300;

        this.leftKey = 37;
        this.rightKey = 39;
        this.spaceKey = 32;
        this.enterKey = 13;

        this.ammo = 5;
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));


        this.div.style.transform = "translate(" + this.x + "px," + this.y + "px)";
    }

    public ammoImage() {

        var iso = new Isomer(document.getElementById("ammo"));

        var Shape = Isomer.Shape;
        var Point = Isomer.Point;

        var green = new Isomer.Color(37, 127, 49);
        var cube = Shape.Prism(Point.ORIGIN);

        if (this.ammo ==5) {
     
            iso.add(cube.translate(0, 0, 0.0), green);
            iso.add(cube.translate(0, 0, 1.1), green);
            iso.add(cube.translate(0, 0, 2.2), green);
            iso.add(cube.translate(0, 0, 3.3), green);
            iso.add(cube.translate(0, 0, 4.4), green);
        } else if (this.ammo == 4) {
            iso.add(cube.translate(0, 0, 4.4));
        } else if (this.ammo == 3) {
            iso.add(cube.translate(0, 0, 3.3));
        }else if (this.ammo == 2) {
            iso.add(cube.translate(0, 0, 2.2));
        }else if (this.ammo == 1) {
            iso.add(cube.translate(0, 0, 1.1));
        }else if (this.ammo == 0) { 
            iso.add(cube.translate(0, 0, 0.0));

        }
    }

    public subscribe(o: Observer) {
        this.observers.push(o);

    }
    public unsubscribe(o: Observer) {
        for(var i = 0; i < this.observers.length; i++){
            if(this.observers[i] == o){
                this.observers.splice(i, 1);
            }
        }
    }


    public update(): void {
        this.ammoImage();
        for (var i = 0; i < this.bottles.length; i++) {
            this.bottles[i].update();
        }
        //Behaviors 
        this.behavior.doStuff()

    }
    onKeyDown(event: KeyboardEvent): void {

        switch (event.keyCode) {
            case this.leftKey:
                this.behavior.onLeft();
                // console.log("leftArrowKey")
                this.leftSpeed = 5;
                break;
            case this.rightKey:
                this.behavior.onRight();
                //  console.log("rightArrowKey")
                this.rightSpeed = 5;
                break;
            case this.spaceKey:
                this.behavior.onSpace();
                //  console.log("spacebarKey")
                // this.behavior = new Throwing(this)
                break;
            // case this.supporter.enterKey:
            //     //  console.log("enterKey")
            //     this.supporter.behavior = new Drinking(this.supporter)
            //     break;
        }
    }
    onKeyUp(event: KeyboardEvent): void {
        switch (event.keyCode) {
            case this.leftKey:
                this.leftSpeed = 0;
                break;
            case this.rightKey:
                this.rightSpeed = 0;
                break;
            case this.spaceKey:

                break;
            // case this.enterKey:

            //     break;
        }
    }

}