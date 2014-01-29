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
    context.drawImage(Imagecache['D'], 0, 0);
    context.drawImage(Imagecache['S'], 50, 50);
    setInterval(animate, 1000 / 60);
}
function animate() {
    context.clearRect(75, 75, 100, 100);
    AtlasCache['at'][xpos].draw(context, 100, 100);
    xpos = (xpos + 1) % AtlasCache['at'].length;
}
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
*   //do what you need with loaded assets now which are in global variables seen at below(Imagecache, AtlasCache etc)
*    }
*/
var AtlasCache = [];
var Imagecache = [];
var Total_Assets = 0;
var atlasPos = 0;
var AtlasKey = [];

//image loader variable for now
var isLoaded = 0;
var isError = 0;

//atlas loader varaiable
var srcArray;
var image = new Image();
var preload;
(function (preload) {
    var Manager = (function () {
        function Manager() {
            //Atlas loader private variables
            this.atlasImage = new Image();
        }
        Manager.prototype.QueueAssets = function (Assets, OnComplete) {
            if (Assets.Images) {
                for (var file in Assets.Images) {
                    Total_Assets++;
                }
                this.ImageLoader(Assets.Images);
            }
            if (Assets.Atlas) {
                this.AtlasLoader(Assets.Atlas);
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
        Manager.prototype.ImageLoader = function (files) {
            for (var file in files) {
                Imagecache[file] = new Image();
                Imagecache[file].onload = isLoaded++;
                Imagecache[file].onerror = isError++;
                Imagecache[file].src = files[file];
            }
        };
        Manager.prototype.AtlasLoader = function (url) {
            AtlasKey = Object.keys(url);
            for (var i = 0; i < AtlasKey.length; i++) {
                this.loadJSON(url[AtlasKey[i]], this.OnJSONLoad);
            }
        };
        Manager.prototype.defineSprite = function (sourceAtlas, originX, originY, originW, originH) {
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
        Manager.prototype.NewSprite = function (spriteName) {
            this.isFound = false;
            for (var i = 0; i < srcArray.frames.length; i++) {
                //search for array element to matches the filename of the frame
                if (srcArray.frames[i].filename == spriteName) {
                    var spriteWanted = srcArray.frames[i];
                    this.isFound = true;

                    //return new sprite function with all the dimensions and data of the frame
                    return new this.defineSprite(this.atlasImage, spriteWanted.frame.x, spriteWanted.frame.y, spriteWanted.frame.w, spriteWanted.frame.h);
                    break;
                }
            }
            if (!this.isFound) {
                alert("Error: Sprite \"" + spriteName + "\" not found");
            }
        };
        Manager.prototype.OnJSONLoad = function (response) {
            //store JSONarray in variable
            this.json = JSON.parse(response);
            srcArray = this.json;
            this.atlasImage.src = 'Assets/' + srcArray.meta.image;
            image.src = 'Assets/' + srcArray.meta.image;
            var holder = [];
            for (var i = 0; i < srcArray.frames.length; i++) {
                console.log(srcArray.frames[i].filename);
                holder[i] = this.NewSprite(srcArray.frames[i].filename);
            }
            AtlasCache[AtlasKey[atlasPos]] = holder;
            atlasPos++;
            OnComplete();
        };
        return Manager;
    })();
    preload.Manager = Manager;
})(preload || (preload = {}));
//# sourceMappingURL=app.js.map
