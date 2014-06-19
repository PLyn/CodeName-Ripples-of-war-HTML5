///<reference path='State.ts' />
module Game {
    export class Explore extends State {
        x;
        y;
        mx;
        my;

        layer1ctx;
        layer2ctx;
        mapID;
        map;
        startY;
        startX;
        constructor(ctx, mapID) {
            super();
            this.x = 0;
            this.y = 0;
            this.mx = 0;
            this.my = 0;
            this.mapID = mapID;
            var canvas = <HTMLCanvasElement> document.getElementById('layer2');
            this.layer2ctx = canvas.getContext('2d');
            var canvas2 = <HTMLCanvasElement> document.getElementById('layer1');
            this.layer1ctx = canvas2.getContext('2d');
            this.startY = (5 * 32) + 16;
            this.startX = (5 * 32) + 16;
        }
        init() {
            //cleas both layers
            this.layer1ctx.clearRect(0, 0, 800, 600);
            this.layer2ctx.clearRect(0, 0, 800, 600);
            //takes the mapid and the layer then gets all the tiles and objects to draw the map
            TileMap.setTileset(this.layer1ctx, this.mapID);
            //menu button
            this.layer1ctx.drawImage(IMAGE_CACHE['menu'], 5, 5);
            //sets characters position on the map
            battleList[0].setPos(this.startX, this.startY);
            //draws character
            this.layer2ctx.drawImage(battleList[0].img, battleList[0].dx, battleList[0].dy);
            //bounds for menu
            objects.push(
                  {
                    "height": 75,
                    "name": "menu",
                    "properties":
                    {
                    },
                    "type": "menu",
                    "visible": true,
                    "width": 75,
                    "x": 5,
                    "y": 5
                }
                );
            /*
                takes the map json and converts it to a array where 0 is walkable terrain and >= 1 is unwalkable terrain for pathfinding purposes
            */
            this.map = FormatTilemap(this.mapID);
            //if there is a autostart quest for this map based on the location Map then it is started
            var questAutoStart = QUEST.Switch[this.mapID];
            if (questAutoStart) {
                sManager.pushState(new Cutscene(this.layer2ctx, JSON_CACHE['location'][this.mapID][this.mapID]['ID'], this.mapID));
                QUEST.Switch[this.mapID] = false;
            }

        }
        update() {
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var i = 0; i < objects.length; i++) {
                    var x1 = objects[i].x;
                    var x2 = objects[i].x + objects[i].width;
                    var y1 = objects[i].y;
                    var y2 = objects[i].y + objects[i].width;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {  
                        var path = [];   
                        /*
                            gets the floor of the users input coordinates to determine which tile they clicked on then
                            then determines the indexs of x and y which form the path between the current position to the
                            position clicked on
                        */
                        path = findPath(this.map, [5, 5], [Math.floor(this.mx / 32), Math.floor(this.my / 32)]);
                        var keys = Object.keys(path);
                        var ctx = this.layer2ctx;
                        var x = 0;
                        //bypass the pathfinding if you click on a exit or menu
                        if (objects[i].type === 'menu' || objects[i].type === 'exit') {
                            this.nextState(i);
                        }
                        if (typeof path !== 'undefined' && path.length > 0) {
                            if (objects[i].type !== 'menu') {
                                var timer = setInterval(() => {
                                    var coords = moveSprite(ctx, battleList[0].dx, battleList[0].dy, path[x][0], path[x][1]);
                                    battleList[0].setPos(coords.x, coords.y);
                                    ctx.clearRect(0, 0, 800, 600);
                                    ctx.drawImage(battleList[0].img, battleList[0].dx, battleList[0].dy);
                                    x++;
                                    if (x >= (keys.length - 1)) {
                                        clearInterval(timer);
                                        this.nextState(i);
                                    }
                                }, 1000 / 5);
                            }
                        }
                        else {
                            this.nextState(i);
                        }
                        break;
                    }
                }
            }
        }
        //determines and changes the state to the next state
        nextState(i) {
            if (objects[i].type === 'exit') {
                if (objects[i].properties.Type === "0") {//EXIT TO WORLD
                    sManager.popState();
                    sManager.pushState(new Explore(this.layer2ctx, objects[i].properties.ID));
                }
                else if (objects[i].properties.Type === "1") {//EXIT TO NEW AREA
                    sManager.popState();
                    sManager.pushState(new Explore(this.layer1ctx, 'map1'));
                }
            }
            else if (objects[i].type === 'menu') {
                sManager.pushState(new StatusMenu(this.layer2ctx));
            }
            /*
                changes state to a cutscene with the provided id. it checks the Quest.Switch array to determine if a 
                different cutscene should be triggered based on if conditions have been met
            */
            else if (objects[i].type === 'cut') {
                this.layer2ctx.clearRect(0, 0, 800, 600);
                var sceneid = +objects[i].properties.ID;
                if (typeof JSON_CACHE['location'][this.mapID][objects[i].name] !== 'undefined') {
                    var keys = Object.keys(JSON_CACHE['location'][this.mapID][objects[i].name]);
                    for (var c = 0; c < keys.length; c++) {
                        if (QUEST.Switch[keys[c]]) {
                            sceneid = JSON_CACHE['location'][this.mapID][objects[i].name][keys[c]];
                        }
                        else {
                            break;
                        }
                    }
                }
                sManager.pushState(new Cutscene(this.layer2ctx, +sceneid, this.mapID));
            }
            //starts new battle with the enemy group specified
            else if (objects[i].type === 'battle') {
                sManager.pushState(new Battle(+objects[i].properties.ID, this.mapID));
            }
        }
    }
}