var Game;
(function (Game) {
    var Dialogue = (function () {
        function Dialogue(ctx, cwidth) {
            var _this = this;
            this.lines = [];
            this.linePos = 0;
            this.time = 0;
            this.currentTime = 0;
            this.lineHeight = 1;
            this.startScene = function (key, tagName, index) {
                _this.dialogueObject = XML_CACHE[key].getElementsByTagName(tagName)[index];
                _this.lines = wrap(_this.ctx, _this.canvasWidth, _this.dialogueObject);
                _this.prevName = _this.lines[_this.linePos].name;
            };
            this.updateScene = function () {
                _this.currentTime = Date.now();
                if (_this.linePos < _this.lines.length && _this.currentTime > _this.time) {
                    _this.time = _this.currentTime + 750;
                    if (_this.prevName !== _this.lines[_this.linePos].name) {
                        _this.ctx.clearRect(0, 0, 800, 600);
                        _this.prevName = _this.lines[_this.linePos].name;
                        _this.lineHeight = 1;
                    } else if (_this.linePos >= 1) {
                        _this.lineHeight += 25;
                    }
                    _this.ctx.drawImage(IMAGE_CACHE['dialog'], 25, 350);
                    _this.ctx.fillText(_this.lines[_this.linePos].message, 50, (425 + _this.lineHeight));
                    _this.ctx.fillText(_this.lines[_this.linePos].name, 30, 400);
                    _this.linePos++;
                } else if (_this.linePos >= _this.lines.length && _this.currentTime > _this.time) {
                    _this.ctx.clearRect(0, 0, 800, 600);
                    sManager.popState();
                }
            };
            this.ctx = ctx;
            this.canvasWidth = cwidth;
            setStyle(this.ctx, 'Calibri', '16pt', 'white', 'bold', 'italic', 'left');
        }
        return Dialogue;
    })();
    Game.Dialogue = Dialogue;
})(Game || (Game = {}));
