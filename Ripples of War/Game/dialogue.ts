module Game {
    export class Dialogue {
        dialogueObject;
        lines = [];
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
            setStyle(this.ctx, 'Calibri', '16pt', 'white', 'bold', 'italic', 'left');
        }
        startScene = (key, tagName, index) => {
            this.dialogueObject = XML_CACHE[key].getElementsByTagName(tagName)[index];
            this.lines = wrap(this.ctx, this.dialogueObject);
            this.prevName = this.lines[this.linePos].name;
            /*this.ctx.fillText(this.lines[this.linePos].message, 150, (300 + this.lineHeight));
            this.ctx.fillText(this.lines[this.linePos].name, 50, 250);
            this.linePos++;*/
        }
        updateScene = () => {
            this.currentTime = Date.now();
            if (this.linePos < this.lines.length && this.currentTime > this.time) {
                this.time = this.currentTime + 750;
                if (this.prevName !== this.lines[this.linePos].name) {
                    this.ctx.clearRect(0, 0, 800, 600);
                    this.prevName = this.lines[this.linePos].name;
                    this.lineHeight = 1;
                }
                else if(this.linePos >= 1) {
                    this.lineHeight += 25;
                }
                this.ctx.drawImage(IMAGE_CACHE['dialog'], 25, 350);
                this.ctx.fillText(this.lines[this.linePos].message, 50, (425  + this.lineHeight));
                this.ctx.fillText(this.lines[this.linePos].name, 30, 400);
                this.linePos++;
            }
            else if (this.linePos >= this.lines.length && this.currentTime > this.time) {
                //this.area.endLevel();
                this.ctx.clearRect(0, 0, 800, 600);
                sManager.popState();
            }
        }
        
    }
}
