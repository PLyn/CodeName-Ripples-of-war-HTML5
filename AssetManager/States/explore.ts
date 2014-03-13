///<reference path='State.ts' />
module Game {
    export class Explore extends State {
        x;
        y;
        velocity;
        mx;
        my;
        ctrl;
        layer1ctx;
        layer2ctx;
        currentArea;
        constructor(ctx, w, mapID, area) {
            super();
            this.x = 0;
            this.y = 0;
            this.mx = 0;
            this.my = 0;
            this.velocity = 2.0;
            GAME_OBJECTS.push(SPRITE_CACHE[0]);

            this.currentArea = area;
          
            var canvas = <HTMLCanvasElement> document.getElementById('layer2');
            this.layer2ctx = canvas.getContext('2d');

            var canvas2 = <HTMLCanvasElement> document.getElementById('layer1');
            this.layer1ctx = canvas2.getContext('2d');
        }
        init() {
            this.layer1ctx.clearRect(0, 0, 800, 600);
            this.layer2ctx.clearRect(0, 0, 800, 600);
            tiles.setTileset(this.layer1ctx, 'rpg');
            //tiles.drawMap(this.layer1ctx, this.layer2ctx);
            /*tiles.drawTiles(this.layer1ctx, 'rpg');
            tiles.getObjects(this.layer2ctx, 'rpg');*/
            //tiles.getObjects(this.layer1ctx, 'rpg');
            //GAME_OBJECTS[0].render(this.layer2ctx, this.x, this.y);
        }
        update() {
            if (control.mousedown()) {
                this.mx = control.mEvent.pageX;
                this.my = control.mEvent.pageY;
                for (var i = 0; i < objects.length; i++) {
                    var x1 = objects[i].x;
                    var x2 = objects[i].x + objects[i].width;
                    var y1 = objects[i].y;
                    var y2 = objects[i].y + objects[i].width;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        sManager.pushState(new Cutscene("id", 800, 600, this.layer2ctx, objects[i].name, this));
                        
                        console.log(objects[i].name);
                        //this.currentArea.endLevel(this.layer2ctx);
                        //sManager.pushState(new Cutscene("id", 800, 600, this.layer2ctx, '1', this));
                    }
                }
            }
        }
        render() {

        }
        pause() {

        }
        resume() {

        }
        destroy() {

        }
    }
}