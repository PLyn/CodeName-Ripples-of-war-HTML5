var Game;
(function (Game) {
    var State = (function () {
        function State() {
        }
        State.prototype.init = function () {
        };
        State.prototype.update = function () {
        };
        State.prototype.render = function () {
        };
        State.prototype.pause = function () {
        };
        State.prototype.resume = function () {
        };
        State.prototype.destroy = function () {
        };
        return State;
    })();
    Game.State = State;
})(Game || (Game = {}));
