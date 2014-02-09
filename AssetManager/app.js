var imagex = 0;
var imagey = 250;

window.onload = function () {
    var game = new Game.Game();
};
var Engine;
(function (Engine) {
    var Loop = (function () {
        function Loop(canvasid, width, height, preloader) {
            var _this = this;
            this.render = function () {
                _this.asset.drawTiles(_this.context);
                GAME_OBJECTS[pos] = SPRITE_CACHE[pos];
                GAME_OBJECTS[pos].render(_this.context, imagex, imagey);

                ANIM_CACHE['at'][pos].render(_this.context, 200, 150);

                pos = (pos + 1) % ANIM_CACHE['at'].length;
            };
            this.canvas = document.createElement('canvas');
            this.canvas.id = canvasid;
            this.canvas.width = width;
            this.canvas.height = height;
            document.body.appendChild(this.canvas);
            this.asset = preloader;
            this.canvas = document.getElementById(canvasid);
            this.context = this.canvas.getContext('2d');
        }
        Loop.prototype.update = function () {
            imagex += 50;
            if (pos === 0) {
                this.context.clearRect(0, 0, 800, 600);
                imagex = 0;
            }
        };
        return Loop;
    })();
    Engine.Loop = Loop;
})(Engine || (Engine = {}));
var GAME_OBJECTS = [];
var Engine;
(function (Engine) {
    var GameObject = (function () {
        function GameObject(img, x, y, w, h, scale) {
            this.x = 0;
            this.y = 0;
            this.W = 0;
            this.H = 0;
            this.img = new Image();
            this.scale = 0;
            this.img = img;
            this.x = x || 0;
            this.y = y || 0;
            this.W = w;
            this.H = h;
            this.scale = scale || 1;
        }
        GameObject.prototype.update = function () {
        };
        GameObject.prototype.render = function (context, x, y) {
            context.drawImage(this.img, this.x, this.y, this.W, this.H, x, y, this.W * this.scale, this.H * this.scale);
        };
        return GameObject;
    })();
    Engine.GameObject = GameObject;
})(Engine || (Engine = {}));
var pos = 0;
var Game;
(function (_Game) {
    var Game = (function () {
        function Game() {
            var _this = this;
            this.onComplete = function () {
                setInterval(_this.GameLoop, 1000 / 10);
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
                }
            };
            this.preloader = new Engine.Preloader();
            this.preloader.queueAssets(source, this.onComplete);
            this.loop = new Engine.Loop('canvas', 800, 600, this.preloader);
        }
        return Game;
    })();
    _Game.Game = Game;
})(Game || (Game = {}));
var input;
(function (_input) {
    var input = (function () {
        function input(context) {
            context.onkeydown = function (e) {
                this.keys[e.keycode] = true;
            };
            context.onkeyup = function (e) {
                this.keys[e.keycode] = false;
            };
        }
        input.prototype.keydown = function (key) {
            return this.keys[key];
        };
        input.prototype.keyup = function (key) {
            return !this.keys[key];
        };
        return input;
    })();
    _input.input = input;
})(input || (input = {}));
var ANIM_CACHE = [];
var IMAGE_CACHE = [];
var SPRITE_CACHE = [];
var TILESET_CACHE = [];
var XML_CACHE = [];

var Engine;
(function (Engine) {
    var Preloader = (function () {
        function Preloader() {
            var _this = this;
            this.animSource = new Image();
            this.animkey = [];
            this.animPos = 0;
            this.height = 0;
            this.isError = 0;
            this.isLoaded = 0;
            this.numTilesX = 0;
            this.numTilesY = 0;
            this.pixelSizeX = 0;
            this.pixelSizeY = 0;
            this.scale = 0;
            this.sprite = new Image();
            this.spritekey = [];
            this.spritePos = 0;
            this.spriteSource = new Image();
            this.isFilesLoaded = false;
            this.tilesetPos = 0;
            this.tileSizeX = 0;
            this.tileSizeY = 0;
            this.totalAssets = 0;
            this.width = 0;
            this.x = 0;
            this.y = 0;
            this.onAnimJSONLoad = function (key, response) {
                var holder = [];
                var frame;
                _this.animData = JSON.parse(response);

                _this.animSource.onload = function () {
                    _this.isLoaded++;
                };
                _this.animSource.src = 'Assets/' + _this.animData.meta.image;
                for (var i = 0; i < _this.animData.frames.length; i++) {
                    frame = _this.animData.frames[i].frame;
                    holder[i] = new Engine.GameObject(_this.spriteSource, frame.x, frame.y, frame.w, frame.h);
                }
                ANIM_CACHE[key[_this.animPos]] = holder;
                _this.animPos++;
            };
            this.onSpriteJSONLoad = function (key, response) {
                var holder = [];

                _this.spriteData = JSON.parse(response);
                _this.spriteSource.onload = function () {
                    _this.isLoaded++;
                };
                _this.spriteSource.src = 'Assets/' + _this.spriteData.meta.image;
                for (var i = 0; i < _this.spriteData.frames.length; i++) {
                    var frame = _this.spriteData.frames[i].frame;

                    var indexes = _this.spriteData.frames[i].filename.substring(0, _this.spriteData.frames[i].filename.length - 4);
                    holder[i] = new Engine.GameObject(_this.spriteSource, frame.x, frame.y, frame.w, frame.h);
                    SPRITE_CACHE[i] = holder[i];
                }
                _this.spritePos++;
            };
            this.onTileJSONLoad = function (key, response) {
                _this.tiledData = JSON.parse(response);
                _this.numTilesX = _this.tiledData.width;
                _this.numTilesY = _this.tiledData.height;
                _this.tileSizeX = _this.tiledData.tilewidth;
                _this.tileSizeY = _this.tiledData.tileheight;
                _this.pixelSizeX = _this.numTilesX * _this.tileSizeX;
                _this.pixelSizeY = _this.numTilesY * _this.tileSizeY;

                var tiledata = _this.tiledData.tilesets;
                for (var i = 0; i < tiledata.length; i++) {
                    var tilesetimage = new Image();
                    tilesetimage.onload = function () {
                        _this.isLoaded++;
                    };
                    tilesetimage.src = "../Assets/" + _this.tiledData.tilesets[i].image.replace(/^.*[\\\/]/, '');
                    var tileData = {
                        "firstgid": tiledata[i].firstgid,
                        "image": tilesetimage,
                        "imageheight": tiledata[i].imageheight,
                        "imagewidth": tiledata[i].imagewidth,
                        "name": tiledata[i].name,
                        "numXTiles": Math.floor(tiledata[i].imagewidth / _this.tileSizeX),
                        "numYTiles": Math.floor(tiledata[i].imageheight / _this.tileSizeY)
                    };
                    TILESET_CACHE[key[_this.tilesetPos]] = tileData;
                    _this.tilesetPos++;
                    _this.tileKey = key;
                }
            };
            this.onXMLLoad = function (key, response) {
                var test = response;
                var xmltest = test.getElementsByTagName("Shadow");
                _this.isLoaded++;
            };
            this.progress = function () {
            };
            this.getTile = function (tileIndex) {
                var tile = {
                    "img": null,
                    "px": 0,
                    "py": 0
                };

                var index = 0;
                for (index = 0; index < _this.tileKey.length; index--) {
                    if (TILESET_CACHE[_this.tileKey[index]].firstgid <= tileIndex)
                        break;
                }
                tile.img = TILESET_CACHE[_this.tileKey[index]].image;
                var localIndex = tileIndex - TILESET_CACHE[_this.tileKey[index]].firstgid;
                var localtileX = Math.floor(localIndex % TILESET_CACHE[_this.tileKey[index]].numXTiles);
                var localtileY = Math.floor(localIndex / TILESET_CACHE[_this.tileKey[index]].numXTiles);
                tile.px = localtileX * _this.tiledData.tilewidth;
                tile.py = localtileY * _this.tiledData.tileheight;

                return tile;
            };
            this.drawTiles = function (context) {
                if (!_this.isFilesLoaded) {
                    console.log("tileset not loaded");
                    return;
                }

                for (var layeridX = 0; layeridX < _this.tiledData.layers.length; layeridX++) {
                    if (_this.tiledData.layers[layeridX].type !== "tilelayer")
                        continue;

                    var data = _this.tiledData.layers[layeridX].data;
                    for (var tileidX = 0; tileidX < data.length; tileidX++) {
                        var ID = data[tileidX];
                        if (ID === 0) {
                            continue;
                        }
                        var tileloc = _this.getTile(ID);

                        var worldX = Math.floor(tileidX % _this.tiledData.width) * _this.tiledData.tilewidth;
                        var worldY = Math.floor(tileidX / _this.tiledData.width) * _this.tiledData.tileheight;

                        context.drawImage(tileloc.img, tileloc.px, tileloc.py, _this.tiledData.tilewidth, _this.tiledData.tileheight, worldX, worldY, _this.tiledData.tilewidth, _this.tiledData.tileheight);
                    }
                }
            };
        }
        Preloader.prototype.queueAssets = function (Assets, load) {
            var _this = this;
            var Assetkeys = Object.keys(Assets);
            for (var x = 0; x < Assetkeys.length; x++) {
                var itemkeys = Object.keys(Assets[Assetkeys[x]]);
                for (var y = 0; y < itemkeys.length; y++) {
                    this.totalAssets++;
                }
            }
            if (Assets.Images) {
                this.genericLoader(Assets.Images, true);
            }
            if (Assets.Anim) {
                this.genericLoader(Assets.Anim, false, this.animkey, this.onAnimJSONLoad, 'json');
            }
            if (Assets.Sprite) {
                this.genericLoader(Assets.Sprite, false, this.spritekey, this.onSpriteJSONLoad, 'json');
            }
            if (Assets.Tileset) {
                this.genericLoader(Assets.Tileset, false, this.tileKey, this.onTileJSONLoad, 'json');
            }
            if (Assets.XML) {
                this.genericLoader(Assets.XML, false, this.xmlKey, this.onXMLLoad, 'xml');
            }
            this.timerid = setInterval(function () {
                if (_this.isLoaded === _this.totalAssets) {
                    clearInterval(_this.timerid);
                    _this.isFilesLoaded = true;
                    load();
                }
            }, 1000 / 1);
        };
        Preloader.prototype.genericLoader = function (url, isImage, key, onLoad, typeOfFile) {
            if (isImage) {
                for (var file in url) {
                    IMAGE_CACHE[file] = new Image();
                    IMAGE_CACHE[file].onload = this.isLoaded++;
                    IMAGE_CACHE[file].onerror = this.isError++;
                    IMAGE_CACHE[file].src = url[file];
                }
            } else {
                key = Object.keys(url);
                for (var i = 0; i < key.length; i++) {
                    this.loadfile(key, url[key[i]], onLoad, typeOfFile);
                }
            }
        };
        Preloader.prototype.loadfile = function (key, url, onLoad, type) {
            var xobj = new XMLHttpRequest();
            xobj.open('GET', url, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == 200) {
                    if (type === 'json') {
                        onLoad(key, xobj.responseText);
                    } else if (type === 'xml') {
                        onLoad(key, xobj.responseXML);
                    }
                }
            };
            xobj.send(null);
        };
        return Preloader;
    })();
    Engine.Preloader = Preloader;
})(Engine || (Engine = {}));
//# sourceMappingURL=app.js.map
