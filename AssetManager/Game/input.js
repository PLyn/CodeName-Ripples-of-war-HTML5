var that = this;
var keys = [];
var click = false;
var canvas;
var mEvent = null;

document.addEventListener('mousedown', function (e) {
    e.stopPropagation();
    e.preventDefault();
    that.mEvent = e;
    that.click = true;
});
document.addEventListener('mouseup', function (e) {
    e.stopPropagation();
    e.preventDefault();
    that.click = false;
});

function mousedown() {
    return click;
}
