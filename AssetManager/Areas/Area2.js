var Game;
(function (Game) {
    var Area2 = (function () {
        function Area2(ctx, w, loop) {
            this.update = function () {
                sManager.updateStack();
            };
            sManager.pushState(new Game.Explore(ctx, w, 'carpet', this, loop));
        }
        return Area2;
    })();
    Game.Area2 = Area2;
})(Game || (Game = {}));
