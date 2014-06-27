module Game {
    export class Tilemap {
        currentIndex;
        //given a gid of a tile, it gets the metadata about the tile and returns it
        getTile(tileIndex, index) {
            var tile = {
                "img": null,
                "px": 0,
                "py": 0
            };

            var i = 0;
            var key = Object.keys(TILESET_CACHE[index]);
            var tileset = TILESET_CACHE[index];
            for (i = (key.length - 1); i > 0; i--) {
                if (tileset[i].firstgid <= tileIndex) break;
            }
            tile.img = tileset[i].image;
            var localIndex = (tileIndex - tileset[key[i]].firstgid);
            var localtileX = Math.floor((tileIndex - tileset[key[i]].firstgid) % tileset[key[i]].numXTiles);
            var localtileY = Math.floor((tileIndex - tileset[key[i]].firstgid) / tileset[key[i]].numXTiles);
            tile.px = localtileX * TILEDATA_CACHE[index].tilesets[i].tilewidth;
            tile.py = localtileY * TILEDATA_CACHE[index].tilesets[i].tileheight;

            return tile;
        }
        /*
            goes through each layer of the tileset and calculates the destination and draws it
        */
        setTileset = (context, index) => {
            this.currentIndex = index;
            objects = [];
            for (var layeridX = 0; layeridX < TILEDATA_CACHE[index].layers.length; layeridX++) {
                //process tile layers
                if (TILEDATA_CACHE[index].layers[layeridX].type === "tilelayer") {

                    var data = TILEDATA_CACHE[index].layers[layeridX].data;

                    for (var tileidX = 0; tileidX < data.length; tileidX++) {
                        var ID = data[tileidX];
                        if (ID === 0) { //If ID is 0, no tiles is at the current tile so skip ahead
                            continue;
                        }
                        var tileloc = this.getTile(ID, index);

                        var worldX = Math.floor(tileidX % TILEDATA_CACHE[index].width) * TILEDATA_CACHE[index].tilewidth;
                        var worldY = Math.floor(tileidX / TILEDATA_CACHE[index].width) * TILEDATA_CACHE[index].tileheight;

                        context.drawImage(tileloc.img, tileloc.px, tileloc.py, TILEDATA_CACHE[index].tilewidth, TILEDATA_CACHE[index].tileheight, worldX, worldY, TILEDATA_CACHE[index].tilewidth, TILEDATA_CACHE[index].tileheight);
                    }
                }
                //process object layers
                else if (TILEDATA_CACHE[index].layers[layeridX].type === "objectgroup") {
                    var tileObjects = TILEDATA_CACHE[index].layers[layeridX].objects;
                    objects = [];
                    for (var x = 0; x < tileObjects.length; x++) {
                        var tile = this.getTile(tileObjects[x].gid, index);

                        var w = TILEDATA_CACHE[index].tilewidth;
                        var h = TILEDATA_CACHE[index].tileheight;

                        var y = tileObjects[x].y ;
                        setStyle(context, 'Calibri', '12pt', 'black', 'bold', 'italic', 'center');
                        context.drawImage(tile.img, tile.px, tile.py, w, h, tileObjects[x].x, y, w, h);
                        context.fillText(tileObjects[x].name, tileObjects[x].x + 32, y - 10);
                        if (tileObjects[x].type === "exit") {
                            objects[x] = {
                                "gid": tileObjects[x].gid,
                                "name": tileObjects[x].name,
                                "type": tileObjects[x].type,
                                "properties": {
                                    "Type": tileObjects[x].properties.Type,
                                    "ID": tileObjects[x].properties.ID
                                },
                                "width": w,
                                "x": tileObjects[x].x,
                                "y": y
                            };
                        }
                        else {
                            objects[x] = {
                                "gid": tileObjects[x].gid,
                                "name": tileObjects[x].name,
                                "type": tileObjects[x].type,
                                "properties": {
                                    "Type": 0,
                                    "ID": tileObjects[x].properties.ID
                                },
                                "width": w,
                                "x": tileObjects[x].x,
                                "y": y
                            };
                        }
                    }
                }
            } //end of function
        }
        /*
            this redraws the map but does not pull from the json again, instead it draws the all the tiles which include tiles or objects 
            which were progrommatically modified.
        */
        drawMapNoObjectReset = (context, mapID) => {
            for (var layeridX = 0; layeridX < TILEDATA_CACHE[mapID].layers.length; layeridX++) {
                if (TILEDATA_CACHE[mapID].layers[layeridX].type === "tilelayer") {
                    var data = TILEDATA_CACHE[mapID].layers[layeridX].data;
                    for (var tileidX = 0; tileidX < data.length; tileidX++) {
                        var ID = data[tileidX];
                        if (ID === 0) { //If ID is 0, no tiles is at the current tile so skip ahead
                            continue;
                        }
                        var tileloc = this.getTile(ID, mapID);

                        var worldX = Math.floor(tileidX % TILEDATA_CACHE[mapID].width) * TILEDATA_CACHE[mapID].tilewidth;
                        var worldY = Math.floor(tileidX / TILEDATA_CACHE[mapID].width) * TILEDATA_CACHE[mapID].tileheight;
                        context.drawImage(tileloc.img, tileloc.px, tileloc.py, TILEDATA_CACHE[mapID].tilewidth, TILEDATA_CACHE[mapID].tileheight, worldX, worldY, TILEDATA_CACHE[mapID].tilewidth, TILEDATA_CACHE[mapID].tileheight);
                    }
                }
                else if (TILEDATA_CACHE[mapID].layers[layeridX].type === "objectgroup") {
                    for (var x = 0; x < objects.length; x++) {
                        var tile = this.getTile(objects[x].gid, mapID);

                        var w = TILEDATA_CACHE[mapID].tilewidth;
                        var h = TILEDATA_CACHE[mapID].tileheight;

                        setStyle(context, 'Calibri', '12pt', 'black', 'bold', 'italic', 'center');
                        context.drawImage(tile.img, tile.px, tile.py, w, h, objects[x].x, objects[x].y, w, h);
                        context.fillText(objects[x].name, objects[x].x + 32, objects[x].y - 10);
                    }
                }
            }
        }
    }
}