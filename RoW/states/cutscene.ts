///<reference path='State.ts' />
module Game {
    export class Cutscene extends State {
        dia;
        canvas;
        canvas2;
        context;
        context2;
        xmlID;

        node;
        currentNode;
        lines = [];
        ctx;
        linePos = 0;
        time = 0;
        currentTime = 0;
        prevName;
        lineHeight = 1;
        initNode = true;
        nCounter = 0;
        nodeCount = 0;
        textNodes = [];
        sfx;
        anim;
        animate;
        mapID;
        constructor(ctx, xmlID, mapID) {
            super();
            this.canvas = <HTMLCanvasElement> document.getElementById('layer1');
            this.context = this.canvas.getContext('2d');
            this.canvas2 = <HTMLCanvasElement> document.getElementById('layer2');
            this.context2 = this.canvas2.getContext('2d');
            this.xmlID = xmlID;
            this.mapID = mapID;
        }
        init() {
            this.initNode = true;
            this.node = XML_CACHE['chapter'].getElementsByTagName('scene')[this.xmlID];
            var count = 0;
            for (var x = 0; x < this.node.childNodes.length; x++) {
                if (this.node.childNodes[x].nodeType === 1) {
                    this.textNodes[count] = this.node.childNodes[x];
                    count++;
                    this.nodeCount++;
                }
            }
            this.currentNode = this.textNodes[this.nCounter];
        }
        update() {
            this.currentTime = Date.now();
            switch (this.currentNode.getAttribute('type')) {
                case "dialog":
                    this.renderDialog();
                    break;
                case "bg":
                    this.renderBG();
                    break;
                case "party":
                    this.changeParty();
                    break;
                case "ability":
                    this.editAbilities();
                    break;
                case "switch":
                    this.editSwitch();
                    break;
                case "sfx":
                    this.playSFX();
                    break;
                case "move":
                    this.moveObject();
                    break;
                case "object":
                    this.changeObjects();
                    break;
                case "anim":
                    this.playAnimation();
                    break;
                case "bgm":
                    this.playBGM();
                    break;
                case "item":
                    this.editItem();
                    break;
                case "next":
                    this.nextState();
                    break;
                default:
                    break;
            }
        }
        nextNode() {
            this.nCounter++;
            this.currentNode = this.textNodes[this.nCounter];
        }
        renderDialog() {
            if (this.initNode) {
                setStyle(this.context2, 'Calibri', '14pt', 'white');
                this.context2.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                this.linePos = 0;
                this.lineHeight = 1;
                this.lines = wrap(this.context2, this.currentNode);
                this.prevName = this.lines[this.linePos].name;
                this.initNode = false;
                quickWindow(this.context2, 25, 25, GAME_WIDTH - 50, GAME_HEIGHT / 4, "blue", "red");
                setStyle(this.context2, 'calibre', 14, 'white');

                var charListkeys = Object.keys(JSON_CACHE['character']['Party']);
                var charList = JSON_CACHE['character']['Party'];
                for (var x = 0; x < charListkeys.length; x++) {
                    if (charListkeys[x] === this.lines[this.linePos].name) {
                        var i = IMAGE_CACHE[charList[charListkeys[x]].Img];
                        this.context2.drawImage(i, 40, 60);
                        break;
                    }
                }


                this.time = this.currentTime + 500;
                if (this.prevName !== this.lines[this.linePos].name) {
                    this.context2.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                    this.prevName = this.lines[this.linePos].name;
                    this.lineHeight = 1;
                    quickWindow(this.context2, 25, 25, GAME_WIDTH - 50, GAME_HEIGHT / 4, "blue", "red");
                    setStyle(this.context2, 'calibre', 14, 'white');
                    for (var x = 0; x < battleList.length; x++) {
                        if (battleList[x].Base.ID === this.lines[this.linePos].name) break;
                    }
                    battleList[x].setPos(30, 50);
                    battleList[x].render(this.context2);
                }
                else if (this.linePos >= 1) {
                    this.lineHeight += 25;
                }
                this.context2.fillText(this.lines[this.linePos].message, 130, (50 + this.lineHeight));
                this.context2.fillText(this.lines[this.linePos].name, 35, 40);
                this.linePos++;
            }
            if (this.linePos < this.lines.length && this.currentTime > this.time && mouseClicked()) {
                this.time = this.currentTime + 500;
                if (this.prevName !== this.lines[this.linePos].name) {
                    this.context2.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                    this.prevName = this.lines[this.linePos].name;
                    this.lineHeight = 1;
                    quickWindow(this.context2, 25, 25, GAME_WIDTH - 50, GAME_HEIGHT / 4, "blue", "red");
                    setStyle(this.context2, 'calibre', 14, 'white');

                    var charListkeys = Object.keys(JSON_CACHE['character']['Party']);
                    var charList = JSON_CACHE['character']['Party'];
                    for (var x = 0; x < charListkeys.length; x++) {
                        if (charListkeys[x] === this.lines[this.linePos].name) {
                            var i = IMAGE_CACHE[charList[charListkeys[x]].Img];
                            this.context2.drawImage(i, 40, 60);
                            break;
                        }
                    }
                }
                else if (this.linePos >= 1) {
                    this.lineHeight += 25;
                }
                this.context2.fillText(this.lines[this.linePos].message, 130, (50 + this.lineHeight));
                this.context2.fillText(this.lines[this.linePos].name, 35, 40);
                this.linePos++;
            }
            else if (this.linePos >= this.lines.length && this.currentTime > this.time && mouseClicked()) {
                this.initNode = true;
                this.nextNode();
            }
        }
        renderBG() {
            this.context.drawImage(IMAGE_CACHE[this.currentNode.nodeName], 0, 0);
            this.initNode = true;
            this.nextNode();
        }
        changeParty() {
            if (this.currentNode.getAttribute('value') === "add") {
                PARTY.add(this.currentNode.nodeName, 0);
            }
            else if (this.currentNode.getAttribute('value') === "remove") {
                PARTY.remove(this.currentNode.nodeName, 0);
            }
            this.initNode = true;
            this.nextNode();
        }
        editAbilities() {
            if (this.currentNode.getAttribute('value') === "add") {
                for (var i = 0; i < battleList.length; i++) {
                    if (battleList[i].Base.ID === this.currentNode.nodeName) break;
                }
                SPELL.AddSpell(battleList[i], this.currentNode.getAttribute('spell'));
            }
            else if (this.currentNode.getAttribute('value') === "remove") {
                for (var i = 0; i < battleList.length; i++) {
                    if (battleList[i].Base.ID === this.currentNode.nodeName) break;
                }
                SPELL.RemoveSpell(battleList[i], this.currentNode.getAttribute('spell'));
            }
            this.initNode = true;
            this.nextNode();
        }
        editSwitch() {
            QUEST.Switch[this.currentNode.nodeName] = this.currentNode.getAttribute('value');
            this.initNode = true;
            this.nextNode();
        }
        playSFX() {
            if (this.initNode) {
                this.sfx = SOUND_CACHE[this.currentNode.nodeName];
                this.sfx.play();
                this.initNode = false;
            }
            else if (this.sfx.ended) {
                this.initNode = true;
                this.nextNode();
            }
        }
        moveObject() {
            var sx; var sy; var dx; var dy;
            var keys = Object.keys(objects);
            for (var x = 0; x < keys.length; x++) {
                if (this.currentNode.nodeName === objects[keys[x]].name) {
                    sx = objects[keys[x]].x;
                    sy = objects[keys[x]].y;
                    break;
                }
            }
            dx = +this.currentNode.getAttribute('x');
            dy = +this.currentNode.getAttribute('y');
            var coords = moveSprite(this.context, sx, sy, dx, dy);
            objects[x].x = coords.x;
            objects[x].y = coords.y;
            this.context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            TileMap.drawMapNoObjectReset(this.context, this.mapID);
            battleList[0].setPos((JSON_CACHE['location'][this.mapID][this.mapID]['startx'] * 64) + 16, (JSON_CACHE['location'][this.mapID][this.mapID]['starty'] * 64) + 16);
            //draws character
            battleList[0].render(this.context);
            this.initNode = true;
            this.nextNode();
        }
        changeObjects() {
            if (this.currentNode.getAttribute('value') === "add") {
                var obj = {
                    "gid": +this.currentNode.getAttribute('gid'),
                    "name": this.currentNode.nodeName,
                    "type": "",
                    "properties": {
                        "Type": 0,
                        "ID": 0
                    },
                    "width": 0,
                    "x": +this.currentNode.getAttribute('x') * 64,
                    "y": +this.currentNode.getAttribute('y') * 64
                };
                objects.push(obj);
                this.context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                TileMap.drawMapNoObjectReset(this.context, this.mapID);
                battleList[0].setPos((JSON_CACHE['location'][this.mapID][this.mapID]['startx'] * 64) + 16, (JSON_CACHE['location'][this.mapID][this.mapID]['starty'] * 64) + 16);
                //draws character
                battleList[0].render(this.context);
            }
            else if (this.currentNode.getAttribute('value') === "remove") {
                for (var x = 0; x < objects.length; x++) {
                    if (objects[x].name === this.currentNode.nodeName) {
                        break;
                    }
                }
                objects.splice(x, 1);
            }
            this.initNode = true;
            this.nextNode();
        }
        playAnimation() {
            if (this.initNode) {
                this.anim = ANIM_CACHE[this.currentNode.nodeName];
                this.animate = new Animation(this.context);
                this.animate.queueAnimation(this.anim);
                this.animate.play();
                this.initNode = false;
            }
            else if (this.animate.finishPlaying) {
                this.initNode = true;
                this.nextNode();
            }
        }
        playBGM() {
            var bgm = MUSIC_CACHE[this.currentNode.nodeName];
            if (this.currentNode.getAttribute('value') === "on") {
                bgm.addEventListener('ended', function () {
                    this.currentTime = 0;
                    this.play();
                }, false);
                bgm.play();
            }
            else if (this.currentNode.getAttribute('value') === "off") {
                bgm.removeEventListener('ended', function () {
                    this.currentTime = 0;
                    this.play();
                }, false);
                bgm.pause();
                bgm.currentTime - 0;
            }
            this.initNode = true;
            this.nextNode();
        }
        editItem() {
            ITEM.add(this.currentNode.nodeName, this.currentNode.getAttribute('quantity'), this.currentNode.getAttribute('itemType'));
            this.initNode = true;
            this.nextNode();
        }
        nextState() {
            var id = this.currentNode.getAttribute('id');
            sManager.popState();
            switch (this.currentNode.nodeName) {
                case "explore":
                    sManager.pushState(new Explore(this.context, id));
                    break;
                case "battle":
                    this.context2.clearRect(0, 0, 800, 600);
                    sManager.pushState(new Battle(+id, this.mapID));
                    break;
                case "dialog":
                    sManager.pushState(new Cutscene(this.context2, +id, this.mapID));
                    break;
                default:
                    break;
            }
        }
    }
}