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
var ATLAS_CACHE = []; //Global atlas cache to get specific atlases
var IMAGE_CACHE = []; //Global image cache to get specific atlases

module Preloader {
    export class Manager {
        atlasImage: HTMLImageElement; //Holds source atlas image
        atlasKey: string[];//holds the key for each atlas. Each key is a reference to the actual atlas
        atlasPos: number; //current position in atlasKey array
        draw: Function; // Inner Function of the defineAtlasSprite to draw sprite onto screen
        height: number; //Height of Sprite
        isError: number; //Keeps track of each file loaded with error
        isFound: boolean; //Boolean to check if newAtlasSprite() finds the sprite given the key
        isLoaded: number; //Keeps track of each file loadded successfully
        json: any; //Holds the parsed JSON array from the atlasLoader
        onJSONLoad: Function; //Variable that holds the OnJSONLoad arrow function to solve the closure issue with the this context
        scale: number; //Scaling size of sprite
        sprite: HTMLImageElement; // Holds the source atlas image for the specfic sprite
        srcArray: any; //Holds copy of JSON array 
        total_Assets: number; //Number of all assets, used to check if all files have loaded
        width: number; //Width of sprite
        x: number; //x Coordinate of sprite
        y: number; //y Coordinate of sprite
        constructor() {
            this.atlasImage = new Image();
            this.atlasKey = [];
            this.atlasPos = 0;
            this.height = 0;
            this.isError = 0;
            this.isFound = false;
            this.isLoaded = 0;
            this.scale = 0;
            this.total_Assets = 0;
            this.width = 0;
            this.x = 0;
            this.y = 0;
        }
        queueAssets(Assets, OnComplete) {
            this.onJSONLoad = (response) => { //Arrow function for onJSON load to prevent loss of this context
                var holder = []; //Temp array for storing each sprite in the atlas
                this.json = JSON.parse(response); 
                this.srcArray = this.json;
                this.atlasImage.src = 'Assets/' + this.srcArray.meta.image;              
                for (var i = 0; i < this.srcArray.frames.length; i++) {
                    holder[i] = this.newAtlasSprite(this.srcArray.frames[i].filename);
                }
                ATLAS_CACHE[this.atlasKey[this.atlasPos]] = holder; //Store the entire holder array into one key of the ATLAS_CACHE
                this.atlasPos++;
                OnComplete(); //Callback function when the function is done
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
                IMAGE_CACHE[file] = new Image();
                IMAGE_CACHE[file].onload = this.isLoaded++;
                IMAGE_CACHE[file].onerror = this.isError++;
                IMAGE_CACHE[file].src = files[file];
            }
        }
        atlasLoader(url) {
            this.atlasKey = Object.keys(url);
            for (var i = 0; i < this.atlasKey.length; i++) {
                this.loadJSON(url[this.atlasKey[i]], this.onJSONLoad);
            }
        }
    }
}
