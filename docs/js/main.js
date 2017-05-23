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
var Game = (function () {
    function Game() {
        var _this = this;
        this.supporter = new Supporter(this);
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.instance = function () {
        if (!Game._instance)
            Game._instance = new Game();
        return Game._instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.supporter.update();
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
var Moving = (function () {
    function Moving(s) {
        this.supporter = s;
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        console.log("moving");
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
                console.log("leftArrowKey");
                this.supporter.leftSpeed = 10;
                break;
            case this.supporter.rightKey:
                console.log("rightArrowKey");
                this.supporter.rightSpeed = 10;
                break;
            case this.supporter.spaceKey:
                console.log("spacebarKey");
                this.supporter.behavior = new Throwing(this.supporter);
                break;
            case this.supporter.enterKey:
                console.log("enterKey");
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
    }
    MovingPolice.prototype.doStuff = function () {
        throw new Error("Method not implemented.");
    };
    MovingPolice.prototype.move = function () {
        throw new Error("Method not implemented.");
    };
    return MovingPolice;
}());
var Policeman = (function (_super) {
    __extends(Policeman, _super);
    function Policeman(g) {
        var _this = _super.call(this, "policeman", document.getElementById("container")) || this;
        _this.game = g;
        _this.behavior = new MovingPolice(_this);
        _this.x = 0;
        _this.y = 0;
        _this.div.style.transform = "translate(" + _this.x + "px," + _this.y + "px)";
        return _this;
    }
    return Policeman;
}(GameObject));
var ShootingPolice = (function () {
    function ShootingPolice(p) {
        this.policeman = p;
    }
    ShootingPolice.prototype.doStuff = function () {
        throw new Error("Method not implemented.");
    };
    return ShootingPolice;
}());
var Supporter = (function (_super) {
    __extends(Supporter, _super);
    function Supporter(g) {
        var _this = _super.call(this, "supporter", document.getElementById("container")) || this;
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
    Supporter.prototype.update = function () {
        this.behavior.doStuff();
    };
    return Supporter;
}(GameObject));
var Throwing = (function () {
    function Throwing(s) {
        this.supporter = s;
        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
        console.log("throwing");
    }
    Throwing.prototype.doStuff = function () {
        this.supporter.div.style.backgroundImage = "url('images/throwning.png')";
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
                this.supporter.behavior = new Throwing(this.supporter);
                break;
            case this.supporter.enterKey:
                this.supporter.behavior = new Drinking(this.supporter);
                break;
        }
    };
    return Throwing;
}());
//# sourceMappingURL=main.js.map