/*
    word wrapping function that returns an array of text so that each index does not go beyond the GAME WIDTH
*/
function wrap(ctx, text) {
    var templine = "";
    var lines = [];
    var child = text.childNodes;

    if (ctx.measureText(text.textContent).width >= GAME_WIDTH) {
        var words = text.textContent.split(' ');
        for (var key = 0; key < words.length; key++) {
            var length = templine.length;
            var word = words[key];
            templine = templine + word + ' ';
            if (ctx.measureText(templine).width >= (GAME_WIDTH * 0.95)) {
                lines.push({ "name": text.nodeName, "message": templine.substring(0, length) });
                key--;
                templine = "";
            }

        }
        lines.push({ "name": text.nodeName, "message": templine });
    }
    else {
        lines.push({ "name": text.nodeName, "message": text.textContent });
    }

    return lines;
}
