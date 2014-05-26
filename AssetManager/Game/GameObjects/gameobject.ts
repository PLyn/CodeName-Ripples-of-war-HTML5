var GAME_OBJECTS = [];
module Game {
    export class GameObject {
        x = 0;
        y = 0;
        W = 0;
        H = 0;
        img = new Image();
        scale = 1;
        //pretty much complete imo, other classes such as sprite will extend the variables and functionality
        constructor(img, x?, y?, w?, h?,scale?) {
            this.img = img;
            this.x = x || 0;
            this.y = y || 0;
            this.W = w || img.naturalWidth;
            this.H = h || img.naturalHeight;
            this.scale = scale || 1;
        }
        update() {

        }
        render(context, x, y) {
            context.drawImage(this.img, 0, 0, this.W, this.H, x, y, this.W * this.scale, this.H * this.scale);
            //context.drawImage(this.img, this.x, this.y);
        }
        setPos(x, y) {
            this.x = x;
            this.y = y;
        }
    }
}