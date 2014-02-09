module Engine {
    export class Loop {
        canvas;
        context;
        asset;
        constructor(canvasid, width, height, preloader) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = canvasid;
            this.canvas.width = width;
            this.canvas.height = height;
            document.body.appendChild(this.canvas);
            this.asset = preloader;
            this.canvas = <HTMLCanvasElement> document.getElementById(canvasid);
            this.context = this.canvas.getContext('2d');
            
        }
        update() {

        }
        render = () => {
            this.asset.drawTiles(this.context);
            for (var x = 0; x < SPRITE_CACHE.length; x++) {
                GAME_OBJECTS[x] = SPRITE_CACHE[x];
                GAME_OBJECTS[x].render(this.context, imagex, imagey);
                imagex += 50;
            }
            ANIM_CACHE['at'][pos].render(this.context, 200, 200);

            pos = (pos + 1) % ANIM_CACHE['at'].length;
        }

    }
}