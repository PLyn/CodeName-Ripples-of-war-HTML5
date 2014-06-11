function moveSprite(context, sx, sy, dx, dy) { //change to coordinates instead fo sprite to allow for npc to be oved with this function
    var x = dx * 32;
    var y = dy * 32;
    var easingAmount = 1;
    var im = new Image();
    im = this.img;
    var xDistance = x - sx;
    var yDistance = y - sy;
    var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

    if (distance > 1) {
        sx += xDistance * easingAmount;
        sy += yDistance * easingAmount;
    }
    return { "x": sx, "y": sy };
    //this.interval = setInterval(this.movefunc, 1000/10);
    /*var move = requestAnimationFrame(function () {
        context.clearRect(0, 0, 800, 600);
        cx = dx;
        cy = dy;
        context.drawImage(IMAGE_CACHE['D'], dx, dy);
        if (cx === dx && cy === dy) {
            cancelAnimationFrame(move);
        }
    });*/
}