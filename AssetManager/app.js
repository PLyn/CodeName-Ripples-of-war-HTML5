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
        },
        XML: {
            chapter: 'Assets/test.xml'
        }
    };
    asset = new Preloader.Manager();
    asset.queueAssets(source, OnComplete);
    asset.progress();
};
function OnComplete() {
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
*   //do what you need with loaded assets now which are in global variables seen at below(IMAGE_CACHE, ATLAS_CACHE etc)
*    }
*/
var ATLAS_CACHE = [];
var IMAGE_CACHE = [];
var TILESET_CACHE = [];
var XML_CACHE = [];

var Preloader;
(function (Preloader) {
    var Manager = (function () {
        function Manager() {
            var _this = this;
            this.onAtlasJSONLoad = function (key, response) {
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
                ATLAS_CACHE[key[_this.atlasPos]] = _this.holder; //Store the holder array into the key of the ATLAS_CACHE
                _this.atlasPos++; //Move to the next key of the array
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
            this.atlasImage = new Image();
            this.atlasKey = [];
            this.atlasPos = 0;
            this.height = 0;
            this.isError = 0;
            this.isFound = false;
            this.isLoaded = 0;
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
            if (Assets.Atlas) {
                this.genericLoader(Assets.Atlas, false, this.atlasKey, this.onAtlasJSONLoad, 'json');
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
