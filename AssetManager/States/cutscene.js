var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Game;
(function (Game) {
    var Cutscene = (function (_super) {
        __extends(Cutscene, _super);
        function Cutscene(id, width, height, ctx, xmlID) {
            _super.call(this);
            this.canvas = document.getElementById('layer2');
            this.context = this.canvas.getContext('2d');
            this.xmlID = xmlID;
            this.dia = new Game.Dialogue(this.context, width);
        }
        Cutscene.prototype.init = function () {
            this.dia.startScene('chapter', 'scene', this.xmlID);
        };

        Cutscene.prototype.update = function () {
            if (mousedown()) {
                this.dia.updateScene();
            }
        };
        Cutscene.prototype.render = function () {
        };
        Cutscene.prototype.pause = function () {
        };
        Cutscene.prototype.resume = function () {
        };
        Cutscene.prototype.destroy = function () {
        };
        return Cutscene;
    })(Game.State);
    Game.Cutscene = Cutscene;
})(Game || (Game = {}));
