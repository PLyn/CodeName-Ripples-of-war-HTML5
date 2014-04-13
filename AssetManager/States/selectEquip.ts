///<reference path='State.ts' />
module Game {
    export class SelectEquip extends State{
        ctx2 : CanvasRenderingContext2D;
        constructor(ctx2) {
            super();
            this.ctx2 = ctx2;
        }
        init() {
            this.ctx2.drawImage(IMAGE_CACHE['dialog'], 15, 200);

        }
        update() {

        }
        render() {

        }
        pause() {

        }
        resume() {

        }
        destroy() {

        }
    }
}