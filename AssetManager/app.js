var manager;
var context;
var xpos = 0;

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
            at: 'Assets/test.json',
            gat: 'Assets/test.json'
        },
        Tileset: {
            rpg: 'Assets/map.json'
        }
    };
    manager = new Preloader.Manager();
    manager.queueAssets(source, OnComplete);
};
function OnComplete() {
    manager.drawTiles(context);
    context.drawImage(IMAGE_CACHE['D'], 0, 100);
    context.drawImage(IMAGE_CACHE['S'], 100, 0);
    setInterval(animate, 1000 / 15);
}
function animate() {
    //context.clearRect(25, 25, 25, 25);
    ATLAS_CACHE['at'][xpos].draw(context, 150, 150);
    xpos = (xpos + 1) % ATLAS_CACHE['at'].length;
}
/*      HTML5 AssetManager V. 0.7
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

var num = 0;
var tmxdata;
var Preloader;
(function (Preloader) {
    var Manager = (function () {
        function Manager() {
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
            this.isTilesLoaded = false;
            this.tileSizeX = 0;
            this.tileSizeY = 0;
            this.totalAssets = 0;
            this.width = 0;
            this.x = 0;
            this.y = 0;
        }
        Manager.prototype.queueAssets = function (Assets, OnComplete) {
            var _this = this;
            this.onAtlasJSONLoad = function (response) {
                _this.holder = [];
                _this.atlasData = JSON.parse(response);
                _this.srcArray = _this.atlasData;
                _this.atlasImage.src = 'Assets/' + _this.srcArray.meta.image;
                for (var i = 0; i < _this.srcArray.frames.length; i++) {
                    _this.holder[i] = _this.newAtlasSprite(_this.srcArray.frames[i].filename);
                }
                ATLAS_CACHE[_this.atlasKey[_this.atlasPos]] = _this.holder; //Store the holder array into the key of the ATLAS_CACHE
                _this.atlasPos++; //Move to the next key of the array
            };

            if (Assets.Images) {
                this.imageLoader(Assets.Images);
            }
            if (Assets.Atlas) {
                this.atlasLoader(Assets.Atlas);
            }
            if (Assets.Tileset) {
                this.tilesetLoader(Assets.Tileset);
            }
            if (this.isTilesLoaded) {
                console.log("completed");
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
        Manager.prototype.onTileJSONLoad = function (response) {
            this.tiledData = JSON.parse(response);
            this.numTilesX = this.tiledData.width;
            this.numTilesY = this.tiledData.height;
            this.tileSizeX = this.tiledData.tilewidth;
            this.tileSizeY = this.tiledData.tileheight;
            this.pixelSizeX = this.numTilesX * this.tileSizeX;
            this.pixelSizeY = this.numTilesY * this.tileSizeY;

            //console.log(tmxdata.tilewidth);
            //console.log(this.tiledData.width);
            tmxdata = this.tiledData;

            //this.isTilesLoaded = true;
            //this.map = this;
            var tiledata = this.tiledData.tilesets;
            for (var i = 0; i < tiledata.length; i++) {
                var tilesetimage = new Image();
                tilesetimage.onload = function () {
                    num++;
                    if (num === tiledata.length) {
                        this.isTilesLoaded = true;
                        OnComplete(); //Callback function when the function is done
                    }
                };
                tilesetimage.src = "../Assets/" + this.tiledData.tilesets[i].image.replace(/^.*[\\\/]/, '');
                var tileData = {
                    "firstgid": tiledata[i].firstgid,
                    "image": tilesetimage,
                    "imageheight": tiledata[i].imageheight,
                    "imagewidth": tiledata[i].imagewidth,
                    "name": tiledata[i].name,
                    "numXTiles": Math.floor(tiledata[i].imagewidth / this.tileSizeX),
                    "numYTiles": Math.floor(tiledata[i].imageheight / this.tileSizeY)
                };
                TILESET_CACHE[i] = tileData;
            }
        };

        //onTilesetLoad() {
        //}
        Manager.prototype.getTile = function (tileIndex) {
            var tile = {
                "img": null,
                "px": 0,
                "py": 0
            };

            var index = 0;
            for (index = TILESET_CACHE.length - 1; index >= 0; index--) {
                if (TILESET_CACHE[index].firstgid <= tileIndex)
                    break;
            }
            tile.img = TILESET_CACHE[index].image;
            var localIndex = tileIndex - TILESET_CACHE[index].firstgid;
            var localtileX = Math.floor(localIndex % TILESET_CACHE[index].numXTiles);
            var localtileY = Math.floor(localIndex / TILESET_CACHE[index].numXTiles);
            tile.px = localtileX * tmxdata.tilewidth;
            tile.py = localtileY * tmxdata.tileheight;

            return tile;
        };
        Manager.prototype.drawTiles = function (context) {
            for (var layeridX = 0; layeridX < tmxdata.layers.length; layeridX++) {
                if (tmxdata.layers[layeridX].type !== "tilelayer")
                    continue;

                var data = tmxdata.layers[layeridX].data;
                for (var tileidX = 0; tileidX < data.length; tileidX++) {
                    var ID = data[tileidX];
                    if (ID === 0) {
                        continue;
                    }
                    var tileloc = this.getTile(ID);

                    var worldX = Math.floor(tileidX % tmxdata.width) * tmxdata.tilewidth;
                    var worldY = Math.floor(tileidX / tmxdata.width) * tmxdata.tileheight;

                    context.drawImage(tileloc.img, tileloc.px, tileloc.py, tmxdata.tilewidth, tmxdata.tileheight, worldX, worldY, tmxdata.tilewidth, tmxdata.tileheight);
                }
            }
        };
        return Manager;
    })();
    Preloader.Manager = Manager;
})(Preloader || (Preloader = {}));
//# sourceMappingURL=app.js.map
