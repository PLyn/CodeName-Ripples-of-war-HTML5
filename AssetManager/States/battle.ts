///<reference path='State.ts' />
var BattleQ = [];
var battleList = [];
var menuOptions = [];
module Game {
    export class Battle extends State {
        ctx : CanvasRenderingContext2D;
        ctx2 : CanvasRenderingContext2D;
        p1;
        p2;
        e1;
        e2;
        mx;
        my;
        menuOptions: Object[];
        currentPlayer: Sprite;
        target: Sprite;
        newTime = 0;
        battleKeys;
        currentkey = 0;
        enemySelect;
        drawCommands;

        constructor(ctx, ctx2) {
            super();
            this.ctx = ctx;
            this.ctx2 = ctx2;
            this.p1 = new Sprite(IMAGE_CACHE['D'], 600, 250, 35, 35);
            this.p2 = new Sprite(IMAGE_CACHE['hero'], 600, 300, 35, 35);
            this.e1 = new Sprite(IMAGE_CACHE['S'], 300, 250, 35, 35);
            this.e2 = new Sprite(IMAGE_CACHE['back'], 300, 300, 35, 35);

            this.p1.setAttributes('hero', 10, 0, 4, 1, 1, 1, 1, 0);
            this.p2.setAttributes('ally', 5, 2, 1, 1, 1, 1, 1, 0);
            this.e1.setAttributes('foe', 15, 0, 1, 0, 1, 1, 1, 1);
            this.e2.setAttributes('foe2', 10, 0, 2, 1, 1, 1, 1, 1);

            battleList[0] = this.p1;
            battleList[1] = this.p2;
            battleList[2] = this.e1;
            battleList[3] = this.e2;

            this.battleKeys = Object.keys(battleList);
            menuOptions.push({
                "Name": "attack",
                "x": 600,
                "y": 200
            });
            menuOptions.push({
                "Name": "defend",
                "x": 600,
                "y": 275
            });
        }
        statusGUI() {
            this.ctx.clearRect(0, 0, 800, 200);
            for (var i = 0; i < this.battleKeys.length; i++) {                
                    this.ctx.fillText(battleList[i].ID + "HP : " + battleList[i].HP, (i + 1) * 150, 100);
            }
        }
        newTurn() {
            this.currentkey = 0;
            this.currentPlayer = battleList[this.currentkey];
        }
        PlayerMenuInit() {
            this.ctx.clearRect(0, 0, 800, 600);
            this.ctx2.clearRect(0, 0, 800, 600);
            setStyle(this.ctx2, 'Calibri', '16pt', 'black', 'bold', 'italic', 'left');
            this.statusGUI();
        }
        renderActors() {
            for (var i = 0; i < this.battleKeys.length; i++) {
                battleList[this.battleKeys[i]].render(this.ctx, 100, 100);
            }
            for (var x = 0; x < menuOptions.length; x++) {
                this.ctx2.drawImage(IMAGE_CACHE[menuOptions[x].Name], menuOptions[x].x, menuOptions[x].y);
            }
        }
        battleOver() {
            var aHP = 0;
            var eHP = 0;
            for (var i = 0; i < this.battleKeys.length; i++) {
                if (battleList[i].Type === 0) {
                    aHP += battleList[i].HP;
                }
                else if (battleList[i].Type === 1) {
                    eHP += battleList[i].HP;
                }
            }
            if (aHP === 0 || eHP === 0) {
                return true;
            }
            else {
                return false;
            }
        }
        init() {
            this.PlayerMenuInit();
            this.renderActors();
            this.currentPlayer = battleList[this.currentkey];

        }
        update() {
            var time = Date.now();
            if (this.currentkey > 3) {
                this.newTurn();
            }
            if (this.currentPlayer.Type === 0 && this.drawCommands) {
                this.renderActors();
                this.drawCommands = false;
            }
            if (this.battleOver()) {
                this.ctx2.clearRect(0, 0, 800, 600);
                this.ctx2.fillText("GAMEOVER", 400, 400);
            }
            if (this.currentPlayer.Type === 0 && this.enemySelect === true) {
                if (this.currentPlayer.Type === 0 && mousedown()) {
                    this.mx = mEvent.pageX;
                    this.my = mEvent.pageY;
                    for (var i = 0; i < this.battleKeys.length; i++) {
                        var x1 = battleList[this.battleKeys[i]].x;
                        var x2 = battleList[this.battleKeys[i]].x + battleList[this.battleKeys[i]].W;
                        var y1 = battleList[this.battleKeys[i]].y;
                        var y2 = battleList[this.battleKeys[i]].y + battleList[this.battleKeys[i]].H;
                        if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                            for (var x = 0; x < this.battleKeys.length; x++) {
                                if (battleList[this.battleKeys[i]] === battleList[this.battleKeys[x]]) {
                                    this.target = battleList[this.battleKeys[x]];
                                    this.enemySelect = false;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (!this.enemySelect) {
                    this.drawCommands = true;
                    this.target.HP = this.target.HP - this.currentPlayer.Atk;
                    this.ctx2.clearRect(300, 400, 600, 500);
                    this.ctx2.fillText(this.currentPlayer.ID + " Attacks " + this.target.ID + " for " + this.currentPlayer.Atk + " damage", 350, 450);
                    this.statusGUI();
                    this.currentkey++;
                    this.currentPlayer = battleList[this.currentkey];
                    this.newTime = Date.now() + 1000;
                }
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
                            this.ctx2.fillText("Who to Attack?", 350, 450);
                            this.enemySelect = true;
                        }
                    }
                }
            }
            else if (this.currentPlayer.Type === 1) {
                if (time > this.newTime) {
                    this.ctx2.clearRect(300, 400, 600, 500);
                    this.ctx2.fillText(this.currentPlayer.ID + " Attacks " + battleList[0].ID + " for " + this.currentPlayer.Atk + " damage" , 350, 450);
                    //actual stat calculation
                    var eTarget = getRandomInt(0, 1);
                    battleList[0].HP = battleList[0].HP - this.currentPlayer.Atk;
                    this.statusGUI();
                    this.currentkey++;
                    this.currentPlayer = battleList[this.currentkey];
                    this.newTime = Date.now() + 1500;
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