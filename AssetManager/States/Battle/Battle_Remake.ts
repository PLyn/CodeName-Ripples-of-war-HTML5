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
        newTime;
        cTarget;
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
            //initializes battle positions for all characters in the battle list
            var enemies = initializeBattlePositions(EnemyID); 
            for (var x = 0; x < enemies.length; x++) {
                this.queue.push(enemies[x]);
            }
            //use function to add all the menu items to the menu array
            this.menu = [];
            this.menu = initializeMenuBounds();

            //the states that the battle can be in which would alter what is drawn and listened from input
            this.states = {
                "PSelect": 0,
                "PAttack": 1,
                "PSpell": 2,
                "PDefend": 3,
                "EAction": 4,
                "EndTurn": 5,
                "PrePlayerTurn": 6,
                "PreEnemyTurn": 7,
                "EndPhase" : 8
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
                    this.context2.fillText(this.queue[s].getTotalStats().HP, 600, 400 + (s * 20));
                }
                //else prints enemy name in different column
                else if (this.queue[s].Base.Type === 1 && this.queue[s].currentState !== 1) {
                    this.context2.fillText(this.queue[s].Base.ID, 200, 400 + (s * 20));
                }
            }
            //render menu buttons only if player is in Player select action state
            if (this.cState === "PSelect") {
                this.context2.drawImage(IMAGE_CACHE['Attack'], 600, 200);
                this.context2.drawImage(IMAGE_CACHE['Spell'], 600, 300);
                this.context2.drawImage(IMAGE_CACHE['Defend'], 600, 400);
            }
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
            if (mouseClicked() && this.cState === "PSelect") {
                this.playerSelect(time);
            }
            else if (mouseClicked() && this.cState === "PAttack") {
                this.playerAttackTarget(time);
            }
            else if (mouseClicked() && this.cState === "PSpell") {
                var bounds = SpellSelectDialog(this.queue[this.cTurn], this.context2);
                var spell = getSpellTouched(bounds);
                this.queue = selectSpellTargets(spell.spell, this.queue);
                this.cState = this.states["EndTurn"];
            }
            else if (mouseClicked() && this.cState === "PDefend") {
                this.queue[this.cTurn].defend = true;
                this.cState = this.states["EndTurn"];
            }
            else if (this.cState === "EAction") {
                EnemyAction(this.queue[this.cTurn], this.queue);
            }
            else if (this.cState === "EndTurn") {
                this.cTurn++;
                if (this.cTurn === (this.queue.length - 1)) {
                    this.cState = this.states["EndPhase"];
                }
            }
            else if (this.cState === "EndPhase") {
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
            input_template(this.menu.length, this.menu, f);
            function f(i) {
                switch (this.menu[i]) {
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
                this.context2.clearRect(0, 0, 800, 600);
                this.drawLayer2();
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
                        Attack(this.queue[this.cTurn], this.queue[this.cTarget[i]]);
                        this.cState = this.states["EndTurn"];
                        break;
                    }
                }
            }
        }
    }
}