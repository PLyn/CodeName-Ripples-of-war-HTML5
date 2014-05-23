///<reference path='State.ts' />
module Game {
    export class Title extends State {
        context;
        constructor(ctx) {
            super();
            this.context = ctx;
        }
        init() {
            this.context.drawImage(IMAGE_CACHE['ripple'], 0, 0);
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