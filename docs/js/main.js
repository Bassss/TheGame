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
    Object.defineProperty(GameObject.prototype, "width", {
        get: function () { return this._width; },
        set: function (value) { this._width = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameObject.prototype, "height", {
        get: function () { return this._height; },
        set: function (value) { this._height = value; },
        enumerable: true,
        configurable: true
    });
    return GameObject;
}());
var FightObject;
(function (FightObject) {
    var Bottle = (function (_super) {
        __extends(Bottle, _super);
        function Bottle(sx, sy) {
            var _this = _super.call(this, "bottle", document.getElementById("container")) || this;
            _this.Speed = 20;
            _this.x = sx;
            _this.y = sy;
            _this.width = 13;
            _this.height = 50;
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
    FightObject.Bottle = Bottle;
})(FightObject || (FightObject = {}));
var Game = (function () {
    function Game() {
        var _this = this;
        this.policeForge = new Array();
        this.active = true;
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
    Game.prototype.collisionCheck = function (c1, c2) {
        return !(c2.x > c1.x + c1.width ||
            c2.x + c2.width < c1.x ||
            c2.y > c1.y + c1.height ||
            c2.y + c2.height < c1.y);
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.supporter.update();
        for (var i = 0; i < 25; i++) {
            this.policeForge[i].update();
        }
        for (var i = 0; i < 25; i++) {
            if (this.policeForge[i].isDead) {
            }
        }
        for (var i = 0; i < 25; i++) {
            for (var b = 0; b < this.supporter.bottles.length; b++) {
                if (this.collisionCheck(this.policeForge[i], this.supporter.bottles[b])) {
                    this.policeForge[i].dead();
                }
            }
        }
        if (this.active) {
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
    };
    Game.prototype.endGame = function () {
        console.log("end");
        this.active = false;
        document.getElementById("score").innerHTML = "GAME OVER";
    };
    return Game;
}());
window.addEventListener("load", function () {
    Game.instance();
});
var isDead;
(function (isDead) {
    isDead[isDead["YES"] = 0] = "YES";
    isDead[isDead["NO"] = 1] = "NO";
})(isDead || (isDead = {}));
var Policeman = (function (_super) {
    __extends(Policeman, _super);
    function Policeman(g) {
        var _this = _super.call(this, "policeman", document.getElementById("container")) || this;
        _this.isDead = isDead.NO;
        _this.game = g;
        _this.behavior = new MovingPolice(_this);
        _this.game.supporter.subscribe(_this);
        _this.x = 0;
        _this.y = 100;
        _this.width = 83;
        _this.height = 200;
        _this.downSpeed = 0.1;
        _this.div.style.transform = "translate(" + _this.x + "px," + _this.y + "px)";
        return _this;
    }
    Policeman.prototype.notify = function (n) {
        this.downSpeed = n;
    };
    Policeman.prototype.dead = function () {
        this.isDead = isDead.YES;
        this.div.remove();
    };
    Policeman.prototype.update = function () {
        if (this.y > document.getElementById("container").clientHeight - 200) {
            this.game.endGame();
        }
        else {
        }
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
        _this.width = 145;
        _this.height = 300;
        _this.leftKey = 37;
        _this.rightKey = 39;
        _this.spaceKey = 32;
        _this.enterKey = 13;
        _this.ammo = 5;
        window.addEventListener("keydown", _this.onKeyDown.bind(_this));
        window.addEventListener("keyup", _this.onKeyUp.bind(_this));
        _this.div.style.transform = "translate(" + _this.x + "px," + _this.y + "px)";
        return _this;
    }
    Supporter.prototype.ammoImage = function () {
        var iso = new Isomer(document.getElementById("ammo"));
        var Shape = Isomer.Shape;
        var Point = Isomer.Point;
        var green = new Isomer.Color(37, 127, 49);
        var cube = Shape.Prism(Point.ORIGIN);
        if (this.ammo == 5) {
            iso.add(cube.translate(0, 0, 0.0), green);
            iso.add(cube.translate(0, 0, 1.1), green);
            iso.add(cube.translate(0, 0, 2.2), green);
            iso.add(cube.translate(0, 0, 3.3), green);
            iso.add(cube.translate(0, 0, 4.4), green);
        }
        else if (this.ammo == 4) {
            iso.add(cube.translate(0, 0, 4.4));
        }
        else if (this.ammo == 3) {
            iso.add(cube.translate(0, 0, 3.3));
        }
        else if (this.ammo == 2) {
            iso.add(cube.translate(0, 0, 2.2));
        }
        else if (this.ammo == 1) {
            iso.add(cube.translate(0, 0, 1.1));
        }
        else if (this.ammo == 0) {
            iso.add(cube.translate(0, 0, 0.0));
        }
    };
    Supporter.prototype.subscribe = function (o) {
        this.observers.push(o);
    };
    Supporter.prototype.unsubscribe = function (o) {
    };
    Supporter.prototype.update = function () {
        this.ammoImage();
        for (var i = 0; i < this.bottles.length; i++) {
            this.bottles[i].update();
        }
        this.behavior.doStuff();
    };
    Supporter.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case this.leftKey:
                this.behavior.onLeft();
                this.leftSpeed = 5;
                break;
            case this.rightKey:
                this.behavior.onRight();
                this.rightSpeed = 5;
                break;
            case this.spaceKey:
                this.behavior.onSpace();
                break;
        }
    };
    Supporter.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case this.leftKey:
                this.leftSpeed = 0;
                break;
            case this.rightKey:
                this.rightSpeed = 0;
                break;
            case this.spaceKey:
                break;
        }
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
    Moving.prototype.onLeft = function () {
    };
    Moving.prototype.onRight = function () {
    };
    Moving.prototype.onSpace = function () {
        this.supporter.behavior = new Throwing(this.supporter);
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
        if (this.policeman.isDead == isDead.NO) {
            this.policeman.div.style.backgroundImage = "url('images/policeman.png')";
            var targetX = this.policeman.x - this.policeman.leftSpeed + this.policeman.rightSpeed;
            if (targetX > 0 && targetX + 100 < document.getElementById("container").clientWidth)
                this.policeman.x = targetX;
            var targetY = this.policeman.y + this.policeman.downSpeed;
            if (targetY > 0 && targetY + 100 < document.getElementById("container").clientHeight)
                this.policeman.y = targetY;
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
        console.log("throwing");
        for (var i = 0; i < this.supporter.observers.length; i++) {
            this.supporter.observers[i].notify(Math.round(Math.random() * 1));
        }
    }
    Throwing.prototype.doStuff = function () {
        this.supporter.div.style.backgroundImage = "url('images/throwning.png')";
    };
    Throwing.prototype.bottleMaker2000 = function () {
        if (this.supporter.ammo != 0) {
            this.supporter.ammo -= 1;
            console.log(this.supporter.ammo);
            this.supporter.bottles.push(new FightObject.Bottle(this.supporter.x, this.supporter.y));
        }
        else {
            this.reload();
        }
    };
    Throwing.prototype.reload = function () {
        for (var i = 0; i < 5; i++) {
            this.supporter.ammo += 1;
        }
    };
    Throwing.prototype.onLeft = function () {
        this.supporter.behavior = new Moving(this.supporter);
    };
    Throwing.prototype.onRight = function () {
        this.supporter.behavior = new Moving(this.supporter);
    };
    Throwing.prototype.onSpace = function () {
        this.bottleMaker2000();
    };
    return Throwing;
}());
//# sourceMappingURL=main.js.map