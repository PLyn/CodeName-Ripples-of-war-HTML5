module Game {
    export class Dialogue {
        dialogueObject;
        lines = [];
        canvasWidth;
        ctx;
        linePos = 0;
        time = 0;
        currentTime = 0;
        prevName;
        lineHeight = 1;
        //only major issue or feature i can think of left for this module is the text appearing as time goes on
        //like i did in the phaser dialogue module, should be relatively easy to implement with the logic from
        //the phaser project
        //There is also the creation of a new canvas for the dialog to appear on but that will be taken
        //care of in the state system since the canvas should probably be created there
        constructor(ctx, cwidth) {
            this.ctx = ctx;
            this.canvasWidth = cwidth;
            this.setStyle('Calibri', '16pt', 'blue', 'bold', 'italic', 'left');
        }
        startScene = (key, tagName, index) => {
            this.dialogueObject = XML_CACHE[key].getElementsByTagName(tagName)[index];
            this.lines = wrap(this.ctx, this.canvasWidth, this.dialogueObject);
            this.prevName = this.lines[this.linePos].name;
            this.ctx.fillText(this.lines[this.linePos].message, 150, (300 + this.lineHeight));
            this.ctx.fillText(this.lines[this.linePos].name, 50, 250);
            this.linePos++;
        }
        updateScene = () => {
            this.currentTime = Date.now();
            if (this.linePos < this.lines.length && this.currentTime > this.time) {
                this.time = this.currentTime + 1000;
                if (this.prevName !== this.lines[this.linePos].name) {
                    this.ctx.clearRect(0, 0, 800, 600);
                    this.prevName = this.lines[this.linePos].name;
                    this.lineHeight = 1;
                }
                else {
                    this.lineHeight += 25;
                }
                this.ctx.fillText(this.lines[this.linePos].message, 150, (300 + this.lineHeight));
                this.ctx.fillText(this.lines[this.linePos].name, 50, 250);
                this.linePos++;
            }
            else if (this.linePos >= this.lines.length) {
                //this.area.endLevel();
                this.ctx.clearRect(0, 0, 800, 600);
                sManager.popState();
            }
        }
        setStyle(font, size, color, bold?, italic?, align?) {
            var bolded = bold || '';
            var ital = italic || '';
            this.ctx.font = bolded + ' ' + ital + ' ' + size + ' ' + font;
            this.ctx.fillStyle = color;
            this.ctx.textAlign = align;
        }
    }
}
