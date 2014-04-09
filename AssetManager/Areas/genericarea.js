var Game;
(function (Game) {
    var GenericArea = (function () {
        function GenericArea() {
            this.x = 0;
            this.y = 0;
            this.velocity = 2.0;
            GAME_OBJECTS.push(SPRITE_CACHE[0]);
        }
        GenericArea.prototype.update = function () {
            if (control.keydown('W')) {
                this.y -= this.velocity;
            } else if (control.keydown('D')) {
                this.x += this.velocity;
            } else if (control.keydown('A')) {
                this.x -= this.velocity;
            } else if (control.keydown('S')) {
                this.y += this.velocity;
            }
        };
        GenericArea.prototype.render = function (context) {
            context.clearRect(0, 0, 800, 600);
            tiles.drawTiles(context, 'rpg');
            GAME_OBJECTS[0].render(context, this.x, this.y);
        };
        return GenericArea;
    })();
    Game.GenericArea = GenericArea;
})(Game || (Game = {}));
//# sourceMappingURL=genericarea.js.map
