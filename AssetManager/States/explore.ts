///<reference path='State.ts' />
module Game {
    export class Explore extends State {
        x;
        y;
        velocity;
        mx;
        my;
        ctrl;
        constructor(ctx, w) {
            super();
            this.x = 0;
            this.y = 0;
            this.mx = 0;
            this.my = 0;
            this.velocity = 2.0;
            GAME_OBJECTS.push(SPRITE_CACHE[0]);

            ctx.clearRect(0, 0, 800, 600);
            tiles.drawTiles(ctx, 'rpg');
            tiles.getObjects(ctx, 'rpg');
            GAME_OBJECTS[0].render(ctx, this.x, this.y);
        }
        update() {
                if (control.mousedown()) {
                    this.mx = control.mEvent.pageX;
                    this.my = control.mEvent.pageY;
                    this.objectClick(this.mx, this.my, objects);
                }
        }
        render() {

        }
        objectClick = (x, y, obj) => {
            for (var i = 0; i < obj.length; i++) {
                var x1 = obj[i].x;
                var x2 = obj[i].x + obj[i].width;
                var y1 = obj[i].y;
                var y2 = obj[i].y + obj[i].width;
                if ((x1 <= x && x <= x2) && (y1 <= y && y <= y2)) {
                    console.log(obj[i].x);
                    sManager.switchInGameState(1);
                }
            }
        }
    }
}