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
        back;
        items;
        cItem;
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
            //Use function to add all the item bounds for all the current items the player has
            this.items = [];
            this.items = initializeItemBounds();
            //current spell and data
            this.cSpell = [];
            this.cSpellData = [];
            //the states that the battle can be in which would alter what is drawn and listened from input
            this.states = getBattleStates();
            this.back = {
                "Name": "back",
                "x": 700,
                "y": 25,
                "w": 40, 
                "h": 40
            }
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
        playerSelectCommand() {
            //gets mouse coordinates
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
                            this.cState = this.states["PSpellDraw"];
                            break;
                        case "Defend":
                            this.cState = this.states["PDefend"];
                            break;
                        case "Item":
                            this.cState = this.states["ItemDraw"];
                            break;
                        default:
                            break;
                    }
                    this.drawLayers();
                }
            }
        }
        playerSelectAttackTarget() {
            //get couse coordinates
            this.mx = mEvent.pageX;
            this.my = mEvent.pageY;
            //get upper bounds of x and y for the back button
            var upperx = this.back.x + this.back.w;
            var uppery = this.back.y + this.back.h; 
            if ((this.back.x <= this.mx && this.mx <= upperx) && (this.back.y <= this.my && this.my <= uppery)) {
                this.cState = this.states["PSelectCommand"];
                this.drawLayers();
            }
            else {
                for (var i = 0; i < this.queue.length; i++) {
                    var s1 = this.queue[i].dx;
                    var s2 = this.queue[i].dx + this.queue[i].W;
                    var d1 = this.queue[i].dy;
                    var d2 = this.queue[i].dy + this.queue[i].H;
                    if ((s1 <= this.mx && this.mx <= s2) && (d1 <= this.my && this.my <= d2)) {
                        //if sprite is an enemy and is not dead
                        if (this.queue[i].Base.Type === 1 && this.queue[i].currentState !== 1) {
                            this.cTarget = i; //sets current target
                            this.cState = this.states["PAtkAnim"];//sets current state
                            this.drawLayers();
                            this.Anim.queueAnimation(ANIM_CACHE['at']); //queues animation to be played
                            this.Anim.play(); //start the animation
                            break;
                        }
                    }
                }
            }
        }
        update() {
            //stores the current time
            var time = Date.now();
            //actions that are done before the player selects something in their turn
            if (this.cState === this.states["PrePlayerTurn"]) {
                //sets font type and style
                setStyle(this.context2, 'calibre', 12, "white");
                //sets the next state to go to
                this.cState = this.states["PSelectCommand"];
                //redraw layers to match new state
                this.drawLayers();
                //time to wait before executing new state
                this.newTime = time + this.turnDelay;
                //status text to let the player know its there turn and the status effects on them
                this.context2.fillText(this.queue[this.cTurn].Base.ID, 350, 25);
                this.queue[this.cTurn] = applyStatusEffect(this.context2, this.queue[this.cTurn]);
            }
            //actions that are done if player is to select a command
            if (this.cState === this.states["PSelectCommand"] && mouseClicked() && time > this.newTime) {
                this.playerSelectCommand();
            }
            /* 
                Player Attack Events start here 
            */
            else if (this.cState === this.states["PAtkSelectTarget"] && mouseClicked()) {
                this.playerSelectAttackTarget();
            }
            else if (this.cState === this.states["PAtkAnim"]) {
                if (this.Anim.finishPlaying) {
                    this.cState = this.states['PAttack'];
                    this.drawLayers();
                    this.newTime = Date.now() + this.turnDelay;
                }
            }
            else if (this.cState === this.states["PAttack"] && time > this.newTime) {
                this.newTime = Date.now() + this.turnDelay;
                this.cState = this.states['EndTurn']; //end of turn for character
                this.drawLayers();
                //takes context, the attacker and target to calculate the effects of attacking the target and returns the results
                var sprites = Attack(this.context2, this.queue[this.cTurn], this.queue[this.cTarget]);
                this.queue[this.cTurn] = sprites.Atk; //the attacker
                this.queue[this.cTarget] = sprites.Tar; //the target
                this.CheckIfDead(); //checks if any sprite has died and makes the necessary changes
            }
            /* 
                Player Spell Events start here 
            */
            else if (this.cState === this.states["PSpellDraw"]) {
                this.cState = this.states["SpellSelect"];
                this.drawLayers();
                this.cSpellData = SpellSelectDialog(this.queue[this.cTurn], this.context2);
                this.context2.fillText("Select spell to be casted", 350, 25);
            }
            else if (this.cState === this.states["SpellSelect"] && mouseClicked() ) {
                var spells = Object.keys(JSON_CACHE['spell']['Spells']);
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                var upperx = this.back.x + this.back.w;
                var uppery = this.back.y + this.back.h;
                if ((this.back.x <= this.mx && this.mx <= upperx) && (this.back.y <= this.my && this.my <= uppery)) {
                    this.cState = this.states["PSelectCommand"];
                    this.drawLayers();
                }
                else {
                    for (var i = 0; i < this.cSpellData.length; i++) {
                        var a1 = this.cSpellData[i].x;
                        var a2 = this.cSpellData[i].x + this.cSpellData[i].w;
                        var b1 = this.cSpellData[i].y;
                        var b2 = this.cSpellData[i].y + this.cSpellData[i].h;
                        if ((a1 <= this.mx && this.mx <= a2) && (b1 <= this.my && this.my <= b2)) {
                            for (var x = 0; x < spells.length; x++) {
                                if (this.cSpellData[i].name === spells[x]) {
                                    this.cSpell = JSON_CACHE['spell']['Spells'][spells[x]];
                                    this.cState = this.states["SpellAnimation"];
                                    this.drawLayers();
                                    this.Anim.queueAnimation(ANIM_CACHE['at']);
                                    this.Anim.play();
                                    break;
                                }
                            }
                        }
                    }
                }
            }
            else if (this.cState === this.states["SpellTarget"] && mouseClicked()) {
                var bounds = [];
                if (this.cSpell.All === 0) {
                    //select target
                    var mx = mEvent.pageX;
                    var my = mEvent.pageY;
                    var upperx = this.back.x + this.back.w;
                    var uppery = this.back.y + this.back.h;
                    if ((this.back.x <= this.mx && this.mx <= upperx) && (this.back.y <= this.my && this.my <= uppery)) {
                        this.cState = this.states["PSelectCommand"];
                        this.drawLayers();
                    }
                    else {
                        for (var i = 0; i < this.queue.length; i++) {
                            var x1 = this.queue[i].dx;
                            var x2 = this.queue[i].dx + this.queue[i].W;
                            var y1 = this.queue[i].dy;
                            var y2 = this.queue[i].dy + this.queue[i].H;
                            if ((x1 <= mx && mx <= x2) && (y1 <= my && my <= y2)) {
                                this.cTarget = i;
                            }
                        }
                    }
                }
                this.cState = this.states["SpellAnim"];
                this.drawLayers();
            }
            else if (this.cState === this.states["SpellAnim"]) {
                if (this.Anim.finishPlaying) {
                    this.cState = this.states['SpellCast'];
                    this.drawLayers();
                }
            }
            else if (this.cState === this.states["SpellCast"]) {
                if (this.cSpell.All === 0) {
                    var sprite = castSpellSingle(this.context2, this.cSpell, this.queue[this.cTarget], this.queue[this.cTurn]);
                    this.queue[this.cTarget] = sprite;
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
                PLayer Item events start here 
            */
            else if (this.cState === this.states["ItemDraw"]) {
                quickWindow(this.context2, 10, 300, 500, 500, "blue", "red");
                var ikeys = Object.keys(ITEM.consumable);
                var items = ITEM.consumable;
                this.context2.fillStyle = "white";
                for (var x = 0; x < ikeys.length; x++) {
                    this.context2.fillText(items[ikeys[x]].name, 25, 320 + (x * 30));
                    this.context2.fillText(items[ikeys[x]].quantity, 100, 320 + (x * 30));
                }
                this.cState = this.states["ItemSelect"];
                this.drawLayers();
            }
            else if (this.cState === this.states["ItemSelect"] && mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                var upperx = this.back.x + this.back.w;
                var uppery = this.back.y + this.back.h;
                if ((this.back.x <= this.mx && this.mx <= upperx) && (this.back.y <= this.my && this.my <= uppery)) {
                    this.cState = this.states["PSelectCommand"];
                    this.drawLayers();
                }
                else {
                    for (var i = 0; i < this.items.length; i++) {
                        var a1 = this.items[i].x;
                        var a2 = this.items[i].x + this.items[i].w;
                        var b1 = this.items[i].y;
                        var b2 = this.items[i].y + this.items[i].h;
                        if ((a1 <= this.mx && this.mx <= a2) && (b1 <= this.my && this.my <= b2)) {
                            this.cItem = this.items[i].name;
                            this.cState = this.states["ItemSelectTarget"];
                            this.drawLayers();
                        }
                    }
                }
            }
            else if (this.cState === this.states["ItemSelectTarget"] && mouseClicked()) {
                var mx = mEvent.pageX;
                var my = mEvent.pageY;
                var upperx = this.back.x + this.back.w;
                var uppery = this.back.y + this.back.h;
                if ((this.back.x <= this.mx && this.mx <= upperx) && (this.back.y <= this.my && this.my <= uppery)) {
                    this.cState = this.states["ItemSelect"];
                    this.drawLayers();
                }
                else {
                    for (var i = 0; i < this.queue.length; i++) {
                        var x1 = this.queue[i].dx;
                        var x2 = this.queue[i].dx + this.queue[i].W;
                        var y1 = this.queue[i].dy;
                        var y2 = this.queue[i].dy + this.queue[i].H;
                        if ((x1 <= mx && mx <= x2) && (y1 <= my && my <= y2)) {
                            this.queue[i] = UseItem(this.context2, this.cItem, this.queue[i]);
                            this.cState = this.states["EndTurn"];
                            this.drawLayers();
                        }
                    }
                }
            }
            /* 
                Enemy Events start here 
            */
            else if (this.cState === this.states["PreEnemyTurn"]) {
                this.cState = this.states["EAction"];
                this.drawLayers();
                this.newTime = time + this.turnDelay;
                this.queue[this.cTurn] = applyStatusEffect(this.context2, this.queue[this.cTurn]);
                var cAbility = EnemyActionChooser(this.queue[this.cTurn], this.queue);

                var allyCount = 0;
                for (var x = 0; x < this.queue.length; x++) {
                    if (this.queue[x].Base.Type === 0 && this.queue[x].currentState !== 1) {
                        allyCount++;
                    }
                }
                //get random int to determine which ally to target
                this.cTarget = getRandomInt(0, allyCount);

                switch (cAbility) {
                    case "Attack":
                        this.cState = this.states["EAttackAnim"];
                        this.Anim.queueAnimation(ANIM_CACHE['at']);
                        this.Anim.play();
                        break;
                    case "Defend":
                        this.cState = this.states["EDefend"];
                        break;
                    default:
                        this.cState = this.states["ESpellAnim"];
                        this.Anim.queueAnimation(ANIM_CACHE['at']);
                        this.Anim.play();
                        break;
                }
                this.drawLayers();
            }
            else if (this.states === this.states["EAttackAnim"]) {
                if (this.Anim.finishPlaying) {
                    this.cState = this.states['PAttack'];
                    this.drawLayers();
                    this.newTime = Date.now() + this.turnDelay;
                }
            }
            else if (this.cState === this.states["EAttack"] && time > this.newTime) {
                var attack = Attack(this.context2, this.queue[this.cTurn], this.queue[this.cTarget]);
                this.queue[this.cTarget] = attack.Tar;

                this.cState = this.states["EndTurn"];
                this.drawLayers();
                this.CheckIfDead();
                this.newTime = time + this.turnDelay;
            }
            else if (this.cState === this.states["ESpellAnim"]) {
                if (this.Anim.finishPlaying) {
                    this.cState = this.states['PAttack'];
                    this.drawLayers();
                    this.newTime = Date.now() + this.turnDelay;
                }
            }
            else if (this.cState === this.states["ESpellCast"]) {

            }
            else if (this.cState === this.states["EDefend"]) {

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
            else if (this.cState === this.states["EndBattle"] && time > this.newTime) {
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