///<reference path='genericArea.ts' />
module Game {
    export class Area2 extends GenericArea {
        constructor(ctx, w, loop) {
            super(ctx, w, loop);
            sManager.pushState(new Explore(ctx, w, 'carpet', this, loop));
        }
        update = () => {
            sManager.updateStack();
        }
    }
}