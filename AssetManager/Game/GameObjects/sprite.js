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
        function Sprite(img, x, y, w, h, scale) {
            _super.call(this, img, x, y, w, h, scale);
            this.Equipment = {
                "Head": null,
                "Body": null,
                "Hands": null,
                "Legs": null,
                "Accessory": null
            };
        }
        Sprite.prototype.setAttributes = function (id, hp, mp, atk, def, mdef, spd, luc, type) {
            this.ID = id;
            this.HP = hp || 1;
            this.MP = mp || 0;
            this.Atk = atk || 0;
            this.Def = def || 0;
            this.Spd = spd || 0;
            this.MDef = mdef || 0;
            this.Luc = luc || 0;
            this.Type = type || 0;
        };
        return Sprite;
    })(Game.GameObject);
    Game.Sprite = Sprite;
})(Game || (Game = {}));
