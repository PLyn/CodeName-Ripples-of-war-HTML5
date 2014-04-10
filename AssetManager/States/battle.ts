﻿///<reference path='State.ts' />
var BattleQ = [];
var battleList = [];
var menuOptions = [];
module Game {
    export class Battle extends State {
        ctx;
        ctx2;
        p1;
        e1;
        mx;
        my;
        menuOptions : Object[];
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
            this.p1.setAttributes('hero', 10, 0, 4, 1, 1, 1, 1, 0);
            this.e1.setAttributes('foe', 15, 0, 1, 0, 1, 1, 1, 1);

            battleList['p1'] = this.p1;
            battleList['e1'] = this.e1;
            
            this.battleKeys = Object.keys(battleList);
            menuOptions.push({
                "Name": "Attack",
                "x": 600,
                "y": 200
            });
            menuOptions.push({
                "Name": "Defend",
                "x": 600,
                "y": 275
            });
        }
        newTurn() {
            this.currentkey = 0;
        }
        PlayerTurn() {
            this.ctx.clearRect(0, 0, 800, 600);
            this.ctx2.clearRect(0, 0, 800, 600);
            setStyle(this.ctx2, 'Calibri', '16pt', 'black', 'bold', 'italic', 'left');
            this.ctx.drawImage(IMAGE_CACHE['attack'], 600, 200);
            this.ctx.drawImage(IMAGE_CACHE['defend'], 600, 275);
        }
        renderActors() {
            for (var i = 0; i < this.battleKeys.length; i++) {
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
                for (var i = 0; i < menuOptions.length; i++) {
                    var x1 = menuOptions[i].x;
                    var x2 = menuOptions[i].x + 190;
                    var y1 = menuOptions[i].y;
                    var y2 = menuOptions[i].y + 100;
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