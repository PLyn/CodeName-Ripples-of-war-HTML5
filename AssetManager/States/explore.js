var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Game;
(function (Game) {
    var Explore = (function (_super) {
        __extends(Explore, _super);
        function Explore(ctx, w, mapID, area, game) {
            _super.call(this);
            this.x = 0;
            this.y = 0;
            this.mx = 0;
            this.my = 0;
            this.velocity = 2.0;

            this.currentArea = area;
            this.mapID = mapID;
            var canvas = document.getElementById('layer2');
            this.layer2ctx = canvas.getContext('2d');

            var canvas2 = document.getElementById('layer1');
            this.layer1ctx = canvas2.getContext('2d');

            this.game = game;
            objects.push({
                "height": 50,
                "name": "menu",
                "properties": {},
                "type": "menu",
                "visible": true,
                "width": 50,
                "x": 5,
                "y": 5
            });
        }
        Explore.prototype.init = function () {
            this.layer1ctx.clearRect(0, 0, 800, 600);
            this.layer2ctx.clearRect(0, 0, 800, 600);
            tiles.setTileset(this.layer1ctx, this.mapID);
            this.layer2ctx.drawImage(IMAGE_CACHE['menu'], 5, 5);
            this.layer1ctx.drawImage(IMAGE_CACHE['hero'], 200, 250);
        };
        Explore.prototype.update = function () {
            if (mousedown()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var i = 0; i < objects.length; i++) {
                    var x1 = objects[i].x;
                    var x2 = objects[i].x + objects[i].width;
                    var y1 = objects[i].y;
                    var y2 = objects[i].y + objects[i].width;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (objects[i].type === 'exit') {
                            if (objects[i].properties.ID === '0') {
                                console.log("exit");
                                sManager.popState();
                                this.game.currentArea = new Game.Area1(this.layer1ctx, 800, this);
                            } else if (objects[i].properties.ID === '1') {
                                sManager.popState();
                                this.game.currentArea = new Game.Area2(this.layer1ctx, 800, this);
                            }
                        } else if (objects[i].type === 'cut') {
                            this.layer2ctx.clearRect(0, 0, 800, 600);
                            sManager.pushState(new Game.Cutscene("id", 800, 600, this.layer2ctx, objects[i].properties.ID));
                        } else if (objects[i].type === 'battle') {
                            sManager.pushState(new Game.Battle(this.layer1ctx, this.layer2ctx));
                        } else if (objects[i].type === 'menu') {
                            sManager.pushState(new Game.StatusMenu(this.layer2ctx));
                        }
                    }
                }
            }
        };
        Explore.prototype.render = function () {
        };
        Explore.prototype.pause = function () {
        };
        Explore.prototype.resume = function () {
        };
        Explore.prototype.destroy = function () {
        };
        return Explore;
    })(Game.State);
    Game.Explore = Explore;
})(Game || (Game = {}));
