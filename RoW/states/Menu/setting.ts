///<reference path='../State.ts' />
module Game {
    export class Setting extends State {
        context: CanvasRenderingContext2D;
        mx;
        my;
        objects;
        soundBool = false;
        musicBool = false;
        time = 0;
        constructor(context) {
            super();
            this.context = context;
            this.context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            this.objects = [];
            this.objects.push({
                "Name": "sound",
                "x": 250,
                "y": 170,
                "w": 36,
                "h": 35
            });
            this.objects.push({
                "Name": "music",
                "x": 250,
                "y": 220,
                "w": 36,
                "h": 35
            });
            this.objects.push({
                "Name": "back",
                "x": 40,
                "y": 490,
                "w": 75,
                "h": 75
            });
            this.objects.push({
                "Name": "save",
                "x": 250,
                "y": 320,
                "w": this.context.measureText("Save Settings").width,
                "h": 5
            });
        }
        init() {
            //this.context.drawImage(IMAGE_CACHE['dialog'], 25, 130);
            quickWindow(this.context, 150, 130, 250, 250, "blue", "red");

            setStyle(this.context, 'calibre', 12, "white");
            this.context.fillText("Settings", 275, 150);
            this.context.fillText("Sounds", 300, 200);
            this.context.drawImage(IMAGE_CACHE['box'], 250, 175);
            this.context.fillText("Music", 300, 250);
            this.context.drawImage(IMAGE_CACHE['box'], 250, 225);
            this.context.drawImage(IMAGE_CACHE['back'], 40, 490);

            this.context.fillText("Save Settings", 250, 325);
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
                        this.time = Date.now() + 500;
                        if (this.objects[keys[i]].Name === "back") {
                            this.context.clearRect(0, 0, 800, 600);
                            sManager.popState();
                        }
                        else if (this.objects[keys[i]].Name === "sound") {
                            this.soundBox();
                        }
                        else if (this.objects[keys[i]].Name === "music") {
                            this.musicBox();
                        }
                        else if (this.objects[keys[i]].Name === "save") {
                            this.context.clearRect(0, 0, 800, 600);
                            sManager.popState();
                        }
                    }
                }
            }
        }
        /*
            adds or removes the tick on the box beside the sound text to determine if the sound is supposed to be on or off
        */
        soundBox() {
            if (this.soundBool) {
                this.soundBool = false;
                this.context.clearRect(0, 0, 800, 600);
                this.init();
                if (this.musicBool) {
                    this.context.drawImage(IMAGE_CACHE['tick'], 260, 230);
                }
            }
            else {
                this.soundBool = true;
                this.context.drawImage(IMAGE_CACHE['tick'], 260, 180);
            }
        }
        /*
            adds or removes the tick on the box beside the music text to determine if the music is supposed to be on or off
        */
        musicBox() {
            if (this.musicBool) {
                this.musicBool = false;
                this.context.clearRect(0, 0, 800, 600);
                this.init();
                if (this.soundBool) {
                    this.context.drawImage(IMAGE_CACHE['tick'], 260, 180);
                }
            }
            else {
                this.musicBool = true;
                this.context.drawImage(IMAGE_CACHE['tick'], 260, 230);
            }
        }
    }
}