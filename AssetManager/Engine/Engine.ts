module Engine {
    export class Loop {
        canvas;
        context;
        asset;
        control;
        constructor(canvasid, width, height, preloader) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = canvasid;
            this.canvas.width = width;
            this.canvas.height = height;
            this.canvas.tabindex = '1';
            document.body.appendChild(this.canvas);
            this.asset = preloader;
            this.canvas = <HTMLCanvasElement> document.getElementById(canvasid);
            this.context = this.canvas.getContext('2d');
            this.control = new input.input(this.canvas);
        }
        update() {
            if (this.control.keydown(38)) {
                console.log("pressed");
            }    
            imagex += 50;
            if (pos === 0) {
                this.context.clearRect(0, 0, 800, 600);
                imagex = 0;
            }
        }
        render = () => {
            this.asset.drawTiles(this.context);
            GAME_OBJECTS[pos] = SPRITE_CACHE[pos];
            GAME_OBJECTS[pos].render(this.context, imagex, imagey);

            ANIM_CACHE['at'][pos].render(this.context, 200, 150);

            pos = (pos + 1) % ANIM_CACHE['at'].length;

        }

    }
}