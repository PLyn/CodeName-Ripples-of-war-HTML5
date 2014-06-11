function input_template(len, bounds, f) {
    var mx = mEvent.pageX;
    var my = mEvent.pageY;
    for (var i = 0; i < len; i++) {
        var x1 = bounds[i].x;
        var x2 = bounds[i].x + bounds[i].w;
        var y1 = bounds[i].y;
        var y2 = bounds[i].y + bounds[i].h;
        if ((x1 <= mx && mx <= x2) && (y1 <= my && my <= y2)) {
            f(i);
        }
    }
}