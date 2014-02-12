module Game {
    export class input {
        keys;
        click;
        canvas;
        constructor(canvas) {
            this.keys = [];
            this.click = false;
            var that = this;
            document.addEventListener('keydown', function (e) {
                console.log(e.keyCode);
                that.keys[e.keyCode] = true;
            });
            document.addEventListener('keyup', function (e) {
                console.log(e.keyCode + " up");
                that.keys[e.keyCode] = false;
            });
            document.addEventListener('mousedown', function (e) {
                console.log("clicked");
                that.click = true;
            });
            document.addEventListener('mouseup', function (e) {
                console.log("unclicked");
                that.click = false;
            });
        }
        keydown(key) {
            return this.keys[key];
        }
        keyup(key) {
            return !this.keys[key];
        }
        mousedown() {
            return this.click;
        }
    }
}