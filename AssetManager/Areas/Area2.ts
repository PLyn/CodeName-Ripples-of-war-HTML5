///<reference path='genericArea.ts' />
module Game {
    export class Area2 extends GenericArea {
        stateManger;
        ctx;
        constructor(ctx, w, loop) {
            super(ctx, w, loop);
            this.ctx = ctx;
            this.stateManger = new StateManager();
            this.stateManger.pushState(new Explore(ctx, w, 'rpg', this, loop));
            console.log("Entered Area 2");
        }
        update = () => {
            sManager.updateStack();
        }
        endLevel(ctx) {
            this.stateManger.pushState(new Cutscene("id", 800, 600, this.ctx, '2'));
        }
    }
}