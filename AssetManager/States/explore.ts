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
        currentArea;
        mapID;
        game;
        constructor(ctx, w, mapID, area, game) {
            super();
            this.x = 0;
            this.y = 0;
            this.mx = 0;
            this.my = 0;
            this.velocity = 2.0;

            this.currentArea = area;
            this.mapID = mapID;
            var canvas = <HTMLCanvasElement> document.getElementById('layer2');
            this.layer2ctx = canvas.getContext('2d');

            var canvas2 = <HTMLCanvasElement> document.getElementById('layer1');
            this.layer1ctx = canvas2.getContext('2d');

            this.game = game;
            objects.push(
                {
                    "height": 50,
                    "name": "menu",
                    "properties":
                    {
                    },
                    "type": "menu",
                    "visible": true,
                    "width": 50,
                    "x": 5,
                    "y": 5
                }
                );
        }
        init() {
            this.layer1ctx.clearRect(0, 0, 800, 600);
            this.layer2ctx.clearRect(0, 0, 800, 600);
            tiles.setTileset(this.layer1ctx, this.mapID);
            this.layer2ctx.drawImage(IMAGE_CACHE['menu'], 5, 5);
            this.layer1ctx.drawImage(IMAGE_CACHE['hero'], 200, 250);
        }
        update() {
            if (control.mousedown()) {
                this.mx = control.mEvent.pageX;
                this.my = control.mEvent.pageY;
                for (var i = 0; i < objects.length; i++) {
                    var x1 = objects[i].x;
                    var x2 = objects[i].x + objects[i].width;
                    var y1 = objects[i].y;
                    var y2 = objects[i].y + objects[i].height;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (objects[i].type === 'exit') {
                            if (objects[i].properties.ID === '0') {//EXIT TO WORLD
                                console.log("exit");
                                sManager.popState();
                                this.game.currentArea = new Game.Area1(this.layer1ctx, 800, this);
                            }
                            else if (objects[i].properties.ID === '1') {//EXIT TO NEW AREA
                                sManager.popState();
                                this.game.currentArea = new Game.Area2(this.layer1ctx, 800, this);
                            }
                        }
                        else if (objects[i].type === 'cut') {
                            this.layer2ctx.clearRect(0, 0, 800, 600);
                            sManager.pushState(new Cutscene("id", 800, 600, this.layer2ctx, objects[i].properties.ID));
                        }
                        else if (objects[i].type === 'battle') {
                            sManager.pushState(new Battle(this.layer1ctx, this.layer2ctx));
                        }
                        else if (objects[i].type === 'menu') {
                            sManager.pushState(new StatusMenu(this.layer2ctx));
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