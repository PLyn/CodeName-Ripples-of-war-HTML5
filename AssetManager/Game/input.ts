module Game {
    export class input {
        keys;
        click;
        canvas;
        mEvent;
        constructor(canvas) {
            this.keys = [];
            this.click = false;
            this.mEvent = null;
            var that = this;
            document.addEventListener('keydown', function (e) {
                var letter = String.fromCharCode(e.keyCode);
                that.keys[letter] = true;
                console.log(letter);
            });
            document.addEventListener('keyup', function (e) {
                var letter = String.fromCharCode(e.keyCode);
                that.keys[letter] = false;
            });
            document.addEventListener('mousedown', function (e) {
                that.mEvent = e;
                that.click = true;
            });
            document.addEventListener('mouseup', function (e) {
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