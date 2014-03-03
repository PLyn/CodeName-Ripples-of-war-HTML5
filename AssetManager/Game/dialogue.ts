module Game {
    export class Dialogue {
        dialogueObject;
        lines;
        canvasWidth;
        constructor(ctx, cwidth, xmlKey, index) {
            var object = XML_CACHE[xmlKey].getElementsByTagName("scene")[index];
            this.dialogueObject = object;
            this.canvasWidth = cwidth;
            this.lines = wrap(ctx, this.canvasWidth, this.dialogueObject);
        }
        display = (context) => {
            context.fillStyle = 'blue';
            for (var i = 0; i < this.lines.length; i++) {
                context.fillText(this.lines[i].textContent, 300, (300 + ((i + 1) * 25)));
            }

        }
    }
}
