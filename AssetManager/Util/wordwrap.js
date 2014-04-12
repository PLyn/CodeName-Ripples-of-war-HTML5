function wrap(ctx, cwidth, text) {
    var templine = "";
    var lines = [];
    var child = text.childNodes;

    for (var i = 0; i < text.childNodes.length; i++) {
        if (child[i].nodeType === 1) {
            if (ctx.measureText(child[i].textContent).width >= cwidth) {
                var words = child[i].textContent.split(' ');
                for (var key = 0; key < words.length; key++) {
                    var length = templine.length;
                    var word = words[key];
                    templine = templine + word + ' ';
                    if (ctx.measureText(templine).width >= (cwidth * 0.85)) {
                        lines.push({ "name": child[i].nodeName, "message": templine.substring(0, length) });
                        key--;
                        templine = "";
                    } else if (ctx.measureText(templine).width >= (cwidth * 0.70)) {
                        lines.push({ "name": child[i].nodeName, "message": templine });
                        templine = "";
                    }
                }
                lines.push({ "name": child[i].nodeName, "message": templine });
            } else {
                lines.push({ "name": child[i].nodeName, "message": child[i].textContent });
            }
        }
    }
    return lines;
}
