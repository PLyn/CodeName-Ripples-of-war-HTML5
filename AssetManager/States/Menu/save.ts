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
                "x": 200,
                "y": 300,
                "w": this.context.measureText("Load Game").width,
                "h": 75
            });
            this.objects.push({
                "Name": "save",
                "x": 200,
                "y": 250,
                "w": this.context.measureText("Save Game").width,
                "h": 15
            });
        }
        init() {
            this.context.drawImage(IMAGE_CACHE['dialog'], 25, 130);
            this.context.fillText("Save Game", 200, 250);
            this.context.fillText("Load Game", 200, 300);
        }
        action(type) {
            this.context.drawImage(IMAGE_CACHE['dialog'], 45, 150);
            this.context.fillText("Your game is currently being " + type, 200, 200);
            this.saveTime = Date.now() + 1000;
            if (type === "saved" && this.saveTime < Date.now()) {
                sManager.restart();
                SAVE.save();
            }
            else if (type === "loaded") {
                sManager.restart();
                SAVE.load(800);
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
                            //this.action("saved");
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