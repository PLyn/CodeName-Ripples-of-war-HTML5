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
var ATLASCACHE = []; //Global atlas cache to get specific atlases
var atlasPos = 0; //current position in atlasKey array
var atlasKey = []; //holds the keys in the asset array for the atlases. Use the keys in atlasCache to reference the atlas you want
var IMAGECACHE = []; //Global image cache to get specific atlases
var isLoaded = 0; //Keeps track of each file loadded successfully
var isError = 0; //Keeps track of each file loaded with error
var onJSONLoad; //Variable that holds the OnJSONLoad arrow function to solve the closure issue with the this context
var srcArray; //Holds copy of JSON array 
var total_Assets = 0; //Number of all assets, used to check if all files have loaded

module preload {
    export class Manager {
        atlasImage: HTMLImageElement; //Holds source atlas image
        sprite: HTMLImageElement; // Holds the source atlas image for the specfic sprite
        x: number; 
        y: number;
        width: number;
        height: number;
        scale: number; //Scaling size of sprite
        isFound: boolean; //Boolean to check if newAtlasSprite() finds the sprite given the key
        draw: Function; // Inner Function of the defineAtlasSprite to draw sprite onto screen
        json: any;
        atlasKey: string[];
        constructor() {
            this.atlasImage = new Image();
            this.atlasKey = [];
            this.isFound = false;
            this.x = 0;
            this.y = 0;
            this.width = 0;
            this.height = 0;
            this.scale = 0;
        }
        queueAssets(Assets, OnComplete) {
            onJSONLoad = (response) => { //arrow function for onJSON load to prevent loss of this context
                this.json = JSON.parse(response);
                srcArray = this.json;
                this.atlasImage.src = 'Assets/' + srcArray.meta.image;
                var holder = [];
                for (var i = 0; i < srcArray.frames.length; i++) {
                    holder[i] = this.newAtlasSprite(srcArray.frames[i].filename);
                }
                ATLASCACHE[this.atlasKey[atlasPos]] = holder;
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
        }
        defineAtlasSprite(sourceAtlas, originX, originY, originW, originH) {
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
        newAtlasSprite(spriteName) {
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
        imageLoader(files) {
            //store each element in the cache for use in the program later on
            for (var file in files) {
                IMAGECACHE[file] = new Image();
                IMAGECACHE[file].onload = isLoaded++;
                IMAGECACHE[file].onerror = isError++;
                IMAGECACHE[file].src = files[file];
            }
        }
        atlasLoader(url) {
            this.atlasKey = Object.keys(url);
            for (var i = 0; i < this.atlasKey.length; i++) {
                this.loadJSON(url[this.atlasKey[i]], onJSONLoad);
            }
        }
    }
}
