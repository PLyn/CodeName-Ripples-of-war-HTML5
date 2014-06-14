///<reference path='../State.ts' />

var battleList = [];
module Game {
    export class Battle extends State {
        nextState;
        nextID;
        queue: Sprite[];
        menu;
        context: CanvasRenderingContext2D;
        context2: CanvasRenderingContext2D;
        states;
        cTurn;
        cState;
        mx; my;
        newTime = 0;
        cTarget;
        cSpell;
        cSpellData;
        turnDelay;
        Anim: Animation;
        playerCount = 0;
        mapID;
        endCondition;
        levelupDone = false;
        anim;
        constructor(EnemyID, mapID) {
            super();
            //time to wait between actions
            this.turnDelay = 500;
            //get canvases from html
            var canvas = <HTMLCanvasElement> document.getElementById('layer1');
            this.context = canvas.getContext('2d');
            var canvas2 = <HTMLCanvasElement> document.getElementById('layer2');
            this.context2 = canvas2.getContext('2d');
            //initalize animation class 
            this.Anim = new Animation(this.context2);
            //saves the next state and ID the player will go if victory is achieved
            this.nextState = JSON_CACHE['Enemies']['EnemyGroups'][EnemyID].next;
            this.nextID = JSON_CACHE['Enemies']['EnemyGroups'][EnemyID].ID;
            this.mapID = mapID;
            //Battle queue is now in the queue variable
            this.queue = [];
            this.queue = battleList;
            //initialize party members stats for current for the battle
            for (var y = 0; y < this.queue.length; y++) {
                this.queue[y].Current = this.queue[y].getTotalStats();
            }
            //initializes battle positions for all characters in the battle list
            var enemies = initializeBattlePositions(EnemyID); 
            for (var x = 0; x < enemies.length; x++) {
                this.queue.push(enemies[x]);
            }
            //use function to add all the menu items to the menu array
            this.menu = [];
            this.menu = initializeMenuBounds();
            //current spell and data
            this.cSpell = [];
            this.cSpellData = [];
            //the states that the battle can be in which would alter what is drawn and listened from input
            this.states = {
                "PSelectCommand": 0,
                "PSelectAtkTarget": 22,
                "PAtkAnim": 23,
                "PAttack": 1,
                "PSpell": 2,
                "SpellSelect": 3,
                "SpellTarget": 4,
                "PDefend": 5,
                "EAction": 6,
                "EndTurn": 7,
                "PrePlayerTurn": 8,
                "PreEnemyTurn": 9,
                "EndPhase": 10,
                "BattleEnd": 11
            };
            this.anim = new Animation(this.context2);
        }
        drawLayer1() {
            //clears screen
            this.context.clearRect(0, 0, 800, 600);
            //draws static background
            this.context.drawImage(IMAGE_CACHE['bg'], 0, 0);
            //can add additional background details in this layer
            //draws HUD window and labels above the data
            quickWindow(this.context, 100, 375, 600, 220, "blue", "red");
            //set text properties
            setStyle(this.context, 'Calibri', '12 pt', 'white', 'bold');
            this.context.fillText("Party", 550, 385);
            this.context.fillText("Enemies", 200, 385);
            //draws all the sprites from the queue and the HUD text as well
            for (var s = 0; s < this.queue.length; s++) {
                if (this.queue[s].currentState !== 1) {
                    //this.context2.fillText(this.queue[s].Base.ID, this.queue[s].dx, this.queue[s].dy - 15)
                    this.queue[s].render(this.context);
                }
                //sprite is ally then print name and HP
                if (this.queue[s].Base.Type === 0 && this.queue[s].currentState !== 1) {
                    this.context.fillText(this.queue[s].Base.ID, 500, 400 + (s * 20));
                    this.context.fillText(this.queue[s].Current.HP + " / " + this.queue[s].getTotalStats().HP, 600, 400 + (s * 20));
                }
                //else prints enemy name in different column
                else if (this.queue[s].Base.Type === 1 && this.queue[s].currentState !== 1) {
                    this.context.fillText(this.queue[s].Base.ID, 200, 400 + (s * 20));
                    this.context.fillText(this.queue[s].Current.HP + " / " + this.queue[s].getTotalStats().HP, 250, 400 + (s * 20));
                }
            }
        }
        drawLayer2() {
            //clears layer
            this.context2.clearRect(0, 0, 800, 600);
            //draws menu or graphics based on state of battle
            StateDialogs(this.context2, this.cState);
        }
        init() {
            this.cState = this.states["PrePlayerTurn"];
            this.drawLayers();
            this.cTurn = 0;
        }
        drawLayers() {
            this.drawLayer1();
            this.drawLayer2();
        }
        CheckIfDead() {
            for (var x = 0; x < this.queue.length; x++) {
                if (this.queue[x].Current.HP <= 0) {
                    this.queue[x].currentState = 1;
                    this.isBattleOver();
                }
            }
        }
        isBattleOver() {
            var aHP = 0;
            var eHP = 0;
            for (var y = 0; y < this.queue.length; y++) {
                if (this.queue[y].Base.Type === 0) {
                    aHP += this.queue[y].Current.HP;
                }
                if (this.queue[y].Base.Type === 1) {
                    eHP += this.queue[y].Current.HP;
                }
            }
            if (aHP <= 0) {
                this.context2.fillText("Defeat", 400, 300);
                this.cState = this.states['BattleEnd'];
                this.newTime = Date.now() + this.turnDelay;
                this.endCondition = "Defeat";
            }
            if (eHP <= 0) {
                this.context2.fillText("Victory", 400, 300);
                this.cState = this.states['BattleEnd'];
                this.newTime = Date.now() + this.turnDelay;
                this.endCondition = "Victory";
            }
        }
        playerSelect() {
            this.mx = mEvent.pageX;
            this.my = mEvent.pageY;
            for (var i = 0; i < this.menu.length; i++) {
                var a1 = this.menu[i].x;
                var a2 = this.menu[i].x + this.menu[i].w;
                var b1 = this.menu[i].y;
                var b2 = this.menu[i].y + this.menu[i].h;
                if ((a1 <= this.mx && this.mx <= a2) && (b1 <= this.my && this.my <= b2)) {
                    switch (this.menu[i].Name) {
                        case "Attack":
                            this.cState = this.states["PAtkSelectTarget"];
                            break;
                        case "Spell":
                            this.cState = this.states["PSpell"];
                            break;
                        case "Defend":
                            this.cState = this.states["PDefend"];
                            break;
                        default:
                            break;
                    }
                    this.drawLayers();
                }
            }
        }
        playerSelectAttackTarget() {
            this.mx = mEvent.pageX;
            this.my = mEvent.pageY;
            for (var i = 0; i < this.queue.length; i++) {
                var s1 = this.queue[i].dx;
                var s2 = this.queue[i].dx + this.queue[i].W;
                var d1 = this.queue[i].dy;
                var d2 = this.queue[i].dy + this.queue[i].H;
                if ((s1 <= this.mx && this.mx <= s2) && (d1 <= this.my && this.my <= d2)) {
                    if (this.queue[i].Base.Type === 1 && this.queue[i].currentState !== 1) {
                        this.cTarget = i;
                        this.anim.queueAnimation(ANIM_CACHE['at']);
                        this.cState = this.states["PAtkAnim"];
                        this.drawLayers();
                        this.anim.play();
                        break;
                    }
                }
            }
        }
        update() {
            var time = Date.now();
            //if player action select state is action
            if (this.cState === this.states["PrePlayerTurn"]) {
                this.cState = this.states["PSelectCommand"];
                this.drawLayers();
                this.newTime = time + this.turnDelay;
                this.queue[this.cTurn] = applyStatusEffect(this.context2, this.queue[this.cTurn]);
            }
            if (this.cState === this.states["PSelectCommand"] && mouseClicked()) {
                this.playerSelect();
            }
            /* 
                Player Attack Events start here 
            */
            else if (this.cState === this.states["PAtkSelectTarget"]) {
                this.playerSelectAttackTarget();
            }
            else if (this.cState === this.states["PAtkAnim"]) {
                if (this.anim.finishPlaying) {
                    this.cState = this.states['PAttack'];
                    this.drawLayers();
                }
            }
            else if (this.cState === this.states["PAttack"]) {
                this.newTime = Date.now() + this.turnDelay;
                this.cState = this.states['EndTurn'];
                this.drawLayers();
                var sprites = Attack(this.context2, this.queue[this.cTurn], this.queue[this.cTarget]);
                this.queue[this.cTurn] = sprites.Atk;
                this.queue[this.cTarget] = sprites.Tar;
                this.CheckIfDead();
                this.newTime = Date.now() + 400;
            }
            /* 
                Player Spell Events start here 
            */
            else if (this.cState === this.states["PSpell"]) {
                this.cState = this.states["SpellSelect"];
                this.drawLayers();
                this.cSpellData = SpellSelectDialog(this.queue[this.cTurn], this.context2);
            }
            else if (this.cState === this.states["SpellSelect"] && mouseClicked() ) {
                var spells = Object.keys(JSON_CACHE['spell']['Spells']);
                var mx = mEvent.pageX;
                var my = mEvent.pageY;
                for (var i = 0; i < this.cSpellData.length; i++) {
                    var a1 = this.cSpellData[i].x;
                    var a2 = this.cSpellData[i].x + this.cSpellData[i].w;
                    var b1 = this.cSpellData[i].y;
                    var b2 = this.cSpellData[i].y + this.cSpellData[i].h;
                    if ((a1 <= mx && mx <= a2) && (b1 <= my && my <= b2)) {
                        for (var x = 0; x < spells.length; x++) {
                            if (this.cSpellData[i].name === spells[x]) {
                                this.cSpell = JSON_CACHE['spell']['Spells'][spells[x]];
                                this.cState = this.states["SpellTarget"];
                                this.drawLayers();
                                break;
                            }
                        }
                    }
                }
            }
            else if (this.cState === this.states["SpellTarget"] && mouseClicked() && time > this.newTime) {
                var bounds = [];
                if (this.cSpell.All === 0) {
                    //select target
                    var mx = mEvent.pageX;
                    var my = mEvent.pageY;
                    for (var i = 0; i < this.queue.length; i++) {
                        var x1 = this.queue[i].dx;
                        var x2 = this.queue[i].dx + this.queue[i].W;
                        var y1 = this.queue[i].dy;
                        var y2 = this.queue[i].dy + this.queue[i].H;
                        if ((x1 <= mx && mx <= x2) && (y1 <= my && my <= y2)) {
                            var sprite = castSpellSingle(this.context2, this.cSpell, this.queue[i], this.queue[this.cTurn]);
                            this.queue[i] = sprite;
                        }
                    }
                }
                else if (this.cSpell.All === 1) {
                    //go ahead and cast
                    this.queue = castSpellAll(this.context2, this.cSpell, this.queue, this.queue[this.cTurn]);
                }
                this.cState = this.states["EndTurn"];
                this.CheckIfDead();
                this.drawLayers();
                this.newTime = time + this.turnDelay;

            }
            /* 
                Player Defend Events start here 
            */
            else if (this.cState === this.states["PDefend"]) {
                this.queue[this.cTurn].defend = true;
                this.cState = this.states["EndTurn"];
                this.drawLayers();
                this.newTime = time + this.turnDelay;
            }
            /* 
                Enemy Events start here 
            */
            else if (this.cState === this.states["PreEnemyTurn"]) {
                this.cState = this.states["EAction"];
                this.drawLayers();
                this.newTime = time + this.turnDelay;
                this.queue[this.cTurn] = applyStatusEffect(this.context2, this.queue[this.cTurn]);
            }
            else if (this.cState === this.states["EAction"] && time > this.newTime) {
                this.queue = EnemyAction(this.context2, this.queue[this.cTurn], this.queue);
                this.cState = this.states["EndTurn"];
                this.drawLayers();
                this.CheckIfDead();
                this.newTime = time + this.turnDelay;
            }
            else if (this.cState === this.states["EndTurn"] && time > this.newTime) {
                this.cTurn = (this.cTurn + 1) %  this.queue.length;
                if (this.queue[this.cTurn].Base.Type === 0 && this.queue[this.cTurn].currentState !== 1) {
                    this.cState = this.states["PrePlayerTurn"];
                    this.drawLayers();
                }
                else if (this.queue[this.cTurn].Base.Type === 1 && this.queue[this.cTurn].currentState !== 1) {
                    this.cState = this.states["PreEnemyTurn"];
                    this.drawLayers();
                }
            }
            /* 
                End of Battle Events start here 
            */
            else if (this.cState === this.states["BattleEnd"] && time > this.newTime) {
                for (var q = 0; q < this.queue.length; q++) {
                    if (this.queue[q].Base.Type === 1) {
                        battleList.splice(q, this.queue.length - q);
                    }
                }
                if (!this.levelupDone) {
                    if (mouseClicked() && this.endCondition === "Victory") {
                        if (this.queue[this.playerCount].Base.Type === 0) {
                            LevelUp(this.queue[this.playerCount], this.context2);
                            this.playerCount++;
                            if (this.playerCount >= this.queue.length) {
                                this.levelupDone = true;
                            }
                        }
                    }
                    else {
                        this.levelupDone = true;
                    }
                }
                else {
                if (this.endCondition === "Victory") {
                    sManager.popState();
                    if (this.nextState === "scene") {
                        sManager.pushState(new Cutscene(this.context2, +this.nextID, this.mapID));
                    }
                }
                else if (this.endCondition === "Defeat") {
                    //game over
                }
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