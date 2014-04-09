///<reference path='State.ts' />
var BattleQ = [];
var battleList = [];
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
            this.e1.setAttributes(6, 0, 3, 0, 1, 1, 1);

            battleList['p1'] = this.p1;
            battleList['e1'] = this.e1;

            BattleQ.push(this.p1);
            BattleQ.push(this.e1);  
        }
        newTurn() {
            BattleQ.push(this.p1);
            BattleQ.push(this.e1);
        }
        PlayerTurn() {
            this.ctx.clearRect(0, 0, 800, 600);
            this.ctx2.clearRect(0, 0, 800, 600);
            setStyle(this.ctx2, 'Calibri', '16pt', 'black', 'bold', 'italic', 'left');
            this.ctx.drawImage(IMAGE_CACHE['attack'], 300, 400);
            this.ctx.drawImage(IMAGE_CACHE['defend'], 500, 400);
        }
        EnemyTurn() {
            this.ctx2.clearRect(0, 0, 800, 600);
            this.ctx2.fillText("Enemy", this.currentPlayer.x + 15, this.currentPlayer.y + 50);
            this.ctx2.fillText(this.currentPlayer.Atk, battleList['p1'].x + 15, battleList['p1'].y + 50);
        }
        renderActors() {
            for (var i = 0; i < BattleQ.length; i++) {
                BattleQ[i].render(this.ctx, 100, 100);
            }
        }
        init() {
            this.PlayerTurn();
            this.renderActors(); 
            this.currentPlayer = BattleQ.pop();     
        }
        update() {
            if (BattleQ.length < 1) {
                //this.newTurn();
            }
            if (this.currentPlayer.Type === 0 && control.mousedown()) {
                this.mx = control.mEvent.pageX;
                this.my = control.mEvent.pageY;
                var x1 = 300;
                var x2 = 490;
                var y1 = 400;
                var y2 = 450;
                if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                    
                    var timer = setTimeout(() => {
                        var x = 0;
                        x++;
                        this.ctx2.clearRect(0, 0, 800, 600);
                        this.ctx2.fillText("Attack", this.currentPlayer.x + 15, this.currentPlayer.y + 50);
                        this.ctx2.fillText(this.currentPlayer.Atk, battleList['e1'].x + 15, battleList['e1'].y + 50);
                        if (x === 1) {
                            clearTimeout(timer);
                        }
                        
                    }, 1500);
                }
            }
            else if (this.currentPlayer.Type === 1) {
                //this.EnemyTurn();
            }
            this.currentPlayer = BattleQ.pop();
            
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