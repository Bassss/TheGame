var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameObject = (function () {
    function GameObject(tag, parent) {
        this.div = document.createElement(tag);
        parent.appendChild(this.div);
    }
    Object.defineProperty(GameObject.prototype, "x", {
        get: function () { return this._x; },
        set: function (value) { this._x = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "y", {
        get: function () { return this._y; },
        set: function (value) { this._y = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "div", {
        get: function () { return this._div; },
        set: function (value) { this._div = value; },
        enumerable: true,
        configurable: true
    });
    return GameObject;
}());
var Bottle = (function (_super) {
    __extends(Bottle, _super);
    function Bottle(sx, sy) {
        var _this = _super.call(this, "bottle", document.getElementById("container")) || this;
        _this.Speed = 20;
        console.log('hi');
        _this.x = sx;
        _this.y = sy;
        console.log(_this.x);
        console.log(_this.y);
        return _this;
    }
    Bottle.prototype.move = function () {
        var targetY = this.y - this.Speed;
        this.y = targetY;
        this.div.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(1)";
    };
    Bottle.prototype.update = function () {
        this.move();
    };
    return Bottle;
}(GameObject));
var Game = (function () {
    function Game() {
        var _this = this;
        this.policeForge = new Array();
        this.supporter = new Supporter(this);
        this.policemanCreator2000();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.instance = function () {
        if (!Game._instance)
            Game._instance = new Game();
        return Game._instance;
    };
    Game.prototype.policemanCreator2000 = function () {
        for (var i = 0; i < 25; i++) {
            this.policeForge.push(new Policeman(this));
            this.policeForge[i].x = i * 100;
        }
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.supporter.update();
        for (var i = 0; i < 25; i++) {
            this.policeForge[i].update();
        }
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.endGame = function () {
        document.getElementById("score").innerHTML = "Score : 0";
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.instance();
});
var Policeman = (function (_super) {
    __extends(Policeman, _super);
    function Policeman(g) {
        var _this = _super.call(this, "policeman", document.getElementById("container")) || this;
        _this.game = g;
        _this.behavior = new MovingPolice(_this);
        _this.game.supporter.subscribe(_this);
        _this.x = 0;
        _this.y = 100;
        _this.downSpeed = 0.1;
        _this.div.style.transform = "translate(" + _this.x + "px," + _this.y + "px)";
        return _this;
    }
    Policeman.prototype.notify = function (n) {
        this.downSpeed = n;
    };
    Policeman.prototype.update = function () {
        this.behavior.doStuff();
    };
    return Policeman;
}(GameObject));
var Supporter = (function (_super) {
    __extends(Supporter, _super);
    function Supporter(g) {
        var _this = _super.call(this, "supporter", document.getElementById("container")) || this;
        _this.observers = new Array();
        _this.bottles = new Array();
        _this.game = g;
        _this.behavior = new Moving(_this);
        _this.x = 525;
        _this.y = 600;
        _this.leftKey = 37;
        _this.rightKey = 39;
        _this.spaceKey = 32;
        _this.enterKey = 13;
        _this.div.style.transform = "translate(" + _this.x + "px," + _this.y + "px)";
        return _this;
    }
    Supporter.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    Supporter.prototype.unsubscribe = function (o) {
    };
    Supporter.prototype.update = function () {
        for (var i = 0; i < this.bottles.length; i++) {
            this.bottles[i].update();
        }
        this.behavior.doStuff();
    };
    return Supporter;
}(GameObject));
var DeadPolice = (function () {
    function DeadPolice(p) {
        this.policeman = p;
    }
    DeadPolice.prototype.doStuff = function () {
        throw new Error("Method not implemented.");
    };
    return DeadPolice;
}());
var Drinking = (function () {
    function Drinking(s) {
        this.supporter = s;
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        console.log("drinking");
    }
    Drinking.prototype.doStuff = function () {
        this.supporter.div.style.backgroundImage = "url('images/drinking.png')";
    };
    Drinking.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.supporter.leftKey:
                console.log("leftArrowKey");
                break;
            case this.supporter.rightKey:
                console.log("rightArrowKey");
                break;
            case this.supporter.spaceKey:
                console.log("spacebarKey");
                break;
            case this.supporter.enterKey:
                console.log("enterKey");
                break;
        }
    };
    Drinking.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case this.supporter.leftKey:
                this.supporter.behavior = new Moving(this.supporter);
                break;
            case this.supporter.rightKey:
                this.supporter.behavior = new Moving(this.supporter);
                break;
            case this.supporter.spaceKey:
                this.supporter.behavior = new Throwing(this.supporter);
                break;
            case this.supporter.enterKey:
                break;
        }
    };
    return Drinking;
}());
var Moving = (function () {
    function Moving(s) {
        this.supporter = s;
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        for (var i = 0; i < this.supporter.observers.length; i++) {
            this.supporter.observers[i].notify(0.1);
        }
    }
    Moving.prototype.doStuff = function () {
        this.supporter.div.style.backgroundImage = "url('images/supporter.png')";
        var targetX = this.supporter.x - this.supporter.leftSpeed + this.supporter.rightSpeed;
        if (targetX > 0 && targetX + 100 < document.getElementById("container").clientWidth - 50)
            this.supporter.x = targetX;
        this.supporter.div.style.transform = "translate(" + this.supporter.x + "px, " + this.supporter.y + "px) scaleX(1)";
    };
    Moving.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.supporter.leftKey:
                this.supporter.leftSpeed = 10;
                break;
            case this.supporter.rightKey:
                this.supporter.rightSpeed = 10;
                break;
            case this.supporter.spaceKey:
                this.supporter.behavior = new Throwing(this.supporter);
                break;
            case this.supporter.enterKey:
                this.supporter.behavior = new Drinking(this.supporter);
                break;
        }
    };
    Moving.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
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
    };
    return Moving;
}());
var MovingPolice = (function () {
    function MovingPolice(p) {
        this.policeman = p;
        this.policeman.rightSpeed = 5;
        this.policeman.leftSpeed = 0;
        this.move();
    }
    MovingPolice.prototype.doStuff = function () {
        this.move();
    };
    MovingPolice.prototype.move = function () {
        this.policeman.div.style.backgroundImage = "url('images/policeman.png')";
        var targetX = this.policeman.x - this.policeman.leftSpeed + this.policeman.rightSpeed;
        if (targetX > 0 && targetX + 100 < document.getElementById("container").clientWidth)
            this.policeman.x = targetX;
        var targetY = this.policeman.y + this.policeman.downSpeed;
        if (targetY > 0 && targetY + 100 < document.getElementById("container").clientHeight)
            this.policeman.y = targetY;
        this.policeman.div.style.transform = "translate(" + this.policeman.x + "px, " + this.policeman.y + "px) scaleX(1)";
        if (document.getElementById("container").clientWidth - 200 < this.policeman.x) {
            this.policeman.rightSpeed = 0;
            this.policeman.leftSpeed = 5;
        }
        if (this.policeman.x < 100) {
            this.policeman.rightSpeed = 5;
            this.policeman.leftSpeed = 0;
        }
    };
    return MovingPolice;
}());
var ShootingPolice = (function () {
    function ShootingPolice(p) {
        this.policeman = p;
    }
    ShootingPolice.prototype.doStuff = function () {
        throw new Error("Method not implemented.");
    };
    return ShootingPolice;
}());
var Throwing = (function () {
    function Throwing(s) {
        this.supporter = s;
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        console.log("throwing");
        for (var i = 0; i < this.supporter.observers.length; i++) {
            this.supporter.observers[i].notify(1);
        }
    }
    Throwing.prototype.doStuff = function () {
        this.supporter.div.style.backgroundImage = "url('images/throwning.png')";
    };
    Throwing.prototype.bottleMaker2000 = function () {
        this.supporter.bottles.push(new Bottle(this.supporter.x, this.supporter.y));
    };
    Throwing.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.supporter.leftKey:
                console.log("leftArrowKey");
                break;
            case this.supporter.rightKey:
                console.log("rightArrowKey");
                break;
            case this.supporter.spaceKey:
                console.log("spacebarKey");
                break;
            case this.supporter.enterKey:
                console.log("enterKey");
                break;
        }
    };
    Throwing.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case this.supporter.leftKey:
                this.supporter.behavior = new Moving(this.supporter);
                break;
            case this.supporter.rightKey:
                this.supporter.behavior = new Moving(this.supporter);
                break;
            case this.supporter.spaceKey:
                this.bottleMaker2000();
                break;
            case this.supporter.enterKey:
                this.supporter.behavior = new Drinking(this.supporter);
                break;
        }
    };
    return Throwing;
}());
//# sourceMappingURL=main.js.map