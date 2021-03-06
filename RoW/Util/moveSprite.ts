﻿/*
    returns new coordinates to move sprite from one position to another
*/
function moveSprite(context, sx, sy, dx, dy) { 
    var x = dx * 64;
    var y = dy * 64;
    var xDistance = x - sx;
    var yDistance = y - sy;
    var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

    if (distance > 1) {
        sx += xDistance;
        sy += yDistance;
    }
    return { "x": sx, "y": sy };
}