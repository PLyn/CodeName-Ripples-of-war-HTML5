var GAME_OBJECTS = [];
module Game {
    export class GameObject {
        sx = 0;
        sy = 0;
        dx = 0;
        dy = 0;
        W = 0;
        H = 0;
        img = new Image();
        scale = 1;
        //pretty much complete imo, other classes such as sprite will extend the variables and functionality
        constructor(img, dx?, dy?, sx?, sy?, w?, h?, scale?) {
            this.img = img;
            this.sx = sx || 0;
            this.sy = sy || 0;
            this.dx = dx;
            this.dy = dy;
            this.W = w || img.naturalWidth;
            this.H = h || img.naturalHeight;
            this.scale = scale || 1;
        }
        update() {

        }
        render(context) {
            context.drawImage(this.img, this.sx, this.sy, this.W, this.H, this.dx, this.dy, this.W * this.scale, this.H * this.scale);
            //context.drawImage(this.img, this.x, this.y);
        }
        setPos(x, y) {
            this.dx = x;
            this.dy = y;
        }
    }
}