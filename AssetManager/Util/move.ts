function moveSprite(context, x, y) {
    var dx = x * 64;
    var dy = y * 64;
    var cx = this.dx;
    var cy = this.dy;
    var im = new Image();
    im = this.img;
    context.clearRect(0, 0, 800, 600);
    context.drawImage(IMAGE_CACHE['D'], dx, dy);
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