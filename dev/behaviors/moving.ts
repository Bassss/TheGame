class Moving implements SupporterBehavior {
    supporter: Supporter;



    constructor(s: Supporter) {
        this.supporter = s;



        for (var i = 0; i < this.supporter.observers.length; i++) {
            this.supporter.observers[i].notify(0.1);
        }

    }

    doStuff(): void {

        this.supporter.div.style.backgroundImage = "url('images/supporter.png')";
        //movings
        let targetX = this.supporter.x - this.supporter.leftSpeed + this.supporter.rightSpeed;
        if (targetX > 0 && targetX + 100 < document.getElementById("container").clientWidth - 50) this.supporter.x = targetX;

        this.supporter.div.style.transform = "translate(" + this.supporter.x + "px, " + this.supporter.y + "px) scaleX(1)";


    }
    onLeft(){

    }
    onRight(){

    }
    onSpace(){
       this.supporter.behavior = new Throwing(this.supporter); 
    }


}