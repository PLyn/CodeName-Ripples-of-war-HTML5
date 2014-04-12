var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Game;
(function (Game) {
    var StatusMenu = (function (_super) {
        __extends(StatusMenu, _super);
        function StatusMenu(ctx) {
            _super.call(this);
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.fillRect(0, 0, 650, 600);
            ctx.drawImage(IMAGE_CACHE['status'], 0, 100);
            ctx.drawImage(IMAGE_CACHE['back'], 50, 500);
        }
        StatusMenu.prototype.init = function () {
        };
        StatusMenu.prototype.update = function () {
            if (control.mousedown()) {
                this.mx = control.mEvent.pageX;
                this.my = control.mEvent.pageY;
                var x1 = 50;
                var x2 = 109;
                var y1 = 500;
                var y2 = 550;
                if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                    sManager.popState();
                }
            }
        };
        StatusMenu.prototype.render = function () {
        };
        StatusMenu.prototype.pause = function () {
        };
        StatusMenu.prototype.resume = function () {
        };
        StatusMenu.prototype.destroy = function () {
        };
        return StatusMenu;
    })(Game.State);
    Game.StatusMenu = StatusMenu;
})(Game || (Game = {}));
