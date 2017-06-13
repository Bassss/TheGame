class Throwing implements SupporterBehavior {
    supporter: Supporter;

    constructor(s: Supporter) {
        this.supporter = s;


        console.log("throwing")
        for (var i = 0; i < this.supporter.observers.length; i++) {
            this.supporter.observers[i].notify(Math.round(Math.random() * 1));
        }
    }
    doStuff() {

        this.supporter.div.style.backgroundImage = "url('images/throwning.png')";
    }
    private bottleMaker2000() {
        if (this.supporter.ammo != 0) {
            this.supporter.ammo -= 1;
            console.log(this.supporter.ammo);
            this.supporter.bottles.push(new FightObject.Bottle(this.supporter.x, this.supporter.y))
        } else {
            this.reload();
        }

    }
private reload(){
    for(var i = 0; i< 5; i++){
        this.supporter.ammo += 1;

    }
}
onLeft(){
 this.supporter.behavior = new Moving(this.supporter);
}
onRight(){
this.supporter.behavior = new Moving(this.supporter);
}
onSpace(){
 this.bottleMaker2000()
}


}