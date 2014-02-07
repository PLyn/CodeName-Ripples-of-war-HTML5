var asset;
var context;
var timer;
var x = 0;
var imagex = 0;
var imagey = 0;
window.onload = function () {
    var canvas = document.getElementById('Can');
    window.addEventListener('mousedown', mousedown);
    context = canvas.getContext('2d');

    //group assets in a array of array
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

    asset = new Preloader.Manager();
    asset.queueAssets(source, OnComplete);
    asset.progress();
};
function mousedown(e) {
    var test = relMouseCoords(e);
    var cx = e.pageX;
    var cy = e.pageY;
    console.log(cx);
    console.log(cy);
}
function OnComplete() {
    for (var x = 0; x < SPRITE_CACHE.length; x++) {
        GAME_OBJECTS[x] = SPRITE_CACHE[x];
        GAME_OBJECTS[x].render(context, imagex, imagey);
        imagex += 50;
    }
    asset.drawTiles(context);
    context.drawImage(IMAGE_CACHE['D'], imagex, 100);
    context.drawImage(IMAGE_CACHE['S'], 100, 0);
    setInterval(animate, 1000 / 30);
}
function animate() {
    //context.clearRect(imagex - 10, 100, imagex + 25, 100);
    ANIM_CACHE['at'][x].render(context, 200, 200);
    x = (x + 1) % ANIM_CACHE['at'].length;
}

//deal with this function later to do proper coordinates for mouse position in canvas
function relMouseCoords(event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    } while(currentElement === currentElement.offsetParent);

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return { x: canvasX, y: canvasY };
}
var GAME_OBJECTS = [];
var game;
(function (game) {
    var GameObject = (function () {
        function GameObject(img, x, y, w, h, scale) {
            this.x = 0;
            this.y = 0;
            this.W = 0;
            this.H = 0;
            this.img = new Image();
            this.scale = 0;
            this.img = img;
            this.x = x;
            this.y = y;
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
    game.GameObject = GameObject;
})(game || (game = {}));
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
/*      HTML5 AssetManager V. 0.9
*   Currently supports images and Atlases(image and json from texturepacker)
*   how to use:
*   store assets in array as shown
*       var source = {
*       Images: {
*            D: 'Assets/diamond.png',
*            S: 'Assets/star.png'
*        },
*        Atlas: {
*            at: 'Assets/test.json'
*        }
*    };
*    manager = new preload.Manager();
*    manager.QueueAssets(source, OnComplete);
*
*   function OnComplete(){
*   //do what you need with loaded assets now which are in global variables seen at below(IMAGE_CACHE, ANIM_CACHE etc)
*    }
*/
var ANIM_CACHE = [];
var IMAGE_CACHE = [];
var SPRITE_CACHE = [];
var TILESET_CACHE = [];
var XML_CACHE = [];

var Preloader;
(function (Preloader) {
    var Manager = (function () {
        function Manager() {
            var _this = this;
            this.animSource = new Image();
            this.animkey = [];
            this.animPos = 0;
            this.draw = {};
            this.height = 0;
            this.isError = 0;
            this.isFound = false;
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
                _this.animData = JSON.parse(response);
                _this.animSource.onload = function () {
                    _this.isLoaded++;
                };
                _this.animSource.src = 'Assets/' + _this.animData.meta.image;
                for (var i = 0; i < _this.animData.frames.length; i++) {
                    holder[i] = new game.GameObject(_this.animSource, _this.animData.frames[i].frame.x, _this.animData.frames[i].frame.y, _this.animData.frames[i].frame.w, _this.animData.frames[i].frame.h);
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
                    holder[i] = new game.GameObject(_this.spriteSource, _this.spriteData.frames[i].frame.x, _this.spriteData.frames[i].frame.y, _this.spriteData.frames[i].frame.w, _this.spriteData.frames[i].frame.h);

                    //this.newAnimFrame(this.spriteData.frames[i].filename);
                    SPRITE_CACHE[i] = holder[i];
                }

                //SPRITE_CACHE[key[this.spritePos]] = holder;
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
                    _this.tileKey = key; //needed for getTile ()
                }
            };
            this.onXMLLoad = function (key, response) {
                _this.isLoaded++;
                var test = response;
                var xmltest = test.getElementsByTagName("Shadow");
                //rest to be implemented. not sure how to extract the info how i want yet...will do soon
            };
            this.progress = function () {
                _this.timerid = setInterval(function () {
                    if (_this.isLoaded === _this.totalAssets) {
                        clearInterval(_this.timerid);
                        _this.isFilesLoaded = true;
                        OnComplete();
                    }
                }, 1000 / 1);
            };
            //Functions to test if file are loaded and can be rendered properly
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
        Manager.prototype.queueAssets = function (Assets, OnComplete) {
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
        };
        Manager.prototype.genericLoader = function (url, isImage, key, onLoad, typeOfFile) {
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
        Manager.prototype.loadfile = function (key, url, onLoad, type) {
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

        Manager.prototype.defineAtlasSprite = function (sourceAtlas, originX, originY, originW, originH) {
            this.sprite = sourceAtlas;
            this.x = originX;
            this.y = originY;
            this.width = originW;
            this.height = originH;
            this.scale = 1.0;

            this.draw = function (canvas, x, y) {
                canvas.drawImage(this.sprite, this.x, this.y, this.width, this.height, x, y, this.width * this.scale, this.height * this.scale);
            };
        };
        Manager.prototype.newAnimFrame = function (spriteName) {
            var spriteWanted;
            for (var i = 0; i < this.animData.frames.length; i++) {
                //search for array element to matches the filename of the frame
                if (this.animData.frames[i].filename === spriteName) {
                    spriteWanted = this.animData.frames[i];
                    this.isFound = true;

                    //return new Sprite.sprite(this.spriteSource, spriteWanted.frame.x, spriteWanted.frame.y, spriteWanted.frame.w, spriteWanted.frame.h);
                    //return new sprite function with all the dimensions and data of the frame
                    return new this.defineAtlasSprite(this.animSource, spriteWanted.frame.x, spriteWanted.frame.y, spriteWanted.frame.w, spriteWanted.frame.h);
                    break;
                }
            }
            if (!this.isFound) {
                alert("Error: Sprite \"" + spriteName + "\" not found");
            }
        };
        return Manager;
    })();
    Preloader.Manager = Manager;
})(Preloader || (Preloader = {}));
//# sourceMappingURL=app.js.map
