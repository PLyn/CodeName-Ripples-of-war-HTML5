///<reference path='State.ts' />
var BattleQ = [];
var battleList = [];
var menuOptions = [];
module Game {
    export class Battle extends State {
        ctx : CanvasRenderingContext2D;
        ctx2 : CanvasRenderingContext2D;
        p1 : Sprite;
        p2 : Sprite;
        e1 : Sprite;
        e2 : Sprite;
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
            this.p1 = new Sprite(IMAGE_CACHE['D'], 400, 250, 35, 35);
            this.p2 = new Sprite(IMAGE_CACHE['D'], 400, 325, 35, 35);
            this.e1 = new Sprite(IMAGE_CACHE['S'], 200, 250, 35, 35);
            this.e2 = new Sprite(IMAGE_CACHE['S'], 200, 325, 35, 35);

            this.p1.setBaseAttributes('hero', 10, 0, 4, 1, 1, 1, 1, 0);
            this.p2.setBaseAttributes('ally', 5, 2, 1, 1, 1, 1, 1, 0);
            this.e1.setBaseAttributes('foe', 15, 0, 1, 0, 1, 1, 1, 1);
            this.e2.setBaseAttributes('foe2', 10, 0, 5, 1, 1, 1, 1, 1);

            var sword = new Weapon('hero', 'hero sword', 'Weapon', 10, 0, 4, 1, 1, 1, 1);
            this.p1.equipItem(sword, 'Weapon');
            battleList[0] = this.p1;
            battleList[1] = this.p2;
            battleList[2] = this.e1;
            battleList[3] = this.e2;

            this.battleKeys = Object.keys(battleList);
            menuOptions.push({
                "Name": "attack",
                "x": 550,
                "y": 200
            });
            menuOptions.push({
                "Name": "defend",
                "x": 550,
                "y": 275
            });
        }
        statusGUI() {
            this.ctx.clearRect(0, 0, 800, 200);
            for (var i = 0; i < this.battleKeys.length; i++) {        
                    this.ctx.fillText(battleList[i].ID + " HP : " + battleList[i].HP, (i + 1) * 150, 100);
            }
        }
        newTurn() {
            this.currentkey = 0;
            this.currentPlayer = battleList[this.currentkey];
        }
        PlayerMenuInit() {
            this.ctx.clearRect(0, 0, 800, 600);
            this.ctx2.clearRect(0, 0, 800, 600);
            setStyle(this.ctx, 'Calibri', '16pt', 'black', 'bold', 'italic', 'left');
            setStyle(this.ctx2, 'Calibri', '16pt', 'black', 'bold', 'italic', 'left');
            this.statusGUI();
        }
        renderActors() {
            this.ctx.clearRect(0, 0, 800, 600);
            for (var i = 0; i < this.battleKeys.length; i++) {
                battleList[this.battleKeys[i]].render(this.ctx, 100, 100);
                this.ctx.fillText(battleList[this.battleKeys[i]].ID, battleList[this.battleKeys[i]].x + 20, battleList[this.battleKeys[i]].y - 5);
            }
            for (var x = 0; x < menuOptions.length; x++) {
                this.ctx2.drawImage(IMAGE_CACHE[menuOptions[x].Name], menuOptions[x].x, menuOptions[x].y);
            }
            this.statusGUI();
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
            if (this.currentPlayer.Base.Type === 0 && this.drawCommands && time > this.newTime) {
                this.ctx2.clearRect(0, 0, 800, 600);
                this.ctx2.fillText("Player Turn", 350, 450);
                this.renderActors();
                this.drawCommands = false;
            }
            if (this.battleOver()) {
                this.ctx2.clearRect(0, 0, 800, 600);
                this.ctx2.fillText("THE BATTLE IS OVER", 400, 400);

            }
            else if (this.currentPlayer.Base.Type === 0 && this.enemySelect === true) {
                if (this.currentPlayer.Base.Type === 0 && mousedown()) {
                    this.mx = mEvent.pageX;
                    this.my = mEvent.pageY;
                    for (var i = 0; i < this.battleKeys.length; i++) {
                        var x1 = battleList[this.battleKeys[i]].x;
                        var x2 = battleList[this.battleKeys[i]].x + battleList[this.battleKeys[i]].W;
                        var y1 = battleList[this.battleKeys[i]].y;
                        var y2 = battleList[this.battleKeys[i]].y + battleList[this.battleKeys[i]].H;
                        if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                            for (var x = 0; x < this.battleKeys.length; x++) {
                                if (battleList[this.battleKeys[i]] === battleList[this.battleKeys[x]] && battleList[this.battleKeys[x]].Type === 1) {
                                    this.target = battleList[this.battleKeys[x]];
                                    this.statusGUI();
                                    this.enemySelect = false;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (!this.enemySelect) {
                    this.drawCommands = true;
                    this.target.getTotalStats().HP = this.target.getTotalStats().HP - this.currentPlayer.getTotalStats().Atk;
                    if (this.target.getTotalStats().HP < 1) {
                        this.target.getTotalStats().Type = 2;
                    }

                    this.ctx2.clearRect(300, 400, 600, 500);
                    this.ctx2.fillText(this.currentPlayer.ID + " Attacks " + this.target.ID + " for " + this.currentPlayer.getTotalStats().Atk + " damage", 350, 450);
                    this.statusGUI();
                    this.currentkey++;
                    this.currentPlayer = battleList[this.currentkey];
                    this.newTime = Date.now() + 1000;
                }
            }
            else if (this.currentPlayer.Base.Type === 0 && mousedown()) {
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
                            this.ctx2.fillText("Click to select Target", 350, 450);
                            this.enemySelect = true;
                        }
                    }
                }
            }
            else if (this.currentPlayer.Base.Type === 1) {
                if (time > this.newTime) {
                    this.ctx2.clearRect(300, 400, 600, 500);
                    this.ctx2.fillText(this.currentPlayer.ID + " Attacks " + battleList[0].ID + " for " + this.currentPlayer.getTotalStats().Atk + " damage", 350, 450);
                    //actual stat calculation
                    var targetNum = getRandomInt(0, this.battleKeys.length - 1);
                    while (battleList[targetNum].Type !== 0) {
                        targetNum = getRandomInt(0, this.battleKeys.length - 1);
                    }
                    this.target = battleList[targetNum];
                    this.target.getTotalStats().HP = this.target.getTotalStats().HP - this.currentPlayer.getTotalStats().Atk;
                    if (this.target.getTotalStats().HP < 1) {
                        this.target.Base.Type = 2;
                    }
                    this.statusGUI();
                    this.currentkey++;
                    this.currentPlayer = battleList[this.currentkey];
                    this.newTime = Date.now() + 1000;
                }
            }
            else if(this.currentPlayer.Base.Type === 2) {
                this.currentkey++;
                this.currentPlayer = battleList[this.currentkey];
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