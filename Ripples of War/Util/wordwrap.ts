function wrap(ctx, text) {
    var templine = "";
    var lines = [];
    var child = text.childNodes;
    //figure out if the arbitrary numbers used will affect other resolutions negatively 
    //mostly feature complete apart from adding more tags to the xml to grab them here to be used in
    //areas such as bg img or sounds to be called
    /*for (var i = 0; i < text.childNodes.length; i++) {
        if (child[i].nodeType === 1) { //gets only the element nodes*/
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
                    /*else if (ctx.measureText(templine).width >= (GAME_WIDTH * 0.70)) {
                        lines.push({ "name": text.nodeName, "message": templine });
                        templine = "";
                    }*/
                }
                lines.push({ "name": text.nodeName, "message": templine });
            }
            else {
                lines.push({ "name": text.nodeName, "message": text.textContent });
            }
        //}
    //}
    return lines; 
}
