///<reference path='genericArea.ts' />
module Game {
    export class Area1 {
        constructor(ctx, w, loop) {
            //super(ctx, w, loop);
            sManager.pushState(new Explore(ctx, w, 'rpg', this, loop));
        }
        update = () => {
            sManager.updateStack();
        }

    }
}