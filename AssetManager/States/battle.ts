///<reference path='State.ts' />
var BattleQ = [];
module Game {
    export class Battle extends State{
        ctx;
        ctx2;
        p1;
        e1;
        mx;
        my;
        currentPlayer;
        constructor(ctx, ctx2) {
            super();
            this.ctx = ctx;
            this.ctx2 = ctx2;
            this.p1 = new Sprite(IMAGE_CACHE['D'], 600, 250, 35, 35);
            this.e1 = new Sprite(IMAGE_CACHE['S'], 300, 250, 35, 35);
            this.p1.setAttributes(5, 0, 2, 1, 1, 1, 1);
            this.e1.setAttributes(6, 0, 2, 0, 1, 1, 1);
            BattleQ.push(this.p1);
            BattleQ.push(this.e1);  
        }
        init() {
            this.PlayerTurn();
            this.renderActors(); 
            this.currentPlayer = BattleQ.pop();     
        }
        update() {
            if(this.currentPlayer.type === ) {
            }
            if (control.mousedown()) {
                this.mx = control.mEvent.pageX;
                this.my = control.mEvent.pageY;
                var x1 = 300;
                var x2 = 490;
                var y1 = 400;
                var y2 = 450;
                if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                    this.ctx2.fillText("Attack", this.currentPlayer.x + 15, this.currentPlayer.y + 50);
                    this.ctx2.fillText(this.currentPlayer.Atk, BattleQ[0].x, BattleQ[0].y);
                    this.currentPlayer = BattleQ.pop();
                }
            }
        }
        render() {

        }
        pause() {

        }
        resume() {

        }
        destroy() {

        }
        newTurn() {
            BattleQ.push(this.p1);
            BattleQ.push(this.e1); 
        }
        PlayerTurn() {
            this.ctx.clearRect(0, 0, 800, 600);
            this.ctx2.clearRect(0, 0, 800, 600);
            setStyle(this.ctx2, 'Calibri', '16pt', 'black', 'bold', 'italic', 'left');
            this.ctx2.drawImage(IMAGE_CACHE['attack'], 300, 400);
            this.ctx2.drawImage(IMAGE_CACHE['defend'], 500, 400);
        }
        EnemyTurn() {

        }
        renderActors() {
            for (var i = 0; i < BattleQ.length; i++) {
                BattleQ[i].render(this.ctx2, 100, 100);
            }
        }
    }
}