/*      HTML5 AssetManager V. 0.95
*   Currently supports images, Atlases(from texturepacker) for sprites or animation, tilesets, xmls and sounds for now
*   how to use:
*/
var ANIM_CACHE = []; //Global atlas cache to get specific atlases
var IMAGE_CACHE = []; //Global image cache to get specific images
var SPRITE_CACHE = []; //Global sprite cache to get specific sprite
var TILESET_CACHE = []; //Global Tileset cache to get specific tilesets
var TILEDATA_CACHE = []; //global tile data to draw tilemaps
var XML_CACHE = []; //Global xml cache to get specific xml files
var SOUND_CACHE = []; //Global sounds cache
var MUSIC_CACHE = []; //Global Music cache

module Game {
    export class Preloader {
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

        queueAssets(Assets, load) {
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
            if (Assets.Sounds) {
                this.soundloader(Assets.Sounds, 'Sound');
            }
            if (Assets.Music) {
                this.soundloader(Assets.Music, 'Music');
            }
            this.timerid = setInterval(() => {
                if (this.isLoaded === this.totalAssets) {
                    clearInterval(this.timerid);
                    this.isFilesLoaded = true;
                    load();
                }
            }, 1000 / 2);
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
        soundloader(sounds, type) {
            var pos;
            var key = Object.keys(sounds);
            var audioType = '';
            for (pos = 0; pos < key.length; pos++) {
                if (type === 'Sound') {
                    SOUND_CACHE[key[pos]] = document.createElement("audio");  
                    document.body.appendChild(SOUND_CACHE[key[pos]]);
                    audioType = this.soundFormat(SOUND_CACHE[key[pos]]);
                    SOUND_CACHE[key[pos]].setAttribute("src", sounds[key[pos]] + audioType);
                    SOUND_CACHE[key[pos]].load();
                    SOUND_CACHE[key[pos]].addEventListener('canplaythrough', () => {
                        this.isLoaded++;
                    });
                }
                else if (type === 'Music') {
                    MUSIC_CACHE[key[pos]] = document.createElement("audio");
                    document.body.appendChild(MUSIC_CACHE[key[pos]]);
                    audioType = this.soundFormat(MUSIC_CACHE[key[pos]]);
                    MUSIC_CACHE[key[pos]].setAttribute("src", sounds[key[pos]] + audioType);
                    MUSIC_CACHE[key[pos]].load();
                    MUSIC_CACHE[key[pos]].addEventListener('canplaythrough', () => {
                        this.isLoaded++;
                    });
                }
            }
        }
        soundFormat(audioElement) {
            var ext = '';
            if (audioElement.canPlayType("audio/ogg") === "probably" || audioElement.canPlayType("audio/ogg") === "maybe") {
                ext = '.ogg';
            }
            else if (audioElement.canPlayType("audio/mp3") === "probably" || audioElement.canPlayType("audio/mp3") === "maybe") {
                ext = '.mp3';
            }
            return ext;
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
                    else if (type === 'mp3') {
                        onLoad(key, xobj.response);
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
            this.animSource.src = 'Assets/Atlas/' + this.animData.meta.image;
            for (var i = 0; i < this.animData.frames.length; i++) {
                frame = this.animData.frames[i].frame;
                holder[i] = new Game.GameObject(this.spriteSource, frame.x, frame.y, frame.w, frame.h);
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
            this.spriteSource.src = 'Assets/Atlas/' + this.spriteData.meta.image;
            for (var i = 0; i < this.spriteData.frames.length; i++) {
                var frame = this.spriteData.frames[i].frame;
                //figure out whats wrong with the associative array
                var indexes = this.spriteData.frames[i].filename.substring(0, this.spriteData.frames[i].filename.length - 4);
                holder[i] = new Game.GameObject(this.spriteSource, frame.x, frame.y, frame.w, frame.h);
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
                tilesetimage.src = "../Assets/Tilemap/" + this.tiledData.tilesets[i].image.replace(/^.*[\\\/]/, '');
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
                TILEDATA_CACHE[key[this.tilesetPos]] = this.tiledData;
                this.tilesetPos++;
                this.tileKey = key;//needed for getTile ()
            }
        }
        onXMLLoad = (key, response) => {
            XML_CACHE[key] = response;
            this.isLoaded++;
            //rest to be implemented. not sure how to extract the info how i want yet...will do soon
            //saved xml file iin the global variable to be used later on as needed
        }
    }
}
