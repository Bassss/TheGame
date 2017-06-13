/// <reference path="gameObject.ts"/>

namespace FightObject {
   export  class Bottle extends GameObject {

        private Speed: number = 20;

        constructor(sx: number, sy: number) {
            super("bottle", document.getElementById("container"));
            // console.log('hi')
            this.x = sx;
            this.y = sy;

            this.width = 13;
            this.height = 50;

            // console.log(this.x)
            // console.log(this.y)
        }
        private move() {
            let targetY = this.y - this.Speed;
            // if(targetY > 0 && targetY+100 < document.getElementById("container").clientWidth -500) 
            this.y = targetY;

            this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(1)";
        }
        public update() {
            this.move();

        }
    }
}