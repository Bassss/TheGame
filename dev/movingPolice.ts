class MovingPolice implements PoliceBehavior{
    policeman: any;

    constructor(p: Policeman){
        this.policeman = p;

    }
    doStuff() {
        throw new Error("Method not implemented.");
    }
    private move(){
    throw new Error("Method not implemented.");
    }

}