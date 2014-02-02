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
var TILESET_CACHE = [];

module Preloader {
    export class Manager {
        atlasData: any; //Holds the parsed JSON for the atlases
        atlasImage: HTMLImageElement; //Holds source atlas image
        atlasKey: string[];//holds the key for each atlas. Each key is a reference to the actual atlas
        atlasPos: number; //current position in atlasKey array
        draw: Function; // Inner Function of the defineAtlasSprite to draw sprite onto screen
        height: number; //Height of Sprite
        holder: any; //Temp array for storing each sprite in the atlas
        isError: number; //Keeps track of each file loaded with error
        isFound: boolean; //Boolean to check if newAtlasSprite() finds the sprite given the key
        isLoaded: number; //Keeps track of each file loadded successfully
        numTilesX: number; //Number of Tiles in each row
        numTilesY: number; //Number of Tiles in each column
        pixelSizeX: number; //Width in pixels of entire Tilemap
        pixelSizeY: number; //Height in pixels of entire Tilemap
        scale: number; //Scaling size of sprite
        sprite: HTMLImageElement; // Holds the source atlas image for the specfic sprite
        srcArray: any; //Holds copy of JSON array 
        tileKey: any; //Holds the key for each tileset loaded
        isFilesLoaded; //check if all tiles are loaded
        tilesetPos; //Next key in the global tileset cache
        tileSizeX: number; //Width of each Tile
        tileSizeY: number; //Height of each Tile
        tiledData: any; //Holds the parsed JSON for the tilemap
        timerid;
        totalAssets: number; //Number of all assets, used to check if all files have loaded
        width: number; //Width of sprite
        x: number; //x Coordinate of sprite
        xmlKey;
        y: number; //y Coordinate of sprite

        constructor() {
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
        queueAssets(Assets, OnComplete) {
            var Assetkeys = Object.keys(Assets);
            for (var x = 0; x < Assetkeys.length; x++) {
                var itemkeys = Object.keys(Assets[Assetkeys[x]]);
                for (var y = 0; y < itemkeys.length; y++) {
                    this.totalAssets++;
                }
            }
            if (Assets.Images) { 
                this.imageLoader(Assets.Images);
            }
            if (Assets.Atlas) {
                this.atlasLoader(Assets.Atlas);
            }
            if (Assets.Tileset) {
                this.tilesetLoader(Assets.Tileset);
            }
            if (Assets.XML) {
                this.xmlLoader(Assets.XML);
            }
        }
        progress = () => {
            this.timerid = setInterval( () => {
                if (this.isLoaded === this.totalAssets) {
                    clearInterval(this.timerid); 
                    this.isFilesLoaded = true;
                    OnComplete();
                }
            }, 1000 / 1);    
        }
        loadfile(url, call, type) {
            var xobj = new XMLHttpRequest();
            xobj.open('GET', url, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == 200) {
                    if (type === 'json') {
                        call(xobj.responseText);
                    }
                    else if (type === 'xml') {
                        call(xobj.responseXML);
                    }
               }
            };
            xobj.send(null);
        }
        imageLoader(files) {
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
                this.loadfile(url[this.atlasKey[i]], this.onAtlasJSONLoad, 'json');
            }
        }
        onAtlasJSONLoad = (response) => { //Arrow function for onJSON load to prevent loss of this context
            this.holder = [];
            this.atlasData = JSON.parse(response);
            this.srcArray = this.atlasData;
            this.atlasImage.onload = () => { this.isLoaded++; };
            this.atlasImage.src = 'Assets/' + this.srcArray.meta.image;
            for (var i = 0; i < this.srcArray.frames.length; i++) {
                this.holder[i] = this.newAtlasSprite(this.srcArray.frames[i].filename);
            }
            ATLAS_CACHE[this.atlasKey[this.atlasPos]] = this.holder; //Store the holder array into the key of the ATLAS_CACHE
            this.atlasPos++; //Move to the next key of the array
        }
        tilesetLoader(url) {
            this.tileKey = Object.keys(url);
            for (var i = 0; i < this.atlasKey.length; i++) {
                this.loadfile(url[this.tileKey[i]], this.onTileJSONLoad, 'json');
            }
        }
        onTileJSONLoad = (response) => {
            this.tiledData = JSON.parse(response);
            this.numTilesX = this.tiledData.width;
            this.numTilesY = this.tiledData.height;
            this.tileSizeX = this.tiledData.tilewidth
            this.tileSizeY = this.tiledData.tileheight
            this.pixelSizeX = this.numTilesX * this.tileSizeX;
            this.pixelSizeY = this.numTilesY * this.tileSizeY;

            var tiledata = this.tiledData.tilesets;
            for (var i = 0; i < tiledata.length; i++){
                var tilesetimage = new Image();
                tilesetimage.onload = () => { this.isLoaded++;  };
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
                TILESET_CACHE[this.tileKey[this.tilesetPos]] = tileData;
                this.tilesetPos++;
            }
        }
        xmlLoader(url) {
            this.xmlKey = Object.keys(url);
            for (var x = 0; x < this.xmlKey.length; x++) {
                this.loadfile(url[this.xmlKey[x]], this.onXMLLoad, 'xml');
            }
        }
        onXMLLoad = (response) => {
            this.isLoaded++;
            var test = response;
            var xmltest = test.getElementsByTagName("Shadow");
            //rest to be implemented. not sure how to extract the info how i want yet...will do soon
        }
        //Functions to test if file are loaded and can be rendered properly 
        getTile = (tileIndex) => {
            var tile = {
                "img": null,
                "px": 0,
                "py" : 0
            };

            var index = 0;
            for (index = 0; index < this.tileKey.length; index--) {
                if (TILESET_CACHE[this.tileKey[index]].firstgid <= tileIndex) break;
            }
            tile.img = TILESET_CACHE[this.tileKey[index]].image;
            var localIndex = tileIndex - TILESET_CACHE[this.tileKey[index]].firstgid;
            var localtileX = Math.floor(localIndex % TILESET_CACHE[this.tileKey[index]].numXTiles);
            var localtileY = Math.floor(localIndex / TILESET_CACHE[this.tileKey[index]].numXTiles);
            tile.px = localtileX * this.tiledData.tilewidth;
            tile.py = localtileY * this.tiledData.tileheight;

            return tile;
        }
        drawTiles = (context) => {
            if (!this.isFilesLoaded) {
                console.log("tileset not loaded");
                return;
            }
            
            for (var layeridX = 0; layeridX < this.tiledData.layers.length; layeridX++) {
                if (this.tiledData.layers[layeridX].type !== "tilelayer") continue;
                
                var data = this.tiledData.layers[layeridX].data;
                for (var tileidX = 0; tileidX < data.length; tileidX++) {
                    var ID = data[tileidX];
                    if (ID === 0) { //If ID is 0, no tiles is at the current tile so skip ahead
                        continue;
                    }
                    var tileloc = this.getTile(ID);

                    var worldX = Math.floor(tileidX % this.tiledData.width) * this.tiledData.tilewidth;
                    var worldY = Math.floor(tileidX / this.tiledData.width) * this.tiledData.tileheight;

                    context.drawImage(tileloc.img, tileloc.px, tileloc.py, this.tiledData.tilewidth, this.tiledData.tileheight, worldX, worldY, this.tiledData.tilewidth, this.tiledData.tileheight);
                }
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
    }
}
