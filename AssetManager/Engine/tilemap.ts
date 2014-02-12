module Game {
    export class Tilemap {
        key; 

        Init() {
            this.key = [];
            this.key = Object.keys(TILESET_CACHE);

        }
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
        drawTiles = (context, index) => {
            /*if (!this.isFilesLoaded) {
                console.log("tileset not loaded");
                return;
            }*/

            for (var layeridX = 0; layeridX < TILEDATA_CACHE[index].layers.length; layeridX++) {
                if (TILEDATA_CACHE[index].layers[layeridX].type !== "tilelayer") continue;

                var data = TILEDATA_CACHE[index].layers[layeridX].data;
                for (var tileidX = 0; tileidX < data.length; tileidX++) {
                    var ID = data[tileidX];
                    if (ID === 0) { //If ID is 0, no tiles is at the current tile so skip ahead
                        continue;
                    }
                    var tileloc = this.getTile(ID);

                    var worldX = Math.floor(tileidX % TILEDATA_CACHE[index].width) * TILEDATA_CACHE[index].tilewidth;
                    var worldY = Math.floor(tileidX / TILEDATA_CACHE[index].width) * TILEDATA_CACHE[index].tileheight;

                    context.drawImage(tileloc.img, tileloc.px, tileloc.py, TILEDATA_CACHE[index].tilewidth, TILEDATA_CACHE[index].tileheight, worldX, worldY, TILEDATA_CACHE[index].tilewidth, TILEDATA_CACHE[index].tileheight);
                }
            }
        }
    }
}