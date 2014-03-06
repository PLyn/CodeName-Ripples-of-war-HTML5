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
        canvas;
        constructor(ctx, cwidth) {
            this.ctx = ctx;
            this.canvasWidth = cwidth;
            this.setStyle('Calibri', '16pt', 'blue', 'bold', 'italic', 'left');
        }
        startScene = (key, tagName, index) => {
            this.dialogueObject = XML_CACHE[key].getElementsByTagName(tagName)[index];
            this.lines = wrap(this.ctx, this.canvasWidth, this.dialogueObject);
            this.prevName = this.lines[0].name;
            for (var i = 0; i < this.lines.length; i++) {
                console.log(this.lines[i].message);
            }
        }
        updateScene = () => {
            this.currentTime = Date.now();
            if (this.linePos < this.lines.length && this.currentTime > this.time) {
                this.time = this.currentTime + 1000;
                console.log("prev" + this.prevName);
                console.log("new:" + this.lines[this.linePos].name); 
                if (this.prevName === this.lines[this.linePos].name) {
                    this.ctx.fillText(this.lines[this.linePos].message, 150, (300 + ((this.linePos + 1) * 25)));
                    this.ctx.fillText(this.lines[this.linePos].name, 50, 250);
                    this.linePos++;
                }
                else if (this.prevName !== this.lines[this.linePos].name) {
                    this.ctx.clearRect(0, 0, 800, 600);
                    this.ctx.fillText(this.lines[this.linePos].message, 150, (300 + ((this.linePos + 1) * 25)));
                    this.ctx.fillText(this.lines[this.linePos].name, 50, 250);
                    this.prevName = this.lines[this.linePos].name;
                    this.linePos++;
                }   
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
