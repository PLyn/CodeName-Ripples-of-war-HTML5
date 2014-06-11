///<reference path='../State.ts' />
module Game {
    export class Status extends State {
        context;
        battler: Sprite;
        objects; 
        mx;
        my;
        constructor(context) {
            super();
            this.objects = [];
            this.context = context;
            this.battler = battleList[0];
        }
        init() {
            this.context.drawImage(IMAGE_CACHE['dialog'], 35, 130);
            this.context.drawImage(IMAGE_CACHE['back'], 40, 490);
            var oKeys = Object.keys(battleList);
            for (var y = 0; y < oKeys.length; y++) {
                if (battleList[oKeys[y]].Base.Type === 0) {
                    if (this.battler === battleList[oKeys[y]]) {
                        this.context.fillText("*", 55 + (y * 75), 155)
                    }
                    this.context.fillText(battleList[oKeys[y]].Base.ID, 50 + (y * 75), 145);
                    this.objects[y] = {
                        "Name": battleList[oKeys[y]].Base.ID,
                        "x": 50 + (y * 75),
                        "y": 145,
                        "w": this.context.measureText(battleList[oKeys[y]].Base.ID).width,
                        "h": 20
                    };
                }
            }
            this.objects[y+1] = {
                "Name": "back",
                "x": 40,
                "y": 490,
                "w": 75,
                "h": 75
            };
            var bKeys = Object.keys(this.battler.Base);
            for (var x = 1; x < bKeys.length - 1; x++) {
                this.context.fillText(bKeys[x] + " " + this.battler.Base[bKeys[x]] + " ( + " + this.battler.Modified[bKeys[x]] + ")", 50, 190 + (25 * x));
            }
            this.context.fillText("Abilities", 150, 200);
            for(var i = 0; i < this.battler.Spells.length; i++){
                this.context.fillText(this.battler.Spells[i], 150, 215 + (25 * i));
            }
            this.context.drawImage(this.battler.img, 300, 200);
        }
        reload(name) {
            var oKeys = Object.keys(battleList);
            for (var y = 0; y < oKeys.length; y++) {
                if (battleList[oKeys[y]].Base.Type === 0 && name === battleList[oKeys[y]].Base.ID) {
                    this.battler = battleList[oKeys[y]];
                    break;
                }
            }
            this.context.clearRect(0, 0, 800, 600);
            this.init();
        }
        update() {
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                var keys = Object.keys(this.objects);
                for (var i = 0; i < keys.length; i++) {
                    var x1 = this.objects[keys[i]].x;
                    var x2 = this.objects[keys[i]].x + this.objects[keys[i]].w;
                    var y1 = this.objects[keys[i]].y;
                    var y2 = this.objects[keys[i]].y + this.objects[keys[i]].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (this.objects[keys[i]].Name === "back") {
                            this.context.clearRect(0, 0, 800, 600);
                            sManager.popState();
                        }
                        else {
                            this.reload(this.objects[keys[i]].Name);
                            break;
                        }
                    }
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