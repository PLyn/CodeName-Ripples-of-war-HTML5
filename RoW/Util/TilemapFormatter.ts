/*
    takes json file of a map, takes each layer of the tilemap and store it in one big 2d array
    then using the terrains specified in the json to determine if each index is walkable or not
    if it is walkable the value is changed to 0
*/
function FormatTilemap(mapID) {
    var map = new Array(TILEDATA_CACHE[mapID].layers[0].height);
    var declareArray = true;
    for (var x = 0; x < TILEDATA_CACHE[mapID].layers.length; x++) {
        if (TILEDATA_CACHE[mapID].layers[x].type === "tilelayer") {
            for (var y = 0; y < TILEDATA_CACHE[mapID].layers[x].height; y++) {
                declareArray = true;
                //if this is a new row in the array, declare the array
                for (var z = 0; z < TILEDATA_CACHE[mapID].layers[x].width; z++) {
                    if (declareArray) {
                        map[y] = new Array(TILEDATA_CACHE[mapID].layers[x].width);
                        declareArray = false;
                    }
                    var index = (y * TILEDATA_CACHE[mapID].layers[x].width) + z; //gets the next index
                    var data = TILEDATA_CACHE[mapID].layers[x].data; //the data array of tilemap
                    map[y][z] = data[index];
                }
            }
        }
    }
    //after map has been stored in 2d array, determine the walkable or non walkable tiles
    var walkable = TILEDATA_CACHE[mapID].tilesets[0].tiles;
    var wkeys = Object.keys(walkable);
    for (var i = 0; i < 9; i++) {
        for (var e = 0; e < 9; e++) {
            for (var l = 0; l < wkeys.length; l++) {
                if (map[i][e] === (+wkeys[l])) {
                    map[i][e] = 0;
                }
            }
        }
    }
    return map;
}