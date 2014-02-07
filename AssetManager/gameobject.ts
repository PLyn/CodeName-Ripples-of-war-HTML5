﻿var GAME_OBJECTS = [];
module game {
    export class GameObject {
        x = 0;
        y = 0;
        W = 0;
        H = 0;
        img = new Image();
        scale = 0;

        constructor(img, x, y, w, h, scale?) {
            this.img = img;
            this.x = x;
            this.y = y;
            this.W = w;
            this.H = h;
            this.scale = scale || 1;
        }
        update() {

        }
        render(context, x, y) {
            context.drawImage(this.img, this.x, this.y, this.W, this.H, x, y, this.W * this.scale, this.H * this.scale);
        }
    }
}