/*      HTML5 AssetManager V. 0.9
*   Currently supports images, Atlases(from texturepacker) for sprites or animation, tilesets and loading of xml for now
*   how to use:
*       var source = {
*        Images: {
*            D: 'Assets/diamond.png',
*            S: 'Assets/star.png'
*        },
*        Anim: {
*            at: 'Assets/test.json'
*        },
*        Sprite: {
*            spr: 'Assets/test.json'
*        },
*        Tileset: {
*            rpg: 'Assets/map.json'
*        },
*        XML: {
*            chapter: 'Assets/test.xml'
*        }
*    };
*    asset = new Preloader.Manager();
*    asset.queueAssets(source, OnComplete);
*    asset.progress();
*
*   function OnComplete(){
*   //do what you need with loaded assets now which are in global variables seen at below(IMAGE_CACHE, ANIM_CACHE etc)
*    }
*/
var ANIM_CACHE = []; //Global atlas cache to get specific atlases
var IMAGE_CACHE = []; //Global image cache to get specific images
var SPRITE_CACHE = []; //Global sprite cache to get specific sprite
var TILESET_CACHE = []; //Global Tileset cache to get specific tilesets
var XML_CACHE = []; //Global xml cache to get specific xml files

module Preloader {
    export class Manager {
        animData; //Holds the parsed JSON for the atlases
        animSource = new Image(); //Holds source atlas image
        animkey = [];//holds the key for each atlas. Each key is a reference to the actual atlas
        animPos = 0; //current position in animkey array
        height = 0; //Height of Sprite
        isError = 0; //Keeps track of each file loaded with error
        isLoaded = 0; //Keeps track of each file loadded successfully
        numTilesX = 0; //Number of Tiles in each row
        numTilesY = 0; //Number of Tiles in each column
        pixelSizeX = 0; //Width in pixels of entire Tilemap
        pixelSizeY = 0; //Height in pixels of entire Tilemap
        scale = 0; //Scaling size of sprite
        sprite = new Image(); // Holds the source atlas image for the specfic sprite
        spriteData; //Holds Parsed JSON data for sprite atlas
        spritekey = []; //Holds the keys of the SPRITE_CACHE array
        spritePos = 0; //Current position of the loop in the SPRITECACHE array
        spriteSource = new Image(); //Holds atlas image for sprite atlas
        tileKey; //Holds the key for each tileset loaded
        isFilesLoaded = false; //check if all tiles are loaded
        tilesetPos = 0; //Next key in the global tileset cache
        tileSizeX = 0; //Width of each Tile
        tileSizeY = 0; //Height of each Tile
        tiledData; //Holds the parsed JSON for the tilemap
        timerid; //keep track of progress til its done loading
        totalAssets = 0; //Number of all assets, used to check if all files have loaded
        width = 0; //Width of sprite
        x = 0; //x Coordinate of sprite
        xmlKey; //The keys for the XML_CACHE array when it is being used
        y = 0; //y Coordinate of sprite

        queueAssets(Assets, OnComplete) {
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
            if (Assets.Anim) {
                this.genericLoader(Assets.Anim, false, this.animkey, this.onAnimJSONLoad, 'json');
            }
            if (Assets.Sprite) {
                this.genericLoader(Assets.Sprite, false, this.spritekey, this.onSpriteJSONLoad, 'json');
            }
            if (Assets.Tileset) {
                this.genericLoader(Assets.Tileset, false, this.tileKey, this.onTileJSONLoad, 'json');
            }
            if (Assets.XML) {
                this.genericLoader(Assets.XML, false, this.xmlKey, this.onXMLLoad, 'xml');
            }
        }
        genericLoader(url, isImage, key?, onLoad?, typeOfFile?) {
            if (isImage) {
                for (var file in url) {
                    IMAGE_CACHE[file] = new Image();
                    IMAGE_CACHE[file].onload = this.isLoaded++;
                    IMAGE_CACHE[file].onerror = this.isError++;
                    IMAGE_CACHE[file].src = url[file];
                }
            }
            else {
                key = Object.keys(url);
                for (var i = 0; i < key.length; i++) {
                    this.loadfile(key, url[key[i]], onLoad, typeOfFile);
                }
            }
        }
        loadfile(key, url, onLoad, type) {
            var xobj = new XMLHttpRequest();
            xobj.open('GET', url, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == 200) {
                    if (type === 'json') {
                        onLoad(key, xobj.responseText);
                    }
                    else if (type === 'xml') {
                        onLoad(key, xobj.responseXML);
                    }
               }
            };
            xobj.send(null);
        }
        onAnimJSONLoad = (key, response) => { //Arrow function for onJSON load to prevent loss of this context
            var holder = [];
            var frame;
            this.animData = JSON.parse(response);
            
            this.animSource.onload = () => { this.isLoaded++; };
            this.animSource.src = 'Assets/' + this.animData.meta.image;
            for (var i = 0; i < this.animData.frames.length; i++) {
                frame = this.animData.frames[i].frame;
                holder[i] = new Objects.GameObject(this.spriteSource, frame.x, frame.y, frame.w, frame.h);
            }
            ANIM_CACHE[key[this.animPos]] = holder; //Store the holder array into the key of the ANIM_CACHE
            this.animPos++; //Move to the next key of the array
        }
        onSpriteJSONLoad = (key, response) => {
            var holder = [];
            
            this.spriteData = JSON.parse(response);
            this.spriteSource.onload = () => {
                this.isLoaded++;
            }
            this.spriteSource.src = 'Assets/' + this.spriteData.meta.image;
            for (var i = 0; i < this.spriteData.frames.length; i++) {
                var frame = this.spriteData.frames[i].frame;
                //figure out whats wrong with the associative array
                var indexes = this.spriteData.frames[i].filename.substring(0, this.spriteData.frames[i].filename.length - 4);
                holder[i] = new Objects.GameObject(this.spriteSource, frame.x, frame.y, frame.w, frame.h);
                SPRITE_CACHE[i] = holder[i];
            }           
            this.spritePos++;
        }
        onTileJSONLoad = (key, response) => {
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
                TILESET_CACHE[key[this.tilesetPos]] = tileData;
                this.tilesetPos++;
                this.tileKey = key;//needed for getTile ()
            }
        }
        onXMLLoad = (key, response) => {
            var test = response;
            var xmltest = test.getElementsByTagName("Shadow");
            this.isLoaded++;
            //rest to be implemented. not sure how to extract the info how i want yet...will do soon
        }
        progress = () => {
            this.timerid = setInterval(() => {
                if (this.isLoaded === this.totalAssets) {
                    clearInterval(this.timerid);
                    this.isFilesLoaded = true;
                    OnComplete();
                }
            }, 1000 / 1);
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
    }
}
