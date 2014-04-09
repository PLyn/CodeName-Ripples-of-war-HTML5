///<reference path='State.ts' />
var BattleQ = [];
var battleList = [];
module Game {
    export class Battle extends State {
        ctx;
        ctx2;
        p1;
        e1;
        mx;
        my;
        currentPlayer: Sprite;
        target: Sprite;
        newTime = 0;
        battleKeys; 
        currentkey = 0; 

        constructor(ctx, ctx2) {
            super();
            this.ctx = ctx;
            this.ctx2 = ctx2;
            this.p1 = new Sprite(IMAGE_CACHE['D'], 600, 250, 35, 35);
            this.e1 = new Sprite(IMAGE_CACHE['S'], 300, 250, 35, 35);
            this.p1.setAttributes(10, 0, 4, 1, 1, 1, 1, 0);
            this.e1.setAttributes(15, 0, 1, 0, 1, 1, 1, 1);

            battleList['p1'] = this.p1;
            battleList['e1'] = this.e1;

            this.battleKeys = Object.keys(battleList);
            BattleQ.push(this.e1);
            BattleQ.push(this.p1);
        }
        newTurn() {
            this.currentkey = 0;
        }
        PlayerTurn() {
            this.ctx.clearRect(0, 0, 800, 600);
            this.ctx2.clearRect(0, 0, 800, 600);
            setStyle(this.ctx2, 'Calibri', '16pt', 'black', 'bold', 'italic', 'left');
            this.ctx.drawImage(IMAGE_CACHE['attack'], 300, 400);
            this.ctx.drawImage(IMAGE_CACHE['defend'], 500, 400);
        }
        renderActors() {
            for (var i = 0; i < BattleQ.length; i++) {
                battleList[this.battleKeys[i]].render(this.ctx, 100, 100);
            }
        }
        init() {
            this.PlayerTurn();
            this.renderActors();
            this.currentPlayer = battleList['p1'];

        }
        update() {
            var time = Date.now();
            if (BattleQ.length < 1) {
                this.newTurn();
            }
            if (this.currentPlayer.HP < 1) {
                this.ctx2.clearRect(0, 0, 800, 600);
                this.ctx2.fillText("GAMEOVER", 400, 400);
            }
            else if (this.currentPlayer.Type === 0 && mousedown()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                var x1 = 300;
                var x2 = 490;
                var y1 = 400;
                var y2 = 450;
                if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                    if (time > this.newTime) {
                        //display text
                        this.ctx2.clearRect(0, 0, 800, 600);
                        this.ctx2.fillText("Attack", this.p1.x + 15, this.p1.y + 50);
                        this.ctx2.fillText(this.p1.Atk, this.e1.x + 15, this.e1.y + 50);

                        //actual stat calculation
                        console.log("Player Attack:" + this.currentPlayer.Atk);
                        this.e1.HP = this.e1.HP - this.p1.Atk;
                        console.log("Enemy HP:" + this.e1.HP);
                        this.currentPlayer = this.e1;
                        this.newTime = Date.now() + 500;
                    }
                }
            }
            else if (this.currentPlayer.Type === 1) {
                if (time > this.newTime) {
                    this.ctx2.clearRect(0, 0, 800, 600);
                    this.ctx2.fillText("Enemy", this.e1.x + 15, this.e1.y + 50);
                    this.ctx2.fillText(this.e1.Atk, this.p1.x + 15, this.p1.y + 50);

                    //actual stat calculation
                    console.log("Enemy Attack:" + this.e1.Atk);
                    this.p1.HP = this.p1.HP - this.e1.Atk;
                    console.log("Hero HP: " + this.p1.HP);
                    this.currentPlayer = this.p1;
                    this.newTime = Date.now() + 500;
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
    }
}