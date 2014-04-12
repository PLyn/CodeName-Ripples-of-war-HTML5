var Game;
(function (Game) {
    var Area1 = (function () {
        function Area1(ctx, w, loop) {
            this.update = function () {
                sManager.updateStack();
            };
            sManager.pushState(new Game.Explore(ctx, w, 'rpg', this, loop));
        }
        return Area1;
    })();
    Game.Area1 = Area1;
})(Game || (Game = {}));
