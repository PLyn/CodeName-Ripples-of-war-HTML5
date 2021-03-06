﻿///<reference path='../State.ts' />
module Game {
    export class ItemDetails extends State {
        context: CanvasRenderingContext2D;
        item;
        clickBounds;
        mx;
        my;
        constructor(item, ctx) {
            super();
            this.context = ctx;
            this.item = item;
            this.clickBounds = [];
        }
        init() {
            //this.context.drawImage(IMAGE_CACHE['dialog'], 35, 150);
            quickWindow(this.context, 50, 200, 400, 100, "blue", "red");
            setStyle(this.context, 'calibre', 12, "white");
            this.context.fillText(this.item.name, 60, 225);
            this.context.fillText("description here", 60, 250);
            this.context.fillText("Image here", 250, 225);
            this.context.drawImage(IMAGE_CACHE['back'], 40, 490);

            this.clickBounds.push({
                "name": "back",
                "x": 40,
                "y": 490,
                "w": 75,
                "h": 75
            });
        }
        update() {
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var x = 0; x < this.clickBounds.length; x++) {
                    var x1 = this.clickBounds[x].x;
                    var x2 = this.clickBounds[x].x + this.clickBounds[x].w;
                    var y1 = this.clickBounds[x].y;
                    var y2 = this.clickBounds[x].y + this.clickBounds[x].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        switch (this.clickBounds[x].name) {
                            case "back":
                                this.context.clearRect(0, 0, 800, 600);
                                sManager.popState();
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }
    }
}