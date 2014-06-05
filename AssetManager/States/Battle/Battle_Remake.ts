///<reference path='../State.ts' />

var battleList = [];
module Game {
    export class Battle extends State {
        nextState;
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
        constructor(EnemyID) {
            super();
            //get canvases from html
            var canvas = <HTMLCanvasElement> document.getElementById('layer1');
            this.context = canvas.getContext('2d');
            var canvas2 = <HTMLCanvasElement> document.getElementById('layer2');
            this.context2 = canvas2.getContext('2d');
            //saves the next state the player will go if victory is achieved
            this.nextState = JSON_CACHE['Enemies']['EnemyGroups'][EnemyID].next;
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
                "PSelect": 0,
                "PAttack": 1,
                "PSpell": 2,
                "SpellSelect": 3,
                "SpellTarget": 4,
                "PDefend": 5,
                "EAction": 6,
                "EndTurn": 7,
                "PrePlayerTurn": 8,
                "PreEnemyTurn": 9,
                "EndPhase" : 10
            };
        }
        drawLayer1() {
            //clears screen
            this.context.clearRect(0, 0, 800, 600);
            //draws static background
            this.context.drawImage(IMAGE_CACHE['bg'], 0, 0);
            //can add additional background details in this layer
        }
        drawLayer2() {
            //clears layer
            this.context2.clearRect(0, 0, 800, 600);
            //draws HUD window and labels above the data
            quickWindow(this.context2, 100, 375, 600, 220, "blue", "red");
            //set text properties
            setStyle(this.context2, 'Calibri', '12 pt', 'white', 'bold');
            this.context2.fillText("Party", 550, 385);
            this.context2.fillText("Enemies", 200, 385);
            //draws all the sprites from the queue and the HUD text as well
            for (var s = 0; s < this.queue.length; s++) {
                this.queue[s].render(this.context2);
                //sprite is ally then print name and HP
                if (this.queue[s].Base.Type === 0) {
                    this.context2.fillText(this.queue[s].Base.ID, 500, 400 + (s * 20));
                    this.context2.fillText(this.queue[s].Current.HP + " / " + this.queue[s].getTotalStats().HP, 600, 400 + (s * 20));
                }
                //else prints enemy name in different column
                else if (this.queue[s].Base.Type === 1 && this.queue[s].currentState !== 1) {
                    this.context2.fillText(this.queue[s].Base.ID, 200, 400 + (s * 20));
                }
            }
            StateDialogs(this.context2, this.cState);
        }
        init() {
            this.cState = this.states["PSelect"];
            this.drawLayer1();
            this.drawLayer2();
            this.cTurn = 0;
        }
        update() {
            var time = Date.now();
            //if player action select state is action
                if (this.cState === this.states["PSelect"] && mouseClicked() && time > this.newTime) {
                    this.playerSelect(time);
                }
                else if (this.cState === this.states["PAttack"] && mouseClicked() && time > this.newTime) {
                    this.playerAttackTarget(time);
                }
                else if (this.cState === this.states["PSpell"]) {             
                    this.cState = this.states["SpellSelect"];
                    this.drawLayer2();
                    this.cSpellData = SpellSelectDialog(this.queue[this.cTurn], this.context2);
                }
                else if (this.cState === this.states["SpellSelect"] && mouseClicked() && time > this.newTime) {
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
                                    this.drawLayer2();
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
                                var sprite = castSpellSingle(this.cSpell, this.queue[i]);
                                this.queue[i] = sprite;
                                this.cState = this.states["EndTurn"];
                                this.drawLayer2();
                            }
                        }
                    }
                    else if (this.cSpell.All === 1) {
                        //go ahead and cast
                        this.queue = castSpellAll(this.cSpell, this.queue);
                        this.cState = this.states["EndTurn"];
                        this.drawLayer2();
                    }
                }
                else if (this.cState === this.states["PDefend"]) {
                    this.queue[this.cTurn].defend = true;
                    this.cState = this.states["EndTurn"];
                    this.drawLayer2();
                }
                else if (this.cState === this.states["EAction"]) {
                    EnemyAction(this.queue[this.cTurn], this.queue);
                }
                else if (this.cState === this.states["EndTurn"]) {
                    this.cTurn++;
                    if (this.cTurn === (this.queue.length - 1)) {
                        this.cState = this.states["EndPhase"];
                        this.drawLayer2();
                    }
                    else if (this.queue[this.cTurn].Base.Type === 0) {
                        this.cState = this.states["PSelect"];
                        this.drawLayer2();
                    }
                    else if (this.queue[this.cTurn].Base.Type === 1) {
                        this.cState = this.states["EAction"];
                        this.drawLayer2();
                    }
                }
                else if (this.cState === this.states["EndPhase"]) {
                    this.cTurn = 0;
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
        playerSelect(time) {
            this.mx = mEvent.pageX;
            this.my = mEvent.pageY;
            for (var i = 0; i < this.menu.length; i++) {
                var a1 = this.menu[i].x;
                var a2 = this.menu[i].x + this.menu[i].w;
                var b1 = this.menu[i].y;
                var b2 = this.menu[i].y + this.menu[i].h;
                if ((a1 <= this.mx && this.mx <= a2) && (b1 <= this.my && this.my <= b2) && time > this.newTime) {
                    switch (this.menu[i].Name) {
                        case "Attack":
                            this.cState = this.states["PAttack"];
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
                    this.drawLayer2();
                }
            }
        }
        playerAttackTarget(time) {
            this.mx = mEvent.pageX;
            this.my = mEvent.pageY;
            for (var i = 0; i < this.queue.length; i++) {
                var a1 = this.queue[i].dx;
                var a2 = this.queue[i].dx + this.queue[i].W;
                var b1 = this.queue[i].dy;
                var b2 = this.queue[i].dy + this.queue[i].H;
                if ((a1 <= this.mx && this.mx <= a2) && (b1 <= this.my && this.my <= b2) && time > this.newTime) {
                    if (this.queue[i].Base.Type === 1 && this.queue[i].currentState !== 1) {
                        this.cTarget = i;
                        var sprites = Attack(this.queue[this.cTurn], this.queue[i]);
                        this.queue[this.cTurn] = sprites.Atk;
                        this.queue[i] = sprites.Tar;
                        this.cState = this.states["EndTurn"];
                        break;
                    }
                }
            }
        }
    }
}