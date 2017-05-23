class Throwing implements SupporterBehavior{
    supporter: Supporter;

    constructor(s : Supporter){
        this.supporter = s;

       window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));

        console.log("throwing")
    }
    doStuff() {
        
        this.supporter.div.style.backgroundImage = "url('images/throwning.png')";
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
            this.supporter.behavior = new Throwing(this.supporter)
            break;
        case this.supporter.enterKey:
            this.supporter.behavior = new Drinking(this.supporter)
            break;
        }
    }
}