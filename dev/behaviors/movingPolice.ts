class MovingPolice implements PoliceBehavior {
    policeman: any;

    constructor(p: Policeman) {
        this.policeman = p;
        this.policeman.rightSpeed = 5;
        this.policeman.leftSpeed = 0;
        this.move();
    }
    doStuff() {
        this.move();

    }
    private move() {
        if (this.policeman.isDead == isDead.NO) {
            this.policeman.div.style.backgroundImage = "url('images/policeman.png')";
            //movings
            let targetX = this.policeman.x - this.policeman.leftSpeed + this.policeman.rightSpeed;
            if (targetX > 0 && targetX + 100 < document.getElementById("container").clientWidth) this.policeman.x = targetX;

            let targetY = this.policeman.y + this.policeman.downSpeed;
            if (targetY > 0 && targetY + 100 < document.getElementById("container").clientHeight) this.policeman.y = targetY;

            this.policeman.div.style.transform = "translate(" + this.policeman.x + "px, " + this.policeman.y + "px) scale(1) ";

            if (document.getElementById("container").clientWidth - 200 < this.policeman.x) {
                this.policeman.rightSpeed = 0;
                this.policeman.leftSpeed = 5;

            }
            if (this.policeman.x < 100) {
                this.policeman.rightSpeed = 5;
                this.policeman.leftSpeed = 0;
            }
        }
    }

}