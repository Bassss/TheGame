class Throwing implements SupporterBehavior{
    supporter: Supporter;

    constructor(s : Supporter){
        this.supporter = s;

       window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));

        console.log("throwing")
        for (var i = 0; i < this.supporter.observers.length; i++) {
        this.supporter.observers[i].notify(1);
        }
    }
    doStuff() {
        
        this.supporter.div.style.backgroundImage = "url('images/throwning.png')";
    }
    private bottleMaker2000(){
        this.supporter.bottles.push(new Bottle(this.supporter.x, this.supporter.y))
 }

   onKeyDown(event:KeyboardEvent):void {
        
        switch(event.keyCode){
        case this.supporter.leftKey:
            console.log("leftArrowKey")
            break;
        case this.supporter.rightKey:
            console.log("rightArrowKey")
            break;
        case this.supporter.spaceKey:
            console.log("spacebarKey")
            break;
        case this.supporter.enterKey:
            console.log("enterKey")
            break;
        }
    }

    onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.supporter.leftKey:
            this.supporter.behavior = new Moving(this.supporter) 
            break;
        case this.supporter.rightKey:
            this.supporter.behavior = new Moving(this.supporter)
            break;
        case this.supporter.spaceKey:
           this.bottleMaker2000()
            break;
        case this.supporter.enterKey:
            this.supporter.behavior = new Drinking(this.supporter)
            break;
        }
    }
}