var that = this;
var mousedown = false;
var mEvent = null;
/*
    adds event listener for anytime the mouse button is down
*/
document.addEventListener('mousedown', function (e) {
    e.stopPropagation();
    e.preventDefault();
    that.mEvent = e;
    that.mousedown = true;
});
/*
    adds event listener for anytime the mouse button is up
*/
document.addEventListener('mouseup', function (e) {
    e.stopPropagation();
    e.preventDefault();
    that.mousedown = false;
});
/*
    if mouse button is down then return true to signify that the user has clicked
*/
function mouseClicked() {
    if (mousedown) {
        mousedown = false;
        return true;
    }
    else {
        return false;
    }
}