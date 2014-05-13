///<reference path='State.ts' />
module Game {
    export class Cutscene extends State {
        dia;
        canvas;
        context;
        ctl;
        xmlID;

        node;
        currentNode;
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
        nodeCount = 0;
        textNodes = [];
        sfx;
        anim;
        animate;
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
            var count = 0;
            for (var x = 0; x < this.node.childNodes.length; x++) {
                if (this.node.childNodes[x].nodeType === 1) {
                    this.textNodes[count] = this.node.childNodes[x];
                    count++;
                    this.nodeCount++;
                }
            }
            this.currentNode = this.textNodes[this.nCounter];
            //this.lines = wrap(this.context, this.canvasWidth, this.dialogueObject);
            //this.prevName = this.lines[this.linePos].name;
        }
        nextNode() {
            this.nCounter++;
            this.currentNode = this.textNodes[this.nCounter];
            if (this.nCounter >= this.nodeCount) {
                sManager.popState();
            }
        }
        update() {
            this.currentTime = Date.now();
            switch (this.currentNode.getAttribute('type')) {
                case "Dialog":
                    if (this.initNode) {
                        this.lines = wrap(this.context, this.canvasWidth, this.currentNode);
                        this.prevName = this.lines[this.linePos].name;
                        this.initNode = false;
                        this.context.drawImage(IMAGE_CACHE['dialog'], 25, 350);

                        this.time = this.currentTime + 750;
                        if (this.prevName !== this.lines[this.linePos].name) {
                            this.context.clearRect(0, 0, 800, 600);
                            this.prevName = this.lines[this.linePos].name;
                            this.lineHeight = 1;
                            this.context.drawImage(IMAGE_CACHE['dialog'], 25, 350);
                        }
                        else if (this.linePos >= 1) {
                            this.lineHeight += 25;
                        }
                        this.context.fillText(this.lines[this.linePos].message, 50, (425 + this.lineHeight));
                        this.context.fillText(this.lines[this.linePos].name, 30, 400);
                        this.linePos++;
                    }
                    if (this.linePos < this.lines.length && this.currentTime > this.time && mousedown()) {
                        this.time = this.currentTime + 750;
                        if (this.prevName !== this.lines[this.linePos].name) {
                            this.context.clearRect(0, 0, 800, 600);
                            this.prevName = this.lines[this.linePos].name;
                            this.lineHeight = 1;
                            this.context.drawImage(IMAGE_CACHE['dialog'], 25, 350);
                        }
                        else if (this.linePos >= 1) {
                            this.lineHeight += 25;
                        }
                        this.context.fillText(this.lines[this.linePos].message, 50, (425 + this.lineHeight));
                        this.context.fillText(this.lines[this.linePos].name, 30, 400);
                        this.linePos++;
                    }
                    else if (this.linePos >= this.lines.length && this.currentTime > this.time && mousedown()) {
                        this.initNode = true;
                        this.nextNode();
                    }
                    break;
                case "Sfx":
                    if (this.initNode) {
                        this.sfx = SOUND_CACHE[this.currentNode.nodeName];
                        this.sfx.play();
                        this.initNode = false;
                    }
                    else if (this.sfx.ended) {

                        this.initNode = true;
                        this.nextNode();
                    }
                    break;
                case "Action":
                    break;
                case "anim":
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
                    break;
                case "bgm":
                    break;
                default:
                    break;
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