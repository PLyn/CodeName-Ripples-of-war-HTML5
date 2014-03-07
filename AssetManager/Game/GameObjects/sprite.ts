///<reference path='gameobject.ts' />
module Game {
    export class Sprite extends GameObject {
        a;
        //all the base attributes and methods are to be added here, this will come when
        //the battle system is being developed but for now it stays relatively empty i guess 
        //until i sort out more pressing issues such as the state system
        constructor(img, x, y, w, h, a, scale?) {
            super(img, x, y, w, h, scale);
            this.a = a;//testing, not actually used for anything
        }
    }
}