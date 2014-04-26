///<reference path='State.ts' />
var BattleQ = [];
var battleList = [];
var menuOptions = [];
module Game {
    export class Battle extends State {
        ctx: CanvasRenderingContext2D;
        ctx2: CanvasRenderingContext2D;
        p1: Sprite;
        p2: Sprite;
        e1: Sprite;
        e2: Sprite;
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
        endTime = 0;
        currentHP;
        dead;
        formation;
        command;

        constructor(ctx, ctx2) {
            super();
            this.ctx = ctx;
            this.ctx2 = ctx2;

            this.e1 = new Sprite(IMAGE_CACHE['S'], 200, 250, 35, 35);
            this.e2 = new Sprite(IMAGE_CACHE['S'], 200, 325, 35, 35);

            this.e1.setBaseAttributes('foe', 15, 0, 5, 0, 1, 1, 1, 1);
            this.e2.setBaseAttributes('foe2', 10, 0, 5, 1, 1, 1, 1, 1);

            battleList[2] = this.e1;
            battleList[3] = this.e2;
            this.battleKeys = Object.keys(battleList);

            menuOptions.push({
                "Name": "Attack",
                "x": 550,
                "y": 200
            });
            menuOptions.push({
                "Name": "Defend",
                "x": 550,
                "y": 275
            });
        }
        Attack() {
            if (this.currentPlayer.Base.Type === 0 && mousedown()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var i = 0; i < this.battleKeys.length; i++) {
                    var x1 = battleList[this.battleKeys[i]].x;
                    var x2 = battleList[this.battleKeys[i]].x + battleList[this.battleKeys[i]].W;
                    var y1 = battleList[this.battleKeys[i]].y;
                    var y2 = battleList[this.battleKeys[i]].y + battleList[this.battleKeys[i]].H;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (this.command === 'Attack') {
                            for (var x = 0; x < this.battleKeys.length; x++) {
                                if (battleList[this.battleKeys[i]] === battleList[this.battleKeys[x]] && !battleList[this.battleKeys[x]].dead && battleList[this.battleKeys[x]].Base.Type === 1) {
                                    this.target = battleList[this.battleKeys[x]];
                                    this.statusGUI();
                                    this.enemySelect = false;
                                    break;
                                }
                            }
                        }
                        else if (this.command === 'Spell') {

                        }
                    }
                }
            }
            if (!this.enemySelect) {
                if (this.command === 'Attack') {
                    this.drawCommands = true;
                    this.target.Current.HP = this.target.Current.HP - this.currentPlayer.Current.Atk;
                    if (this.target.Current.HP < 1) {
                        this.target.dead = true;
                        if (this.battleOver()) {
                            this.endTime = Date.now() + 1000;
                        }
                        this.renderActors();
                    }
                    this.ctx2.clearRect(300, 400, 600, 500);
                    this.ctx2.fillText(this.currentPlayer.Base.ID + " Attacks " + this.target.Base.ID + " for " + this.currentPlayer.Current.Atk + " damage", 350, 450);
                    this.statusGUI();
                    this.currentkey++;
                    this.currentPlayer = battleList[this.currentkey];
                    this.newTime = Date.now() + 1000;
                }
                else if (this.command === 'Spell') {

                }
            }
        }
        SelectSpell() {

        }
        Target(time) {
            this.mx = mEvent.pageX;
            this.my = mEvent.pageY;
            for (var i = 0; i < menuOptions.length; i++) {
                var a1 = menuOptions[i].x;
                var a2 = menuOptions[i].x + 190;
                var b1 = menuOptions[i].y;
                var b2 = menuOptions[i].y + 50;
                if ((a1 <= this.mx && this.mx <= a2) && (b1 <= this.my && this.my <= b2) && time > this.newTime) {
                    if (menuOptions[i].Name === 'Attack') {
                        this.command = menuOptions[i].Name;
                        this.ctx2.clearRect(0, 0, 800, 600);
                        this.ctx2.fillText("Click to select Target", 350, 450);
                        this.enemySelect = true;
                    }
                    else if (menuOptions[i].Name === 'Spell') {

                    }
                    else if (menuOptions[i].Name === 'Defend') {
                        this.command = menuOptions[i].Name;
                        this.ctx2.clearRect(300, 400, 600, 500);
                        this.drawCommands = true;
                        this.ctx2.fillText(this.currentPlayer.Base.ID + " Defends and takes reduced damage", 350, 450);
                        this.statusGUI();
                        this.currentkey++;
                        this.currentPlayer = battleList[this.currentkey];
                        this.newTime = Date.now() + 1000;
                    }
                }
            }
        }
        statusGUI() {
            this.ctx.clearRect(0, 0, 800, 200);
            for (var i = 0; i < this.battleKeys.length; i++) {
                this.ctx.fillText(battleList[i].Base.ID + " HP : " + battleList[i].Current.HP, (i + 1) * 150, 100);

                if (battleList[i].Base.Type === 0) {
                    this.ctx.fillText("Formation Bonus: " + FORMATION.bonus.HP + " " + FORMATION.bonus.MP + " " + FORMATION.bonus.Atk + " " + FORMATION.bonus.Def + " " + FORMATION.bonus.Spd + " " + FORMATION.bonus.MDef + " " + FORMATION.bonus.Luc, 300, 500);
                }
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
                if (!battleList[this.battleKeys[i]].dead) {
                    if (battleList[this.battleKeys[i]].Base.Type === 0) {
                        this.formation = FORMATION.positions;
                        battleList[this.battleKeys[i]].setPos(this.formation[i].x, this.formation[i].y);
                    }
                    battleList[this.battleKeys[i]].render(this.ctx);
                    //this.ctx.fillText(battleList[this.battleKeys[i]].Base.ID, this.formation[i].x, this.formation[i].y);
                    this.ctx.fillText(battleList[this.battleKeys[i]].Base.ID, battleList[this.battleKeys[i]].x + 20, battleList[this.battleKeys[i]].y - 5);
                }
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
                if (battleList[i].Base.Type === 0) {
                    aHP += battleList[i].Current.HP;
                }
                else if (battleList[i].Base.Type === 1) {
                    eHP += battleList[i].Current.HP;
                }
            }
            if (aHP <= 0 || eHP <= 0) {
                return true;
            }
            else {
                return false;
            }
        }
        init() {
            
            for (var x = 0; x < this.battleKeys.length; x++) {
                    battleList[x].dead = false;
                    battleList[x].Current = battleList[x].getTotalStats();
            }
            this.PlayerMenuInit();
            this.renderActors();
            this.currentPlayer = battleList[this.currentkey];
        }
        update() {
            var time = Date.now();
            if (this.currentkey > 3) {
                this.newTurn();
            }
            if (this.currentPlayer.Base.Type === 0 && !this.currentPlayer.dead && this.drawCommands && time > this.newTime) {
                this.ctx2.clearRect(0, 0, 800, 600);
                this.ctx2.fillText("Player Turn", 350, 450);
                this.renderActors();
                this.drawCommands = false;
            }
            if (this.battleOver() && time > this.endTime) {
                this.ctx.clearRect(0, 0, 800, 600);
                this.ctx2.clearRect(0, 0, 800, 600);
                sManager.popState();
            }
            else if (this.battleOver()) {
                this.ctx2.clearRect(0, 0, 800, 600);
                this.ctx2.fillText("THE BATTLE IS OVER", 400, 400);
            }
            else if (this.currentPlayer.Base.Type === 0 && this.enemySelect === true) {
                this.Attack();
            }
            else if (this.currentPlayer.Base.Type === 0 && mousedown() && !this.currentPlayer.dead) {
                this.Target(time);
            }
            else if (this.currentPlayer.Base.Type === 1 && !this.currentPlayer.dead) {
                if (time > this.newTime) {
                    this.ctx2.clearRect(300, 400, 600, 500);
                    //actual stat calculation
                    var targetNum = getRandomInt(0, this.battleKeys.length - 1);
                    while (battleList[targetNum].dead || battleList[targetNum].Base.Type !== 0) {
                        targetNum = getRandomInt(0, this.battleKeys.length - 1);
                    }
                    this.target = battleList[targetNum];
                    this.ctx2.fillText(this.currentPlayer.Base.ID + " Attacks " + battleList[targetNum].Base.ID + " for " + this.currentPlayer.Current.Atk + " damage", 350, 450);
                    this.target.Current.HP = this.target.Current.HP - this.currentPlayer.Current.Atk;
                    if (this.target.Current.HP < 1) {
                        this.target.dead = true;
                        if (this.battleOver()) {
                            this.endTime = Date.now() + 1000;
                        }
                        this.renderActors();
                    }
                    this.statusGUI();
                    this.currentkey++;
                    this.currentPlayer = battleList[this.currentkey];
                    this.newTime = Date.now() + 1000;
                }
            }
            else if (this.currentPlayer.dead) {
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