///<reference path='gameobject.ts' />
module Game {
    export class Sprite extends GameObject {
        a;
        constructor(img, x, y, w, h, a, scale?) {
            super(img, x, y, w, h, scale);
            this.a = a;
        }
    }
}