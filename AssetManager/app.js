window.onload = function () {
    var game = new Game.Init();
};
var Game;
(function (Game) {
    var GenericArea = (function () {
        function GenericArea() {
            this.objectClick = function (x, y, obj) {
                for (var i = 0; i < obj.length; i++) {
                    var x1 = obj[i].x;
                    var x2 = obj[i].x + obj[i].width;
                    var y1 = obj[i].y;
                    var y2 = obj[i].y + obj[i].width;
                    if ((x1 <= x && x <= x2) && (y1 <= y && y <= y2)) {
                        console.log("clicked object");
                    }
                }
            };
            this.x = 0;
            this.y = 0;
            this.mx = 0;
            this.my = 0;
            this.velocity = 2.0;
            GAME_OBJECTS.push(SPRITE_CACHE[0]);
        }
        GenericArea.prototype.update = function () {
            if (control.keydown('W')) {
                this.y -= this.velocity;
            } else if (control.keydown('D')) {
                this.x += this.velocity;
            } else if (control.keydown('A')) {
                this.x -= this.velocity;
            } else if (control.keydown('S')) {
                this.y += this.velocity;
            }

            if (control.mousedown()) {
                this.mx = control.mEvent.pageX;
                this.my = control.mEvent.pageY;
                this.objectClick(this.mx, this.my, objects);
            }
            //imagex += 50;
            /*if (pos === 0) {
            imagex = 0;
            }*/
        };
        GenericArea.prototype.render = function (context) {
            context.clearRect(0, 0, 800, 600);
            tiles.drawTiles(context, 'rpg');
            tiles.getObjects(context, 'rpg');
            GAME_OBJECTS[0].render(context, this.x, this.y);
            /*ANIM_CACHE['at'][pos].render(context, 200, 150);
            pos = (pos + 1) % ANIM_CACHE['at'].length;*/
        };
        return GenericArea;
    })();
    Game.GenericArea = GenericArea;
})(Game || (Game = {}));
var GAME_OBJECTS = [];
var Game;
(function (Game) {
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
    Game.GameObject = GameObject;
})(Game || (Game = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='gameobject.ts' />
var Game;
(function (Game) {
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        function Sprite(img, x, y, w, h, a, scale) {
            _super.call(this, img, x, y, w, h, scale);
            this.a = a;
        }
        return Sprite;
    })(Game.GameObject);
    Game.Sprite = Sprite;
})(Game || (Game = {}));
var control;
var tiles;
var Game;
(function (Game) {
    var Loop = (function () {
        function Loop(canvasid, width, height, preloader) {
            var _this = this;
            this.render = function () {
                _this.currentArea.render(_this.context);
            };
            this.canvas = document.createElement('canvas');
            this.canvas.id = canvasid;
            this.canvas.width = width;
            this.canvas.height = height;
            this.canvas.tabindex = '1';
            document.body.appendChild(this.canvas);
            this.asset = preloader;
            this.canvas = document.getElementById(canvasid);
            this.context = this.canvas.getContext('2d');
            control = new Game.input(this.canvas);
            tiles = new Game.Tilemap();
            tiles.Init();
            this.currentArea = new Game.GenericArea();
        }
        Loop.prototype.update = function () {
            this.currentArea.update();
        };

        Loop.prototype.playerInput = function () {
        };
        return Loop;
    })();
    Game.Loop = Loop;
})(Game || (Game = {}));
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
                    D: 'Assets/Image/diamond.png',
                    S: 'Assets/Image/star.png'
                },
                Anim: {
                    at: 'Assets/Atlas/test.json'
                },
                Sprite: {
                    spr: 'Assets/Atlas/test.json'
                },
                Tileset: {
                    rpg: 'Assets/Tilemap/map.json'
                },
                XML: {
                    chapter: 'Assets/XML/test.xml'
                },
                Sounds: {
                    car: 'Assets/Sound/car',
                    punch: 'Assets/Sound/punch',
                    wood: 'Assets/Sound/wood'
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
var Game;
(function (Game) {
    var input = (function () {
        function input(canvas) {
            this.keys = [];
            this.click = false;
            this.mEvent = null;
            var that = this;
            document.addEventListener('keydown', function (e) {
                var letter = String.fromCharCode(e.keyCode);
                that.keys[letter] = true;
                console.log(letter);
            });
            document.addEventListener('keyup', function (e) {
                var letter = String.fromCharCode(e.keyCode);
                that.keys[letter] = false;
            });
            document.addEventListener('mousedown', function (e) {
                that.mEvent = e;
                that.click = true;
            });
            document.addEventListener('mouseup', function (e) {
                that.click = false;
            });
        }
        input.prototype.keydown = function (key) {
            return this.keys[key];
        };
        input.prototype.keyup = function (key) {
            return !this.keys[key];
        };
        input.prototype.mousedown = function () {
            return this.click;
        };
        return input;
    })();
    Game.input = input;
})(Game || (Game = {}));
/*      HTML5 AssetManager V. 0.95
*   Currently supports images, Atlases(from texturepacker) for sprites or animation, tilesets, xmls and sounds for now
*   how to use:
*/
var ANIM_CACHE = [];
var IMAGE_CACHE = [];
var SPRITE_CACHE = [];
var TILESET_CACHE = [];
var TILEDATA_CACHE = [];
var XML_CACHE = [];
var SOUND_CACHE = [];
var MUSIC_CACHE = [];

var Game;
(function (Game) {
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
                    holder[i] = new Game.GameObject(_this.spriteSource, frame.x, frame.y, frame.w, frame.h);
                }
                ANIM_CACHE[key[_this.animPos]] = holder; //Store the holder array into the key of the ANIM_CACHE
                _this.animPos++; //Move to the next key of the array
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

                    //figure out whats wrong with the associative array
                    var indexes = _this.spriteData.frames[i].filename.substring(0, _this.spriteData.frames[i].filename.length - 4);
                    holder[i] = new Game.GameObject(_this.spriteSource, frame.x, frame.y, frame.w, frame.h);
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
                    TILEDATA_CACHE[key[_this.tilesetPos]] = _this.tiledData;
                    _this.tilesetPos++;
                    _this.tileKey = key; //needed for getTile ()
                }
            };
            this.onXMLLoad = function (key, response) {
                var test = response;
                var xmltest = test.getElementsByTagName("Shadow");
                _this.isLoaded++;
                //rest to be implemented. not sure how to extract the info how i want yet...will do soon
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
            if (Assets.Sounds) {
                this.soundloader(Assets.Sounds, 'Sound');
            }
            if (Assets.Music) {
                this.soundloader(Assets.Music, 'Music');
            }
            this.timerid = setInterval(function () {
                if (_this.isLoaded === _this.totalAssets) {
                    clearInterval(_this.timerid);
                    _this.isFilesLoaded = true;
                    load();
                }
            }, 1000 / 2);
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
        Preloader.prototype.soundloader = function (sounds, type) {
            var _this = this;
            var pos;
            var key = Object.keys(sounds);
            var audioType = '';
            for (pos = 0; pos < key.length; pos++) {
                if (type === 'Sound') {
                    SOUND_CACHE[key[pos]] = document.createElement("audio");
                    document.body.appendChild(SOUND_CACHE[key[pos]]);
                    audioType = this.fileFormat(SOUND_CACHE[key[pos]]);
                    SOUND_CACHE[key[pos]].setAttribute("src", sounds[key[pos]] + audioType);
                    SOUND_CACHE[key[pos]].load();
                    SOUND_CACHE[key[pos]].addEventListener('canplaythrough', function () {
                        _this.isLoaded++;
                    });
                } else if (type === 'Music') {
                    MUSIC_CACHE[key[pos]] = document.createElement("audio");
                    document.body.appendChild(MUSIC_CACHE[key[pos]]);
                    audioType = this.fileFormat(MUSIC_CACHE[key[pos]]);
                    MUSIC_CACHE[key[pos]].setAttribute("src", sounds[key[pos]] + audioType);
                    MUSIC_CACHE[key[pos]].load();
                    MUSIC_CACHE[key[pos]].addEventListener('canplaythrough', function () {
                        _this.isLoaded++;
                    });
                }
            }
        };
        Preloader.prototype.fileFormat = function (audioElement) {
            var ext = '';
            if (audioElement.canPlayType("audio/ogg") === "probably" || audioElement.canPlayType("audio/ogg") === "maybe") {
                ext = '.ogg';
            } else if (audioElement.canPlayType("audio/mp3") === "probably" || audioElement.canPlayType("audio/mp3") === "maybe") {
                ext = '.mp3';
            }
            return ext;
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
                    } else if (type === 'mp3') {
                        onLoad(key, xobj.response);
                    }
                }
            };
            xobj.send(null);
        };
        return Preloader;
    })();
    Game.Preloader = Preloader;
})(Game || (Game = {}));
var objects = [];
var Game;
(function (Game) {
    var Tilemap = (function () {
        function Tilemap() {
            var _this = this;
            this.getObjects = function (context, index) {
                for (var layeridX = 0; layeridX < TILEDATA_CACHE[index].layers.length; layeridX++) {
                    if (TILEDATA_CACHE[index].layers[layeridX].type !== "objectgroup")
                        continue;
                    var tileObjects = TILEDATA_CACHE[index].layers[layeridX].objects;

                    var obj = {
                        "width": 0,
                        "x": 0,
                        "y": 0
                    };

                    for (var x = 0; x < tileObjects.length; x++) {
                        var tile = _this.getTile(tileObjects[x].gid);
                        if (tileObjects[x].width !== 0) {
                            obj.width = tileObjects[x].width;
                        } else {
                            obj.width = 32; //TILEDATA_CACHE[index].tilesets.tilewidth;
                        }

                        obj.x = tileObjects[x].x;
                        obj.y = tileObjects[x].y;
                        objects[x] = {
                            "width": obj.width,
                            "x": obj.x,
                            "y": obj.y
                        };

                        var w = TILEDATA_CACHE[index].tilewidth;
                        var h = TILEDATA_CACHE[index].tileheight;
                        context.drawImage(tile.img, tile.px, tile.py, w, h, obj.x, obj.y, w, h);
                    }
                }
            };
            this.drawTiles = function (context, index) {
                for (var layeridX = 0; layeridX < TILEDATA_CACHE[index].layers.length; layeridX++) {
                    if (TILEDATA_CACHE[index].layers[layeridX].type !== "tilelayer")
                        continue;

                    var data = TILEDATA_CACHE[index].layers[layeridX].data;
                    for (var tileidX = 0; tileidX < data.length; tileidX++) {
                        var ID = data[tileidX];
                        if (ID === 0) {
                            continue;
                        }
                        var tileloc = _this.getTile(ID);

                        var worldX = Math.floor(tileidX % TILEDATA_CACHE[index].width) * TILEDATA_CACHE[index].tilewidth;
                        var worldY = Math.floor(tileidX / TILEDATA_CACHE[index].width) * TILEDATA_CACHE[index].tileheight;

                        context.drawImage(tileloc.img, tileloc.px, tileloc.py, TILEDATA_CACHE[index].tilewidth, TILEDATA_CACHE[index].tileheight, worldX, worldY, TILEDATA_CACHE[index].tilewidth, TILEDATA_CACHE[index].tileheight);
                    }
                }
            };
        }
        Tilemap.prototype.Init = function () {
            this.key = [];
            this.key = Object.keys(TILESET_CACHE);
        };

        //Functions to test if file are loaded and can be rendered properly
        Tilemap.prototype.getTile = function (tileIndex) {
            var tile = {
                "img": null,
                "px": 0,
                "py": 0
            };

            var i = 0;
            for (i = 0; i < this.key.length; i--) {
                if (TILESET_CACHE[this.key[i]].firstgid <= tileIndex)
                    break;
            }
            tile.img = TILESET_CACHE[this.key[i]].image;
            var localIndex = tileIndex - TILESET_CACHE[this.key[i]].firstgid;
            var localtileX = Math.floor(localIndex % TILESET_CACHE[this.key[i]].numXTiles);
            var localtileY = Math.floor(localIndex / TILESET_CACHE[this.key[i]].numXTiles);
            tile.px = localtileX * TILEDATA_CACHE[this.key[i]].tilewidth;
            tile.py = localtileY * TILEDATA_CACHE[this.key[i]].tileheight;

            return tile;
        };
        return Tilemap;
    })();
    Game.Tilemap = Tilemap;
})(Game || (Game = {}));
//# sourceMappingURL=app.js.map
