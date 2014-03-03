function wrap(ctx, cwidth, text) {
    var extra = "";
    var position = 0;
    /*get length of context then measue length of dailogue to break it up in suitable chunks to display on the screen*/
    var width = cwidth * 0.9;
    var lines = [];
    var x = 0;
    //text.substring(position, width);
    //figure out a way to get it to repeat till the dialogue is empty
    var child = text.childNodes;
    for (var i = 0; i < text.childNodes.length; i++) {
        if (child[i].nodeType === 1) { //gets only the element nodes
            lines[x] = child[i];
            x++;
        }
         /*if (ctx.measureText(child[i]) >= cwidth) {
            while (ctx.measureText(lines) >= cwidth) {
                var letter = child[i].substring(child[i].length - 1, child[i].length)
                lines = child[i].slice(0, -1);
                extra = letter + extra;
            }
        }*/
    }
    return lines; 

    /*
    //STOLEN CODE START HERE :D
    var result = '';
    var lines = text.split('\n');
    for (var i = 0; i < lines.length; i++) {
        var spaceLeft = this.style.wordWrapWidth;
        var words = lines[i].split(' ');
        for (var j = 0; j < words.length; j++) {
            var wordWidth = this.context.measureText(words[j]).width;
            var wordWidthWithSpace = wordWidth + this.context.measureText(' ').width;
            if (wordWidthWithSpace > spaceLeft) {
                // Skip printing the newline if it's the first word of the line that is
                // greater than the word wrap width.
                if (j > 0) {
                    result += '\n';
                }
                result += words[j] + ' ';
                spaceLeft = this.style.wordWrapWidth - wordWidth;
            }
            else {
                spaceLeft -= wordWidthWithSpace;
                result += words[j] + ' ';
            }
        }

        if (i < lines.length - 1) {
            result += '\n';
        }
    }
    return result;
    //STOLEN CODE END HERE :(
*/
}
