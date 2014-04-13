﻿///<reference path='State.ts' />
module Game {
    export class StatusMenu extends State {
        mx;
        my;
        //used as the base class to be extended for each state
        //might need some initialization code to remove some clutter
        //from each state to make stuff look better
        constructor(ctx) {
            super();
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.fillRect(0, 0, 650, 600);
            ctx.drawImage(IMAGE_CACHE['status'], 0, 100);
            ctx.drawImage(IMAGE_CACHE['back'], 50, 500);
        }
        init() {

        }
        update() {
            if (mousedown()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                var x1 = 40;
                var x2 = 120;
                var y1 = 490;
                var y2 = 560;
                if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                    sManager.popState();
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