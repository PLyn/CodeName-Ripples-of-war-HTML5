///<reference path='genericArea.ts' />
module Game {
    export class Area1 extends GenericArea {
        stateManger;
        constructor(ctx, w) {
            super(ctx, w)
            this.stateManger = new StateManager();
            sManager.pushState(new Explore(ctx, w, 'rpg', this));
        }
        update = () => {
            sManager.updateStack();
        }
        nextState(objectID) {
            sManager.popState();
        }
    }
}