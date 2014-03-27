///<reference path='genericArea.ts' />
module Game {
    export class Area1 extends GenericArea {
        constructor(ctx, w) {
            super(ctx, w);
            sManager.pushState(new Explore(ctx, w, 'rpg', this));
        }
        update = () => {
            sManager.updateStack();
        }

    }
}