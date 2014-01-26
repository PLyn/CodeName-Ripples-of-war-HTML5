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
            at: 'Assets/test.json'
        }
    };
    manager = new preload.Manager();
    manager.QueueAssets(source, OnComplete);
};
function OnComplete() {
    context.drawImage(cache['D'], 0, 0);
    context.drawImage(cache['S'], 50, 50);
    setInterval(animate, 1000 / 10);
}
function animate() {
    context.clearRect(75, 75, 100, 100);
    AtlasCache['at'][xpos].draw(context, 100, 100);
    xpos = (xpos + 1) % AtlasHolder.length;
}
var srcArray;

var preload;
(function (preload) {
    var AtlasLoader = (function () {
        function AtlasLoader() {
            //srcArray: any;
            this.atlasImage = new Image();
        }
        AtlasLoader.prototype.Start = function (JSONArray) {
            var sprite;

            //store JSONarray in variable
            srcArray = JSONArray;
            this.atlasImage.src = 'Assets/' + JSONArray.meta.image;
            /*for (var i = 0; i < srcArray.length; i++) {
            //pushes sprite into object
            sprite[i] = this.NewSprite(srcArray.frames[i].filename);
            }
            //push object into array so i can store multiple atlases
            AtlasHolder[atlasPos] = sprite;
            atlasPos++;*/
        };
        AtlasLoader.prototype.Sprite = function (sourceAtlas, originX, originY, originW, originH) {
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
        AtlasLoader.prototype.NewSprite = function (spriteName) {
            this.isFound = false;

            for (var i = 0; i < srcArray.frames.length; i++) {
                //search for array element to matches the filename of the frame
                if (srcArray.frames[i].filename == spriteName) {
                    var spriteWanted = srcArray.frames[i];
                    this.isFound = true;

                    //return new sprite function with all the dimensions and data of the frame
                    return new this.Sprite(this.atlasImage, spriteWanted.frame.x, spriteWanted.frame.y, spriteWanted.frame.w, spriteWanted.frame.h);
                    break;
                }
            }
            if (!this.isFound) {
                alert("Error: Sprite \"" + spriteName + "\" not found");
            }
        };
        AtlasLoader.prototype.loadJSON = function (url, call) {
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
        AtlasLoader.prototype.IsComplete = function () {
            return this.isFound;
        };
        return AtlasLoader;
    })();
    preload.AtlasLoader = AtlasLoader;
})(preload || (preload = {}));
//numbers get corrupted in the onload function when initialized in the constructor for some weird reason so its global until
//i figure out something better
var number = 0;
var isLoaded = 0;
var error = 0;
var preload;
(function (preload) {
    var ImageLoader = (function () {
        function ImageLoader() {
            this.downloadQueue = [];
        }
        ImageLoader.prototype.Start = function (files) {
            for (var file in files) {
                number++;
            }

            for (var file in files) {
                cache[file] = new Image();
                cache[file].onload = function () {
                    isLoaded++;
                };
                cache[file].onerror = function () {
                    error++;
                };
                cache[file].src = files[file];
            }
        };

        ImageLoader.prototype.IsComplete = function () {
            return isLoaded >= this.downloadQueue.length;
        };
        ImageLoader.prototype.Progress = function () {
            return ((isLoaded + error) / this.downloadQueue.length) * 100;
        };
        return ImageLoader;
    })();
    preload.ImageLoader = ImageLoader;
})(preload || (preload = {}));
/*      HTML5 AssetManager
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
*   //do what you need with loaded assets now
*    }
*/
var AtlasHolder = [];
var AtlasCache = [];
var cache = [];

var atlasLoader;

var atlasPos = 0;
var AtlasKey = [];
var preload;
(function (preload) {
    var Manager = (function () {
        function Manager() {
        }
        Manager.prototype.QueueAssets = function (Assets, OnComplete) {
            this.IsLoaded = 0;
            if (Assets.Images) {
                this.imgLoader = new preload.ImageLoader();
                this.imgLoader.Start(Assets.Images);
            }
            if (Assets.Atlas) {
                atlasLoader = new preload.AtlasLoader();

                AtlasKey = Object.keys(Assets.Atlas);
                for (var i = 0; i < AtlasKey.length; i++) {
                    atlasLoader.loadJSON(Assets.Atlas[AtlasKey[i]], this.OnJSONLoad);
                }
            }
        };
        Manager.prototype.OnJSONLoad = function (response) {
            this.json = JSON.parse(response);
            atlasLoader.Start(this.json);
            for (var i = 0; i < srcArray.frames.length; i++) {
                AtlasHolder[i] = atlasLoader.NewSprite(srcArray.frames[i].filename);
            }
            AtlasCache[AtlasKey[atlasPos]] = AtlasHolder;
            atlasPos++;
            OnComplete();
        };
        return Manager;
    })();
    preload.Manager = Manager;
})(preload || (preload = {}));
//# sourceMappingURL=app.js.map
