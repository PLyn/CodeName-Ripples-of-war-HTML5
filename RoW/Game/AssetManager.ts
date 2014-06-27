/*      HTML5 AssetManager V. 1.0
*   Currently supports images, Atlases(from texturepacker) for sprites or animation, tilesets, JSONs, xmls and sounds for now
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
var JSON_CACHE = [];
var isLoaded = 0;
var totalAssets = 0;
var tilesetPos = 0;
module Game {
    export class Preloader {
        animData; //Holds the parsed JSON for the atlases
        animSource = new Image(); //Holds source atlas image
        animkey = [];//holds the key for each atlas. Each key is a reference to the actual atlas
        animPos = 0; //current position in animkey array
        height = 0; //Height of Sprite
        isError = 0; //Keeps track of each file loaded with error
        isLoaded = 0; //Keeps track of each file loadded successfully
        jsonKey = [];
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
        /*
            takes the assets list and put each asset through the appropriate loader to preload the assets 
            then calls the callback function and clears the setinterval to continue the game
        */
        queueAssets(Assets, load) {
            //counts the total number of assets that are to be loaded
            var Assetkeys = Object.keys(Assets);
            for (var x = 0; x < Assetkeys.length; x++) {
                var itemkeys = Object.keys(Assets[Assetkeys[x]]);
                for (var y = 0; y < itemkeys.length; y++) {
                    totalAssets++;
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
            if (Assets.JSON) {
                this.genericLoader(Assets.JSON, false, this.jsonKey, this.onJSONLoad, 'json');
            }
            if (Assets.Sounds) {
                this.soundloader(Assets.Sounds, 'Sound');
            }
            if (Assets.Music) {
                this.soundloader(Assets.Music, 'Music');
            }
            var that = this;
            //if files are loaded then proceed to call the callback
            this.timerid = setInterval(function () {
                if (isLoaded >= totalAssets) {
                    clearInterval(that.timerid);
                    load();
                }
            }, 1000 / 1);
        }
        /*
            takes the assets, determines if it is an image or not then put it in the loadfile function to be identified further
        */
        genericLoader(url, isImage, key?, onLoad?, typeOfFile?) {
            //if the asset is an image, load the image
            if (isImage) {
                for (var file in url) {
                    IMAGE_CACHE[file] = new Image();
                    IMAGE_CACHE[file].onload = isLoaded++;
                    IMAGE_CACHE[file].onerror = this.isError++;
                    IMAGE_CACHE[file].src = url[file];
                }
            }
            //else it will call the loadfile function to parse it
            else {
                key = Object.keys(url);
                for (var i = 0; i < key.length; i++) {
                    this.loadfile(key, url[key[i]], onLoad, typeOfFile, i);
                }
            }
        }
        /*
            Loader specifically for music and sounds which stores them in the global variables MUSIC_CACHE and SOUND_CACHE respectively
        */
        soundloader(sounds, type) {
            var pos;
            var key = Object.keys(sounds);
            var audioType = '';
            for (pos = 0; pos < key.length; pos++) {
                if (type === 'Sound') {
                    //creates audio element
                    SOUND_CACHE[key[pos]] = document.createElement("audio"); 
                    //append it to the body of the document 
                    document.body.appendChild(SOUND_CACHE[key[pos]]);
                    //gets sound format after checking which format can be played by the browser
                    audioType = this.soundFormat(SOUND_CACHE[key[pos]]);
                    SOUND_CACHE[key[pos]].setAttribute("src", sounds[key[pos]] + audioType);
                    SOUND_CACHE[key[pos]].load();
                    SOUND_CACHE[key[pos]].addEventListener('canplaythrough', function (){
                        isLoaded++;
                    });
                }
                else if (type === 'Music') {
                    MUSIC_CACHE[key[pos]] = document.createElement("audio");
                    document.body.appendChild(MUSIC_CACHE[key[pos]]);
                    //gets sound format after checking which format can be played by the browser
                    audioType = this.soundFormat(MUSIC_CACHE[key[pos]]);
                    MUSIC_CACHE[key[pos]].setAttribute("src", sounds[key[pos]] + audioType);
                    MUSIC_CACHE[key[pos]].load();
                    MUSIC_CACHE[key[pos]].addEventListener('canplaythrough', function(){
                        isLoaded++;
                    });
                }
            }
        }
        /*
            checks the browsers capability and determines if it can play certain formats and returns a hopefully 
            playable format for the audio
        */
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
        /*
            Takes the assets and based on the type, calls the appropriate request to get the data correctly
        */
        loadfile(key, url, onLoad, type, pos?) {
            //makes request to server to get file needed
            var xobj = new XMLHttpRequest();
            xobj.open('GET', url, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == 200) {
                    if (type === 'json') {
                        //gets JSON response to be parsed and pass it to the callback
                        onLoad(key, xobj.responseText, pos);
                    }
                    else if (type === 'xml') {
                        //gets XML response to be parsed and pass it to the callback
                        onLoad(key, xobj.responseXML, pos);
                    }
               }
            };
            xobj.send(null);
        }
        /*
            callback for Animation assets, takes each frame, makes a gameObject of it then stores all the frames for each animation 
            in its own holder with the key used in the asset list as the key to access it in the ANIM_CACHE
        */
        onAnimJSONLoad = (key, response) => { //Arrow function to prevent loss of this context
            var holder = [];
            var frame;
            this.animData = JSON.parse(response);
            
            this.animSource.onload = () => { isLoaded++; };
            this.animSource.src = 'Assets/Atlas/' + this.animData.meta.image;
            for (var i = 0; i < this.animData.frames.length; i++) {
                frame = this.animData.frames[i].frame;
                holder[i] = new Game.GameObject("", this.animSource, 0, 0, frame.x, frame.y, frame.w, frame.h);
            }
            ANIM_CACHE[key[this.animPos]] = holder; //Store the holder array into the key of the ANIM_CACHE
            this.animPos++; //Move to the next key of the array
        }
         /*
            callback for Animation assets, takes each frame, makes a gameObject of it then stores each sprite in its respective index using the key from the asset list
        */
        onSpriteJSONLoad = (key, response) => {
            var holder = [];
            
            this.spriteData = JSON.parse(response);
            this.spriteSource.onload = () => {
                isLoaded++;
            }
            this.spriteSource.src = 'Assets/Atlas/' + this.spriteData.meta.image;
            for (var i = 0; i < this.spriteData.frames.length; i++) {
                var frame = this.spriteData.frames[i].frame;

                var indexes = this.spriteData.frames[i].filename.substring(0, this.spriteData.frames[i].filename.length - 4);
                holder[i] = new Game.GameObject("", this.spriteSource, 0, 0 ,frame.x, frame.y, frame.w, frame.h);
                SPRITE_CACHE[i] = holder[i];
            }           
            this.spritePos++;
        }
        /*
            callback for tilemap assets, gets the data about the tilesets and use it to store information needed to draw the tilemaps such as the number of tiles 
            horizontally and vertically and the width and height of each tile as well as the firstgid, tileset image and name. TILESET_CACHE holds all of this data
            and the TILEDATA_CACHE holds the metadata about the tileset from the JSON file.
        */
        onTileJSONLoad = (key, response, pos) => {
            this.tiledData = JSON.parse(response);
            this.numTilesX = this.tiledData.width;
            this.numTilesY = this.tiledData.height;
            this.tileSizeX = this.tiledData.tilewidth;
            this.tileSizeY = this.tiledData.tileheight;

            //Tileset data from json file
            var tiledata = this.tiledData.tilesets;
            var tileset_holder = [];
            for (var i = 0; i < tiledata.length; i++){
                var tilesetimage = new Image();
                tilesetimage.onload = () => { isLoaded++; };
                //gets rid of unneeded symbols in url
                tilesetimage.src = "Assets/Tilemap/" + tiledata[i].image.replace(/^.*[\\\/]/, '');
                var tileData = {
                    "firstgid": tiledata[i].firstgid,
                    "image": tilesetimage,
                    "imageheight": tiledata[i].imageheight,
                    "imagewidth": tiledata[i].imagewidth,
                    "name": tiledata[i].name,
                    "numXTiles": Math.floor(tiledata[i].imagewidth / this.tileSizeX),
                    "numYTiles": Math.floor(tiledata[i].imageheight / this.tileSizeY)
                    
                };
                //store tileset in holder
                tileset_holder.push(tileData);

                this.tileKey = key;
            }
            //TILESET holds the actual tilesets 
            //TILEDATA holds the metadata about each tileset
            TILESET_CACHE[key[pos]] = tileset_holder;
            TILEDATA_CACHE[key[pos]] = this.tiledData;
        }
        /*
            callback for xml assets. gets the xml file received from the xhr request and stores it in the id used in the asset list as its index
            in XML_CACHE
        */
        onXMLLoad = (key, response, pos) => {
            XML_CACHE[key[pos]] = response;
            isLoaded++;
            //rest to be implemented. not sure how to extract the info how i want yet...will do soon
            //saved xml file iin the global variable to be used later on as needed
        }
        /*
            callback for json assets. it parses the JSON recieved by the xhr requests and stores them in indexes indicated by the asset list
        */
        onJSONLoad = (key, response, pos) => {
            JSON_CACHE[key[pos]] = JSON.parse(response);
            isLoaded++;
        }
    }
}
