var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Game;
(function (Game) {
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite() {
            _super.apply(this, arguments);
        }
        return Sprite;
    })(Game.GameObject);
    Game.Sprite = Sprite;
})(Game || (Game = {}));
//# sourceMappingURL=sprite.js.map
