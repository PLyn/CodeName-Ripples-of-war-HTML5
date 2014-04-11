var SCENE;
var EX;
var startScene;
var Game;
(function (Game) {
    var GenericArea = (function () {
        function GenericArea(ctx, w, loop) {
            this.prevState = 0;
            this.update = function () {
                sManager.updateStack();
            };
            this.x = 0;
            this.y = 0;
            this.mx = 0;
            this.my = 0;
            this.velocity = 2.0;
            GAME_OBJECTS.push(SPRITE_CACHE[0]);

            this.ctx = ctx;
            startScene = true;
        }
        GenericArea.prototype.render = function (context) {
        };
        GenericArea.prototype.endLevel = function (ctx) {
        };
        return GenericArea;
    })();
    Game.GenericArea = GenericArea;
})(Game || (Game = {}));
