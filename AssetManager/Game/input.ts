module Game {
    export class input {
        keys;
        click;
        canvas;
        mEvent;
        constructor(canvas) {
            //fairly complete for the tasks it need to do but might need some refining to the key functions to let it operate 
            //as accurately as i need. Not a high priority as it works but look at later on.
            this.keys = [];
            this.click = false;
            this.mEvent = null;
            var that = this;
            canvas.addEventListener('keydown', function (e) {
                e.stopPropagation();
                e.preventDefault();
                var letter = String.fromCharCode(e.keyCode);
                that.keys[letter] = true;
                console.log(letter);
            });
            canvas.addEventListener('keyup', function (e) {
                e.stopPropagation();
                e.preventDefault();
                var letter = String.fromCharCode(e.keyCode);
                that.keys[letter] = false;
            });
            canvas.addEventListener('mousedown', function (e) {
                e.stopPropagation();
                e.preventDefault();
                that.mEvent = e;
                that.click = true;
            });
            canvas.addEventListener('mouseup', function (e) {
                e.stopPropagation();
                e.preventDefault();
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
            console.log("clicked");
            return this.click;
        }
    }
}