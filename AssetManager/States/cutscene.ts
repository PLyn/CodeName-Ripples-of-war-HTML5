///<reference path='State.ts' />
module Game {
    export class Cutscene extends State {
        dia;
        canvas;
        context;
        ctl;
        xmlID;

        node;
        lines = [];
        canvasWidth;
        ctx;
        linePos = 0;
        time = 0;
        currentTime = 0;
        prevName;
        lineHeight = 1;
        initNode = true;
        nCounter = 0;
        constructor(id, width, height, ctx, xmlID) {
            super();
            this.canvas = <HTMLCanvasElement> document.getElementById('layer2');
            this.context = this.canvas.getContext('2d');
            this.xmlID = xmlID;
            setStyle(this.context, 'Calibri', '16pt', 'white', 'bold', 'italic', 'left');
            this.canvasWidth = width;
        }
        init() {
            this.node = XML_CACHE['chapter'].getElementsByTagName('scene')[this.xmlID];
            //this.lines = wrap(this.context, this.canvasWidth, this.dialogueObject);
            //this.prevName = this.lines[this.linePos].name;
        }
        nextNode() {
            this.nCounter++;
            if (this.nCounter >= this.node.length) {
                sManager.popState();
            }
        }
        update() {
            this.currentTime = Date.now();
            if (mousedown()) {
                var node = this.node[this.nCounter];
                switch (node) {
                    case "Dialog":
                        if (this.initNode) {
                            this.lines = wrap(this.context, this.canvasWidth, node);
                            this.prevName = this.lines[this.linePos].name;
                            this.initNode = false;
                        }
                        if (this.linePos < this.lines.length && this.currentTime > this.time) {
                            this.time = this.currentTime + 750;
                            if (this.prevName !== this.lines[this.linePos].name) {
                                this.ctx.clearRect(0, 0, 800, 600);
                                this.prevName = this.lines[this.linePos].name;
                                this.lineHeight = 1;
                            }
                            else if (this.linePos >= 1) {
                                this.lineHeight += 25;
                            }
                            this.ctx.drawImage(IMAGE_CACHE['dialog'], 25, 350);
                            this.ctx.fillText(this.lines[this.linePos].message, 50, (425 + this.lineHeight));
                            this.ctx.fillText(this.lines[this.linePos].name, 30, 400);
                            this.linePos++;
                        }
                        else if (this.linePos >= this.lines.length && this.currentTime > this.time) {
                            this.initNode = true;
                            this.nextNode();
                        }
                        break;
                    case "SFX":
                        if (this.initNode) {
                            var sfx;
                            var soundKeys = Object.keys(SOUND_CACHE);
                            for (var i = 0; i < SOUND_CACHE.length; i++) {
                                if (node.nodeName === soundKeys[i]) {
                                    sfx = SOUND_CACHE[soundKeys[i]];
                                    sfx.play();
                                    break;
                                }
                            }
                        }
                        if (sfx.ended) {
                            this.initNode = true;
                            this.nextNode();
                        }
                        break;
                    case "Action":
                        break;
                    case "GFX":
                        if (this.initNode) {
                            var gfx;
                            var animKeys = Object.keys(ANIM_CACHE);
                            for (var i = 0; i < ANIM_CACHE.length; i++) {
                                if (node.nodeName === animKeys[i]) {
                                    gfx = ANIM_CACHE[animKeys[i]];
                                    
                                    break;
                                }
                            }
                        }
                        /*if (sfx.ended) {
                            this.initNode = true;
                            this.nextNode();
                        }*/
                        break;
                    default:
                        break;
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