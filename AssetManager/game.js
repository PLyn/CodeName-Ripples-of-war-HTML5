var pos = 0;
var audioElement = new Audio();

var Game;
(function (Game) {
    var Init = (function () {
        function Init() {
            var _this = this;
            this.onComplete = function () {
                _this.loop = new Game.Loop('canvas', 800, 600, _this.preloader);
                setInterval(_this.GameLoop, 1000 / 30);
            };
            this.GameLoop = function () {
                _this.loop.update();
                _this.loop.render();
            };
            var source = {
                Images: {
                    D: 'Assets/diamond.png',
                    S: 'Assets/star.png'
                },
                Anim: {
                    at: 'Assets/test.json'
                },
                Sprite: {
                    spr: 'Assets/test.json'
                },
                Tileset: {
                    rpg: 'Assets/map.json'
                },
                XML: {
                    chapter: 'Assets/test.xml'
                },
                Sounds: {
                    car: 'Assets/Sounds/car',
                    punch: 'Assets/Sounds/punch',
                    wood: 'Assets/Sounds/wood'
                },
                Music: {
                    theme: 'Assets/Music/theme'
                }
            };
            this.preloader = new Game.Preloader();
            this.preloader.queueAssets(source, this.onComplete);
        }
        return Init;
    })();
    Game.Init = Init;
})(Game || (Game = {}));
//# sourceMappingURL=game.js.map
