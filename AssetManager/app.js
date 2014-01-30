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
    manager = new Preloader.Manager();
    manager.queueAssets(source, OnComplete);
};
function OnComplete() {
    context.drawImage(IMAGE_CACHE['D'], 0, 0);
    context.drawImage(IMAGE_CACHE['S'], 50, 50);
    setInterval(animate, 1000 / 15);
}
function animate() {
    context.clearRect(75, 75, 100, 100);
    ATLAS_CACHE['at'][xpos].draw(context, 100, 100);
    xpos = (xpos + 1) % ATLAS_CACHE['at'].length;
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

var Preloader;
(function (Preloader) {
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
            this.isLoaded = 0;
            this.isError = 0;
            this.total_Assets = 0;
            this.atlasPos = 0;
        }
        Manager.prototype.queueAssets = function (Assets, OnComplete) {
            var _this = this;
            this.onJSONLoad = function (response) {
                _this.json = JSON.parse(response);
                _this.srcArray = _this.json;
                _this.atlasImage.src = 'Assets/' + _this.srcArray.meta.image;
                var holder = [];
                for (var i = 0; i < _this.srcArray.frames.length; i++) {
                    holder[i] = _this.newAtlasSprite(_this.srcArray.frames[i].filename);
                }
                ATLAS_CACHE[_this.atlasKey[_this.atlasPos]] = holder;
                _this.atlasPos++;
                OnComplete();
            };
            if (Assets.Images) {
                for (var file in Assets.Images) {
                    this.total_Assets++;
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
            for (var i = 0; i < this.srcArray.frames.length; i++) {
                //search for array element to matches the filename of the frame
                if (this.srcArray.frames[i].filename == spriteName) {
                    var spriteWanted = this.srcArray.frames[i];
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
                this.loadJSON(url[this.atlasKey[i]], this.onJSONLoad);
            }
        };
        return Manager;
    })();
    Preloader.Manager = Manager;
})(Preloader || (Preloader = {}));
//# sourceMappingURL=app.js.map
