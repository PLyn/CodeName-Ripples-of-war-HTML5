function input_template(len, bounds, f) {
    var mx = mEvent.pageX;
    var my = mEvent.pageY;
    for (var i = 0; i < len; i++) {
        var x1 = bounds.x;
        var x2 = bounds.x + bounds.w;
        var y1 = bounds.y;
        var y2 = bounds.y + bounds.h;
        if ((x1 <= mx && mx <= x2) && (y1 <= my && my <= y2)) {
            f(i);
        }
    }
}