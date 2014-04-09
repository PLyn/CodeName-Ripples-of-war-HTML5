var Game;
(function (Game) {
    var input = (function () {
        function input(canvas) {
            this.keys = [];
            this.click = false;
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
                that.click = true;
            });
            document.addEventListener('mouseup', function (e) {
                that.click = false;
            });
        }
        input.prototype.keydown = function (key) {
            return this.keys[key];
        };
        input.prototype.keyup = function (key) {
            return !this.keys[key];
        };
        input.prototype.mousedown = function () {
            return this.click;
        };
        return input;
    })();
    Game.input = input;
})(Game || (Game = {}));
//# sourceMappingURL=input.js.map
