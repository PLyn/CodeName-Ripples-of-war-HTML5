///<reference path='../State.ts' />
module Game {
    export class Save extends State {
        context;
        mx;
        my;
        objects;
        time = 0;
        saveTime = 0;
        type;
        initBool = false;
        constructor(context) {
            super();
            this.context = context;
            this.time = 0;
            this.objects = [];
            this.objects.push({
                "Name": "back",
                "x": 40,
                "y": 490,
                "w": 75,
                "h": 75
            });
            this.objects.push({
                "Name": "load",
                "x": (GAME_WIDTH / 2),
                "y": (GAME_HEIGHT / 2) + 60,
                "w": 100,
                "h": 50
            });
            this.objects.push({
                "Name": "save",
                "x": (GAME_WIDTH / 2),
                "y": GAME_HEIGHT / 2,
                "w": 100,
                "h": 40
            });
        }
        init() {
            //this.context.drawImage(IMAGE_CACHE['dialog'], 25, 130);
            quickWindow(this.context, (GAME_WIDTH / 2), GAME_HEIGHT / 2, 100, 40, "blue", "red");
            quickWindow(this.context, (GAME_WIDTH / 2), (GAME_HEIGHT / 2) + 50, 100, 40, "blue", "red");
            setStyle(this.context, 'calibre', 12, 'white');
            this.context.fillText("Save Game", (GAME_WIDTH / 2) + 20, (GAME_HEIGHT / 2) + 20);
            this.context.fillText("Load Game", (GAME_WIDTH / 2) + 20, (GAME_HEIGHT / 2) + 70);
        }
        action(type) {
            this.saveTime = Date.now() + 1000;
            if (type === "saved" && this.saveTime < Date.now()) {
                sManager.restart();
                SAVE.save();
            }
            else if (type === "loaded") {
                sManager.restart();
                SAVE.load(GAME_WIDTH);
            }
            this.type = type;
            this.initBool = true;
        }
        update() {
            if (mouseClicked() && this.time < Date.now()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                var keys = Object.keys(this.objects);
                for (var i = 0; i < keys.length; i++) {
                    var x1 = this.objects[keys[i]].x;
                    var x2 = this.objects[keys[i]].x + this.objects[keys[i]].w;
                    var y1 = this.objects[keys[i]].y;
                    var y2 = this.objects[keys[i]].y + this.objects[keys[i]].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (this.objects[keys[i]].Name === "save") {
                            this.context.clearRect(0, 0, 800, 600);
                            SAVE.save();
                        }
                        else if (this.objects[keys[i]].Name === "load") {
                            this.action("loaded");
                        }
                        else if (this.objects[keys[i]].Name === "back") {
                            sManager.popState();
                        }
                    }
                }
            }
            else if(Date.now() > this.saveTime) {
                if (this.initBool) {
                    this.context.clearRect(0, 0, 800, 600);
                    this.init();
                    this.initBool = false;
                    this.context.fillText("your game has been " + this.type, 200, 200)
                }
            }
        }
    }
}