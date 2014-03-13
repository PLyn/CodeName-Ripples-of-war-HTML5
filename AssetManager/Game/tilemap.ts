var objects = [];
module Game {
    export class Tilemap {
        tileimg;
        tilepx;
        tilepy;
        tilewidth;
        tileheight;
        worldx;
        worldy;

        objimg;
        objpx;
        objpy;
        objw;
        objh;
        objx;
        objy;

        key; 
        Init() {
            this.key = [];
            this.key = Object.keys(TILESET_CACHE);
        }   
        //ALOT OF WORK LEFT TO DO HERE TO MAKE OBJECTS EASILY ALTERED and removed as needed
        //Functions to test if file are loaded and can be rendered properly 
        getTile (tileIndex){
            var tile = {
                "img": null,
                "px": 0,
                "py": 0
            };

            var i = 0;
            for (i = 0; i < this.key.length; i--) {
                if (TILESET_CACHE[this.key[i]].firstgid <= tileIndex) break;
            }
            tile.img = TILESET_CACHE[this.key[i]].image;
            var localIndex = tileIndex - TILESET_CACHE[this.key[i]].firstgid;
            var localtileX = Math.floor(localIndex % TILESET_CACHE[this.key[i]].numXTiles);
            var localtileY = Math.floor(localIndex / TILESET_CACHE[this.key[i]].numXTiles);
            tile.px = localtileX * TILEDATA_CACHE[this.key[i]].tilewidth;
            tile.py = localtileY * TILEDATA_CACHE[this.key[i]].tileheight;

            return tile;
        }
        setTileset = (context, index) => {
            //go back through this to see if its needed later on. might need a revamp or look through
            /*if (!this.isFilesLoaded) {
                console.log("tileset not loaded");
                return;
            }*/

            for (var layeridX = 0; layeridX < TILEDATA_CACHE[index].layers.length; layeridX++) {
                if (TILEDATA_CACHE[index].layers[layeridX].type === "tilelayer") {

                    var data = TILEDATA_CACHE[index].layers[layeridX].data;
                    for (var tileidX = 0; tileidX < data.length; tileidX++) {
                        var ID = data[tileidX];
                        if (ID === 0) { //If ID is 0, no tiles is at the current tile so skip ahead
                            continue;
                        }
                        var tileloc = this.getTile(ID);

                        var worldX = Math.floor(tileidX % TILEDATA_CACHE[index].width) * TILEDATA_CACHE[index].tilewidth;
                        var worldY = Math.floor(tileidX / TILEDATA_CACHE[index].width) * TILEDATA_CACHE[index].tileheight;


                        this.tileimg = tileloc.img;
                        this.tilepx = tileloc.px;
                        this.tilepy = tileloc.py;
                        this.tilewidth = TILEDATA_CACHE[index].tilewidth;
                        this.tileheight = TILEDATA_CACHE[index].tileheight;
                        this.worldx = worldX;
                        this.worldy = worldY;

                        context.drawImage(tileloc.img, tileloc.px, tileloc.py, TILEDATA_CACHE[index].tilewidth, TILEDATA_CACHE[index].tileheight, worldX, worldY, TILEDATA_CACHE[index].tilewidth, TILEDATA_CACHE[index].tileheight);
                    }
                }
                else if (TILEDATA_CACHE[index].layers[layeridX].type === "objectgroup") {
                    var tileObjects = TILEDATA_CACHE[index].layers[layeridX].objects;
                    var obj = {
                        "name": "",
                        "width": 0,
                        "x": 0,
                        "y": 0
                    };

                    for (var x = 0; x < tileObjects.length; x++) {
                        var tile = this.getTile(tileObjects[x].gid);
                        if (tileObjects[x].width !== 0) {
                            obj.width = tileObjects[x].width;
                        }
                        else {
                            obj.width = 32;//TILEDATA_CACHE[index].tilesets.tilewidth;
                        }
                        obj.name = tileObjects[x].name;
                        obj.x = tileObjects[x].x;
                        obj.y = tileObjects[x].y;
                        objects[x] = {
                            "name": obj.name,
                            "width": obj.width,
                            "x": obj.x,
                            "y": obj.y
                        };

                        var w = TILEDATA_CACHE[index].tilewidth;
                        var h = TILEDATA_CACHE[index].tileheight;
                        this.objimg = tile.img;
                        this.objpx = tile.px;
                        this.objpy = tile.py;
                        this.objx = obj.x;
                        this.objy = obj.y;
 
                        context.drawImage(tile.img, tile.px, tile.py, w, h, obj.x, obj.y, w, h);
                    }
                }
            } //end of function
        }
        drawMap = (mapcontext, objcontext) => {
            mapcontext.drawImage(this.tileimg, this.tilepx, this.tilepy, this.tilewidth, this.tileheight, this.worldx, this.worldy, this.tilewidth, this.tileheight); //draw map
            objcontext.drawImage(this.objimg, this.objpx, this.objpy, this.objw, this.objh, this.objx, this.objy, this.objw, this.objh); //draw objects
        }
    }
}