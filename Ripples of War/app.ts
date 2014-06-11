
window.onload = function () {
    var game = new Game.Init();
}

//deal with this function later to do proper coordinates for mouse position in canvas, not as important
//atm due to the fact that the entire game is on a empty page so the coordinates work so far but if there are
//more headers and divs or spans, the coordinates could become very inaccurate and have weird effects
//so keep this around for future reference when i need to tackle this issue
/*
function relMouseCoords(event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement === currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return { x: canvasX, y: canvasY }
}
*/