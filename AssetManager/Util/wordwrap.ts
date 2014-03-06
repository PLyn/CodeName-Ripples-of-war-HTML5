function wrap(ctx, cwidth, text) {
    var templine = "";
    var lines = [];
    var child = text.childNodes;
    for (var i = 0; i < text.childNodes.length; i++) {
        if (child[i].nodeType === 1) { //gets only the element nodes
            if (ctx.measureText(child[i].textContent).width >= cwidth) {
                for (var key = 0; key < child[i].textContent.length; key++) {
                    var letter = child[i].textContent.substring(key, key + 1);
                    templine = templine + letter;
                    if (ctx.measureText(templine).width >= cwidth) {
                        lines.push({ "name": child[i].nodeName, "message": templine });
                        templine = "";
                    }
                }
                lines.push({ "name": child[i].nodeName, "message": templine });
            }
            else {
                lines.push({ "name": child[i].nodeName, "message": child[i].textContent });
            }
        }
    }
    return lines; 
}
