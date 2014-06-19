///<reference path='State.ts' />
module Game {
    export class Title extends State {
        context: CanvasRenderingContext2D;
        MenuItems;
        mx;
        my;
        constructor(ctx) {
            super();
            this.context = ctx;
            this.MenuItems = [];
        }
        init() {
            this.context.drawImage(IMAGE_CACHE['ripple'], 0, 0);
            setStyle(this.context, 'Calibri', 25, "white");
            this.context.fillText("Ripples of War Alpha " + GAME_VERSION, 250, 100);
            this.context.fillText("New Game", 300, 300);
            this.context.fillText("Continue Game", 300, 350);

            this.MenuItems.push({
                "name": "new",
                "x": 300,
                "y": 290,
                "w": this.context.measureText("New Game").width,
                "h": 10
            });
            this.MenuItems.push({
                "name": "load",
                "x": 300,
                "y": 340,
                "w": this.context.measureText("Continue Game").width,
                "h": 10
            });

        }
        update() {
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var x = 0; x < this.MenuItems.length; x++) {
                    var x1 = this.MenuItems[x].x;
                    var x2 = this.MenuItems[x].x + this.MenuItems[x].w;
                    var y1 = this.MenuItems[x].y;
                    var y2 = this.MenuItems[x].y + this.MenuItems[x].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (this.MenuItems[x].name === "new") {
                            this.context.clearRect(0, 0, 800, 600);
                            sManager.popState();
                            sManager.pushState(new Cutscene(this.context, 0, "map1"));
                            break;
                        }
                        else if (this.MenuItems[x].name === "load") {
                            if (localStorage.getItem("TileMap") === null || localStorage.getItem("Party") === null) {
                                this.context.fillText("No saved file detected. Please start a new Game", 100, 250);
                            }
                            else {
                                sManager.popState();
                                SAVE.load(GAME_WIDTH);
                            }
                            break;
                        }
                    }
                }
            }
        }
    }
}