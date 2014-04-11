var objects = [];
var Game;
(function (Game) {
    var Tilemap = (function () {
        function Tilemap() {
            var _this = this;
            this.setTileset = function (context, index) {
                for (var layeridX = 0; layeridX < TILEDATA_CACHE[index].layers.length; layeridX++) {
                    if (TILEDATA_CACHE[index].layers[layeridX].type === "tilelayer") {
                        var data = TILEDATA_CACHE[index].layers[layeridX].data;
                        for (var tileidX = 0; tileidX < data.length; tileidX++) {
                            var ID = data[tileidX];
                            if (ID === 0) {
                                continue;
                            }
                            var tileloc = _this.getTile(ID);

                            var worldX = Math.floor(tileidX % TILEDATA_CACHE[index].width) * TILEDATA_CACHE[index].tilewidth;
                            var worldY = Math.floor(tileidX / TILEDATA_CACHE[index].width) * TILEDATA_CACHE[index].tileheight;

                            _this.tileimg = tileloc.img;
                            _this.tilepx = tileloc.px;
                            _this.tilepy = tileloc.py;
                            _this.tilewidth = TILEDATA_CACHE[index].tilewidth;
                            _this.tileheight = TILEDATA_CACHE[index].tileheight;
                            _this.worldx = worldX;
                            _this.worldy = worldY;

                            context.drawImage(tileloc.img, tileloc.px, tileloc.py, TILEDATA_CACHE[index].tilewidth, TILEDATA_CACHE[index].tileheight, worldX, worldY, TILEDATA_CACHE[index].tilewidth, TILEDATA_CACHE[index].tileheight);
                        }
                    } else if (TILEDATA_CACHE[index].layers[layeridX].type === "objectgroup") {
                        var tileObjects = TILEDATA_CACHE[index].layers[layeridX].objects;
                        var obj = {
                            "name": "",
                            "type": "",
                            "properties": {
                                "ID": 0
                            },
                            "width": 0,
                            "x": 0,
                            "y": 0
                        };

                        for (var x = 0; x < tileObjects.length; x++) {
                            var tile = _this.getTile(tileObjects[x].gid);
                            if (tileObjects[x].width !== 0) {
                                obj.width = tileObjects[x].width;
                            } else {
                                obj.width = 32;
                            }
                            obj.name = tileObjects[x].name;
                            obj.type = tileObjects[x].type;
                            obj.properties.ID = tileObjects[x].properties.ID;
                            obj.x = tileObjects[x].x;
                            obj.y = tileObjects[x].y;
                            objects[x] = {
                                "name": obj.name,
                                "type": obj.type,
                                "properties": {
                                    "ID": obj.properties.ID
                                },
                                "width": obj.width,
                                "x": obj.x,
                                "y": obj.y
                            };

                            var w = TILEDATA_CACHE[index].tilewidth;
                            var h = TILEDATA_CACHE[index].tileheight;
                            _this.objimg = tile.img;
                            _this.objpx = tile.px;
                            _this.objpy = tile.py;
                            _this.objx = obj.x;
                            _this.objy = obj.y;
                            setStyle(context, 'Calibri', '12pt', 'black', 'bold', 'italic', 'center');
                            context.fillText(obj.name, obj.x + 10, obj.y - 10);
                            context.drawImage(tile.img, tile.px, tile.py, w, h, obj.x, obj.y, w, h);
                        }
                    }
                }
            };
            this.drawMap = function (mapcontext, objcontext) {
                mapcontext.drawImage(_this.tileimg, _this.tilepx, _this.tilepy, _this.tilewidth, _this.tileheight, _this.worldx, _this.worldy, _this.tilewidth, _this.tileheight);
                objcontext.drawImage(_this.objimg, _this.objpx, _this.objpy, _this.objw, _this.objh, _this.objx, _this.objy, _this.objw, _this.objh);
            };
        }
        Tilemap.prototype.Init = function () {
            this.key = [];
            this.key = Object.keys(TILESET_CACHE);
        };

        Tilemap.prototype.getTile = function (tileIndex) {
            var tile = {
                "img": null,
                "px": 0,
                "py": 0
            };

            var i = 0;
            for (i = 0; i < this.key.length; i--) {
                if (TILESET_CACHE[this.key[i]].firstgid <= tileIndex)
                    break;
            }
            tile.img = TILESET_CACHE[this.key[i]].image;
            var localIndex = tileIndex - TILESET_CACHE[this.key[i]].firstgid;
            var localtileX = Math.floor(localIndex % TILESET_CACHE[this.key[i]].numXTiles);
            var localtileY = Math.floor(localIndex / TILESET_CACHE[this.key[i]].numXTiles);
            tile.px = localtileX * TILEDATA_CACHE[this.key[i]].tilewidth;
            tile.py = localtileY * TILEDATA_CACHE[this.key[i]].tileheight;

            return tile;
        };

        Tilemap.prototype.addObject = function (obj) {
            objects.push({
                "height": obj.h,
                "name": obj.name,
                "properties": obj.prop,
                "type": obj.type,
                "visible": obj.visible,
                "width": obj.w,
                "x": obj.x,
                "y": obj.y
            });
        };
        Tilemap.prototype.updateObject = function (objName, obj) {
            for (var i = 0; i < objects.length; i++) {
                if (objName === objects[i].name) {
                    objects.push({
                        "height": obj.h,
                        "name": obj.name,
                        "properties": obj.prop,
                        "type": obj.type,
                        "visible": obj.visible,
                        "width": obj.w,
                        "x": obj.x,
                        "y": obj.y
                    });
                    break;
                }
            }
        };
        Tilemap.prototype.removeObject = function (objName) {
            for (var i = 0; i < objects.length; i++) {
                if (objName === objects[i].name) {
                    delete objects[i];
                }
            }
        };
        return Tilemap;
    })();
    Game.Tilemap = Tilemap;
})(Game || (Game = {}));
