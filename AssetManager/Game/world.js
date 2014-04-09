var control;
var tiles;
var Game;
(function (Game) {
    var Loop = (function () {
        function Loop(canvasid, width, height, preloader) {
            var _this = this;
            this.render = function () {
                _this.currentArea.render(_this.context);
            };
            this.canvas = document.createElement('canvas');
            this.canvas.id = canvasid;
            this.canvas.width = width;
            this.canvas.height = height;
            this.canvas.tabindex = '1';
            document.body.appendChild(this.canvas);
            this.asset = preloader;
            this.canvas = document.getElementById(canvasid);
            this.context = this.canvas.getContext('2d');
            control = new Game.input(this.canvas);
            tiles = new Game.Tilemap();
            tiles.Init();
            this.currentArea = new Game.GenericArea();
        }
        Loop.prototype.update = function () {
            this.currentArea.update();
        };
        return Loop;
    })();
    Game.Loop = Loop;
})(Game || (Game = {}));
//# sourceMappingURL=world.js.map
