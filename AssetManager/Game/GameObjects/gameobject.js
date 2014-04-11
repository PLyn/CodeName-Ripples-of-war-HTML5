var GAME_OBJECTS = [];
var Game;
(function (Game) {
    var GameObject = (function () {
        function GameObject(img, x, y, w, h, scale) {
            this.x = 0;
            this.y = 0;
            this.W = 0;
            this.H = 0;
            this.img = new Image();
            this.scale = 0;
            this.img = img;
            this.x = x || 0;
            this.y = y || 0;
            this.W = w;
            this.H = h;
            this.scale = scale || 1;
        }
        GameObject.prototype.update = function () {
        };
        GameObject.prototype.render = function (context, x, y) {
            context.drawImage(this.img, this.x, this.y);
        };
        return GameObject;
    })();
    Game.GameObject = GameObject;
})(Game || (Game = {}));
