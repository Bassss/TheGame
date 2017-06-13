abstract class GameObject {

    private _x : number;
    private _y : number;
    private _div : HTMLElement;
    private _width : number;
    private _height : number;

    public get x(): number          {   return this._x;   }
    public set x(value: number)     {   this._x = value;  }

    public get y(): number          {   return this._y;   }
    public set y(value: number)     {   this._y = value;  }    

    public get div(): HTMLElement          {   return this._div;   }
    public set div(value: HTMLElement)     {   this._div = value;  }       

    public get width(): number          {   return this._width;   }
    public set width(value: number)     {   this._width = value;  }  

    public get height(): number          {   return this._height;   }
    public set height(value: number)     {   this._height = value;  }  

    constructor(tag: string, parent : HTMLElement) {
        
        this.div = document.createElement(tag);
        parent.appendChild(this.div);

    }

}