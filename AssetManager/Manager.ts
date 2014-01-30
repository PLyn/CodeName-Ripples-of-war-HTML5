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

var OnJSONLoad;
module preload {
    export class Manager {
        //Atlas loader private variables
        atlasImage: HTMLImageElement;
        sprite: HTMLImageElement;
        x: number;
        y: number;
        width: number;
        height: number;
        scale: number;
        isFound: boolean;
        draw: Function;

        //downloadQueue: string[] = [];
        //imgLoader: preload.ImageLoader;
        json: any;
        AtlasKey: string[];

        QueueAssets(Assets, OnComplete) {
            //arrow function for onJSON load to prevent loss of this context
            OnJSONLoad = (response) => {
                this.json = JSON.parse(response);
                srcArray = this.json;
                this.atlasImage = new Image();
                this.atlasImage.src = 'Assets/' + srcArray.meta.image;
                image.src = 'Assets/' + srcArray.meta.image;
                var holder = [];
                for (var i = 0; i < srcArray.frames.length; i++) {
                    holder[i] = this.NewSprite(srcArray.frames[i].filename);
                }
                AtlasCache[AtlasKey[atlasPos]] = holder;
                atlasPos++;
                OnComplete();
            };
            if (Assets.Images) {
                for (var file in Assets.Images) {
                    Total_Assets++;
                }
                this.ImageLoader(Assets.Images);
            }
            if (Assets.Atlas) {
                    this.AtlasLoader(Assets.Atlas);
            }
        }
        loadJSON(url, call) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', url, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == 200) {
                    call(xobj.responseText);
                }
            };
            xobj.send(null);
        }
        ImageLoader(files) {
            //store each element in the cache for use in the program later on
            for (var file in files) {
                Imagecache[file] = new Image();
                Imagecache[file].onload = isLoaded++;
                Imagecache[file].onerror = isError++;
                Imagecache[file].src = files[file];
            }
        }
        AtlasLoader(url) {
            AtlasKey = Object.keys(url);
            for (var i = 0; i < AtlasKey.length; i++) {
                this.loadJSON(url[AtlasKey[i]], OnJSONLoad);
            }
        }
        defineSprite(sourceAtlas, originX, originY, originW, originH) {
            this.sprite = sourceAtlas;
            this.x = originX;
            this.y = originY;
            this.width = originW;
            this.height = originH;
            this.scale = 1.0;

            this.draw = function (canvas, x, y) {
                canvas.drawImage(this.sprite, this.x, this.y, this.width, this.height, x, y, this.width * this.scale, this.height * this.scale);
            }
        }
        NewSprite(spriteName) {
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
        }
    }
}
