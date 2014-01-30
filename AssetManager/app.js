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
        }
    };
    manager = new preload.Manager();
    manager.queueAssets(source, OnComplete);
};
function OnComplete() {
    context.drawImage(IMAGECACHE['D'], 0, 0);
    context.drawImage(IMAGECACHE['S'], 50, 50);
    setInterval(animate, 1000 / 15);
}
function animate() {
    context.clearRect(75, 75, 100, 100);
    ATLASCACHE['at'][xpos].draw(context, 100, 100);
    xpos = (xpos + 1) % ATLASCACHE['at'].length;
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
*   //do what you need with loaded assets now which are in global variables seen at below(Imagecache, AtlasCache etc)
*    }
*/
var ATLASCACHE = [];
var atlasPos = 0;
var atlasKey = [];
var IMAGECACHE = [];
var isLoaded = 0;
var isError = 0;
var onJSONLoad;
var srcArray;
var total_Assets = 0;

var preload;
(function (preload) {
    var Manager = (function () {
        function Manager() {
            this.atlasImage = new Image();
            this.atlasKey = [];
            this.isFound = false;
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.scale = 0;
        }
        Manager.prototype.queueAssets = function (Assets, OnComplete) {
            var _this = this;
            onJSONLoad = function (response) {
                _this.json = JSON.parse(response);
                srcArray = _this.json;
                _this.atlasImage.src = 'Assets/' + srcArray.meta.image;
                var holder = [];
                for (var i = 0; i < srcArray.frames.length; i++) {
                    holder[i] = _this.newAtlasSprite(srcArray.frames[i].filename);
                }
                ATLASCACHE[_this.atlasKey[atlasPos]] = holder;
                atlasPos++;
                OnComplete();
            };
            if (Assets.Images) {
                for (var file in Assets.Images) {
                    total_Assets++;
                }
                this.imageLoader(Assets.Images);
            }
            if (Assets.Atlas) {
                this.atlasLoader(Assets.Atlas);
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
            for (var i = 0; i < srcArray.frames.length; i++) {
                //search for array element to matches the filename of the frame
                if (srcArray.frames[i].filename == spriteName) {
                    var spriteWanted = srcArray.frames[i];
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
                IMAGECACHE[file] = new Image();
                IMAGECACHE[file].onload = isLoaded++;
                IMAGECACHE[file].onerror = isError++;
                IMAGECACHE[file].src = files[file];
            }
        };
        Manager.prototype.atlasLoader = function (url) {
            this.atlasKey = Object.keys(url);
            for (var i = 0; i < this.atlasKey.length; i++) {
                this.loadJSON(url[this.atlasKey[i]], onJSONLoad);
            }
        };
        return Manager;
    })();
    preload.Manager = Manager;
})(preload || (preload = {}));
//# sourceMappingURL=app.js.map
