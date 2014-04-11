var control;
var tiles;
var Game;
(function (Game) {
    var Loop = (function () {
        function Loop() {
            this.render = function () {
            };
            this.canvas = document.getElementById('layer1');
            this.context = this.canvas.getContext('2d');
            this.canvas2 = document.getElementById('layer2');
            this.context2 = this.canvas.getContext('2d');

            tiles = new Game.Tilemap();
            tiles.Init();
            this.width = 800;
            this.currentArea = new Game.Area1(this.context, this.width, this);
        }
        Loop.prototype.update = function () {
            this.currentArea.update();
        };

        Loop.prototype.playerInput = function () {
        };
        return Loop;
    })();
    Game.Loop = Loop;
})(Game || (Game = {}));
