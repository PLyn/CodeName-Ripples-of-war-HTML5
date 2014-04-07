///<reference path='State.ts' />
module Game {
    export class Battle extends State{
        BattleQ;
        ctx;
        ctx2;
        constructor(ctx, ctx2) {
            super();
            this.ctx = ctx;
            this.ctx2 = ctx2;
            
        }
        init() {
            this.PlayerTurn();
        }
        PlayerTurn() {
            this.ctx.clearRect(0, 0, 800, 600);
            this.ctx2.clearRect(0, 0, 800, 600);
            this.ctx2.drawImage(IMAGE_CACHE['dialog'], 50, 100);
            setStyle(this.ctx2, 'Calibri', '16pt', 'white', 'bold', 'italic', 'left');
            this.ctx2.fillText("test text for commands", 75, 125);
        }
    }
}