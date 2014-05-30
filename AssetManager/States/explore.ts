///<reference path='State.ts' />
module Game {
    export class Explore extends State {
        x;
        y;
        velocity;
        mx;
        my;

        layer1ctx;
        layer2ctx;
        mapID;
        width;
        map;
        constructor(ctx, w, mapID) {
            super();
            this.x = 0;
            this.y = 0;
            this.mx = 0;
            this.my = 0;
            this.velocity = 2.0;
            this.width = w;
            //this.currentArea = area;
            this.mapID = mapID;
            var canvas = <HTMLCanvasElement> document.getElementById('layer2');
            this.layer2ctx = canvas.getContext('2d');

            var canvas2 = <HTMLCanvasElement> document.getElementById('layer1');
            this.layer1ctx = canvas2.getContext('2d');

            //this.game = game;

        }
        init() {
            this.layer1ctx.clearRect(0, 0, 800, 600);
            this.layer2ctx.clearRect(0, 0, 800, 600);
            TileMap.setTileset(this.layer1ctx, this.mapID);
            this.layer1ctx.drawImage(IMAGE_CACHE['menu'], 5, 5);
            this.layer2ctx.drawImage(IMAGE_CACHE['D'],( 7 * 64) + 16, (5 * 64) + 16);
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
            //battleList[0].setPos((8*64) + 16, (8*64) + 16);
            //battleList[0].render(this.layer2ctx);
            this.map = FormatTilemap(this.mapID);
            //var path = findPath(this.map, [8, 8], [6, 7]);
            //var x = 0;
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
                        var path = findPath(this.map, [7, 5], [Math.floor(this.mx / 64), Math.floor(this.my / 64)]);
                        var keys = Object.keys(path);
                        var ctx = this.layer2ctx;
                        var x = 0;
                            //for (var x = 0; x < keys.length; x++) {
                            if (objects[i].type !== 'menu' && path !== null) {
                                var timer = setInterval(() => {
                                    moveSprite(ctx, path[x][0], path[x][1]);
                                    x++;
                                    if (x >= (keys.length - 1)) {
                                        clearInterval(timer);
                                    }
                                }, 1000 / 5);
                            }
                        //}
                        
                        if (objects[i].type === 'exit') {
                            if (objects[i].properties.Type === '0') {//EXIT TO WORLD
                                sManager.popState();
                                sManager.pushState(new Explore(this.layer2ctx, this.width, objects[i].properties.ID));
                            }
                            else if (objects[i].properties.Type === '1') {//EXIT TO NEW AREA
                                sManager.popState();
                                sManager.pushState(new Explore(this.layer1ctx, this.width, 'map1'));
                            }
                        }
                        else if (objects[i].type === 'menu') {
                            sManager.pushState(new StatusMenu(this.layer2ctx));
                        }
                        else if (objects[i].type === 'cut') {
                            this.layer2ctx.clearRect(0, 0, 800, 600);
                            sManager.pushState(new Cutscene("id", 800, 600, this.layer2ctx, +objects[i].properties.ID));
                        }
                        else if (objects[i].type === 'battle') {
                            sManager.pushState(new Battle(this.layer1ctx, this.layer2ctx, 0));
                        }
                        
                    }
                }
            }
        }
        render() {}
        pause() {}
        resume() {}
        destroy() {}
    }
}