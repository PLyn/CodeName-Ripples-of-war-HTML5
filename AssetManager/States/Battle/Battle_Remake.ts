///<reference path='../State.ts' />

var battleList = [];
module Game {
    export class BattleRewrite extends State {
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
            //initializes battle positions for all characters in the battle list
            initializeBattlePositions(EnemyID);  
            //Battle queue is now in the queue variable
            this.queue = [];
            this.queue = battleList;
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
                "EndTurn": 5
            };
        }
        drawLayer1() {
            this.context.clearRect(0, 0, 800, 600);
            this.context.drawImage(IMAGE_CACHE['bg'], 0, 0);
        }
        drawLayer2() {
            //clears layer
            this.context2.clearRect(0, 0, 800, 600);
            //set text properties
            setStyle(this.context2, 'Calibri', '12 pt', 'white', 'bold');
            //draws HUD window and labels above the data
            quickWindow(100, 375, 600, 300, "blue", "red");
            this.context2.fillText("Party", 550, 380);
            this.context2.fillText("Enemies", 200, 380);
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
        }
        init() {
            this.drawLayer1();
            this.drawLayer2();
            this.cTurn = 0;
            this.cState = this.states["PSelect"];
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
                SpellSelectDialog(this.queue[this.cTurn], this.context2);
                this.playerSpellTarget(time);
            }
            else if (mouseClicked() && this.cState === "PDefend") {
                this.queue[this.cTurn].defend = true;
            }
            else if (this.cState === "EndTurn") {
                this.cTurn++;
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
        playerSpellTarget(time) {

        }
    }
}