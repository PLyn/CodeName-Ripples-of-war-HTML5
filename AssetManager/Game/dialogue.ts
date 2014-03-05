module Game {
    export class Dialogue {
        dialogueObject;
        lines;
        canvasWidth;
        ctx;
        linePos = 0;
        seconds;
        time = 0;
        currentTime = 0;
        constructor(ctx, cwidth) {
            this.ctx = ctx;
            this.canvasWidth = cwidth;
            this.setStyle('Calibri', '16pt', 'blue', 'bold', 'italic', 'left');
            this.seconds = new Date();
        }
        startScene = (key, tagName, index) => {
            this.dialogueObject = XML_CACHE[key].getElementsByTagName(tagName)[index];
            this.lines = wrap(this.ctx, this.canvasWidth, this.dialogueObject);
        }
        updateScene = () => {
            this.time = Date.now();
            console.log(this.time);
            if (this.linePos < this.lines.length && this.time > this.currentTime) {
                
                this.currentTime = this.time + 1000;
                this.ctx.fillText(this.lines[this.linePos], 150, (300 + ((this.linePos + 1) * 25)));
                this.linePos++;
                console.log(this.linePos);
            }
        }
        setStyle(font, size, color, bold?, italic?, align?) {
            var bolded = bold || '';
            var ital = italic || '';// blue bold italic
            this.ctx.font = bolded + ' ' + ital + ' ' + size + ' ' + font;
            this.ctx.fillStyle = color;
            this.ctx.textAlign = align;
        }
    }
}
