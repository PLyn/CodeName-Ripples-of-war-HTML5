var asset;
var context;
var timer;
var x = 0;
window.onload = function () {
    var canvas = document.getElementById('Can');
    context = canvas.getContext('2d');

    //group assets in a array of array
    var source = {
        Images: {
            D: 'Assets/diamond.png',
            S: 'Assets/star.png'
        },
        Atlas: {
            at: 'Assets/test.json'
        },
        Tileset: {
            rpg: 'Assets/map.json'
        }
    };
    asset = new Preloader.Manager();
    asset.queueAssets(source, OnComplete);
    timer = setTimeout(asset.progress, 1000 / 1);
};
function OnComplete() {
    clearTimeout(timer);
    asset.drawTiles(context);
    context.drawImage(IMAGE_CACHE['D'], 0, 100);
    context.drawImage(IMAGE_CACHE['S'], 100, 0);
    setInterval(animate, 1000 / 15);
}
function animate() {
    //context.clearRect(25, 25, 25, 25);
    ATLAS_CACHE['at'][x].draw(context, 150, 150);
    x = (x + 1) % ATLAS_CACHE['at'].length;
}
/*      HTML5 AssetManager V. 0.8
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
*   //do what you need with loaded assets now which are in global variables seen at below(IMAGE_CACHE, ATLAS_CACHE etc)
*    }
*/
var ATLAS_CACHE = [];
var IMAGE_CACHE = [];
var TILESET_CACHE = [];

var Preloader;
(function (Preloader) {
    var Manager = (function () {
        function Manager() {
            var _this = this;
            this.progress = function () {
                if (_this.isLoaded === _this.totalAssets) {
                    _this.isFilesLoaded = true;
                    OnComplete();
                    return true;
                } else {
                    return false;
                }
            };
            this.onAtlasJSONLoad = function (response) {
                _this.holder = [];
                _this.atlasData = JSON.parse(response);
                _this.srcArray = _this.atlasData;
                _this.atlasImage.onload = function () {
                    _this.isLoaded++;
                };
                _this.atlasImage.src = 'Assets/' + _this.srcArray.meta.image;
                for (var i = 0; i < _this.srcArray.frames.length; i++) {
                    _this.holder[i] = _this.newAtlasSprite(_this.srcArray.frames[i].filename);
                }
                ATLAS_CACHE[_this.atlasKey[_this.atlasPos]] = _this.holder; //Store the holder array into the key of the ATLAS_CACHE
                _this.atlasPos++; //Move to the next key of the array
            };
            this.onTileJSONLoad = function (response) {
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
                    TILESET_CACHE[_this.tileKey[_this.tilesetPos]] = tileData;
                    _this.tilesetPos++;
                }
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
            this.atlasImage = new Image();
            this.atlasKey = [];
            this.atlasPos = 0;
            this.height = 0;
            this.isError = 0;
            this.isFound = false;
            this.isLoaded = 0;
            this.map = null;
            this.numTilesX = 0;
            this.numTilesY = 0;
            this.pixelSizeX = 0;
            this.pixelSizeY = 0;
            this.scale = 0;
            this.tiledData = null;
            this.isFilesLoaded = false;
            this.tilesetPos = 0;
            this.tileSizeX = 0;
            this.tileSizeY = 0;
            this.totalAssets = 0;
            this.width = 0;
            this.x = 0;
            this.y = 0;
        }
        Manager.prototype.queueAssets = function (Assets, OnComplete) {
            if (Assets.Images) {
                for (var image in Assets.Images) {
                    this.totalAssets++;
                }
                this.imageLoader(Assets.Images);
            }
            if (Assets.Atlas) {
                for (var atlas in Assets.Atlas) {
                    this.totalAssets++;
                }
                this.atlasLoader(Assets.Atlas);
            }
            if (Assets.Tileset) {
                for (var tileset in Assets.Tileset) {
                    this.totalAssets++;
                }
                this.tilesetLoader(Assets.Tileset);
            }
        };

        Manager.prototype.loadJSON = function (url, call) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', url, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == 200) {
                    call(xobj.responseText);
                }
            };
            xobj.send(null);
        };
        Manager.prototype.imageLoader = function (files) {
            for (var file in files) {
                IMAGE_CACHE[file] = new Image();
                IMAGE_CACHE[file].onload = this.isLoaded++;
                IMAGE_CACHE[file].onerror = this.isError++;
                IMAGE_CACHE[file].src = files[file];
            }
        };
        Manager.prototype.atlasLoader = function (url) {
            this.atlasKey = Object.keys(url);
            for (var i = 0; i < this.atlasKey.length; i++) {
                this.loadJSON(url[this.atlasKey[i]], this.onAtlasJSONLoad);
            }
        };

        Manager.prototype.tilesetLoader = function (url) {
            this.tileKey = Object.keys(url);
            for (var i = 0; i < this.atlasKey.length; i++) {
                this.loadJSON(url[this.tileKey[i]], this.onTileJSONLoad);
            }
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
        Manager.prototype.newAtlasSprite = function (spriteName) {
            var spriteWanted;
            for (var i = 0; i < this.srcArray.frames.length; i++) {
                //search for array element to matches the filename of the frame
                if (this.srcArray.frames[i].filename == spriteName) {
                    spriteWanted = this.srcArray.frames[i];
                    this.isFound = true;

                    //return new sprite function with all the dimensions and data of the frame
                    return new this.defineAtlasSprite(this.atlasImage, spriteWanted.frame.x, spriteWanted.frame.y, spriteWanted.frame.w, spriteWanted.frame.h);
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
