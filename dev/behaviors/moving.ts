class Moving implements SupporterBehavior{
    supporter: Supporter;

  

    constructor(s : Supporter){
        this.supporter = s;
  
   window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));

         for (var i = 0; i < this.supporter.observers.length; i++) {
        this.supporter.observers[i].notify(0.1);
         }
    
    }
    
    doStuff():void {
     
        this.supporter.div.style.backgroundImage = "url('images/supporter.png')";
        //movings
        let targetX = this.supporter.x - this.supporter.leftSpeed + this.supporter.rightSpeed;
        if(targetX > 0 && targetX+100 < document.getElementById("container").clientWidth -50) this.supporter.x = targetX;

        this.supporter.div.style.transform = "translate("+this.supporter.x+"px, "+this.supporter.y+"px) scaleX(1)";
 

    }
  onKeyDown(event:KeyboardEvent):void {
        
        switch(event.keyCode){
        case this.supporter.leftKey:
        // console.log("leftArrowKey")
            this.supporter.leftSpeed = 10;
            break;
        case this.supporter.rightKey:
        //  console.log("rightArrowKey")
            this.supporter.rightSpeed = 10;
            break;    
        case this.supporter.spaceKey:
        //  console.log("spacebarKey")
            this.supporter.behavior = new Throwing(this.supporter) 
            break;
        case this.supporter.enterKey:
        //  console.log("enterKey")
            this.supporter.behavior = new Drinking(this.supporter) 
            break;
        }
    }
 onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.supporter.leftKey:
            this.supporter.leftSpeed = 0;
            break;
        case this.supporter.rightKey:
            this.supporter.rightSpeed = 0;
            break;
        case this.supporter.spaceKey:

            break;
        case this.supporter.enterKey:

            break;
        }
}

}