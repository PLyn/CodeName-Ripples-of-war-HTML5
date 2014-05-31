///<reference path='../State.ts' />
var equips = [];
module Game {
    export class Equip extends State{
        context: CanvasRenderingContext2D;
        mx;
        my;
        time = 0;
        back = false;
        stats;
        objects;
        battler;
        constructor(context) {
            super();
            this.context = context;
            this.battler = battleList[0];
            this.objects = [];
        }
        drawEquip() {
            this.battler = battleList[0];
            this.context.clearRect(0, 0, 800, 600);
            this.context.drawImage(IMAGE_CACHE['dialog'], 15, 100);
            setStyle(this.context, 'Calibri', '16pt', 'black', 'bold', 'italic', 'left');

            this.context.fillText("Head: " + this.battler.Equipment['Head'], 75, 175);
            this.context.fillText("Body: " + this.battler.Equipment['Body'], 75, 200);
            this.context.fillText("Weapon: " + this.battler.Equipment['Weapon'], 75, 225);
            this.context.fillText("Feet: " + this.battler.Equipment['Feet'], 75, 250);

            this.stats = this.battler.getTotalStats();
            this.context.fillText("HP: " + this.stats.HP, 400, 175);
            this.context.fillText("MP: " + this.stats.MP, 400, 200);
            this.context.fillText("Attack: " + this.stats.Atk, 400, 225);
            this.context.fillText("Defense: " + this.stats.Def, 400, 250);
            this.context.fillText("Speed: " + this.stats.Spd, 400, 275);
            this.context.fillText("Magic Defense: " + this.stats.MDef, 400, 300);
            this.context.fillText("Luck: " + this.stats.Luc, 400, 325);

            this.context.drawImage(IMAGE_CACHE['back'], 25, 500);
        }
        addEquipPos() {
            var obj = {
                "type": "Head",
                "x": 75,
                "y": 170,
                "w": this.context.measureText("Head: " + this.battler.Equipment['Head']).width,
                "h": 5
            };
            equips.push(obj);
            obj = {
                "type": "Body",
                "x": 75,
                "y": 195,
                "w": this.context.measureText("Body: " + this.battler.Equipment['Body']).width,
                "h": 5
            };
            equips.push(obj);
            obj = {
                "type": "Weapon",
                "x": 75,
                "y": 220,
                "w": this.context.measureText("Weapon: " + this.battler.Equipment['Weapon']).width,
                "h": 5
            };
            equips.push(obj);
            obj = {
                "type": "Feet",
                "x": 75,
                "y": 245,
                "w": this.context.measureText("Legs: " + this.battler.Equipment['Feet']).width,
                "h": 5
            };
            equips.push(obj);
            obj = {
                "type": "Back",
                "x": 25,
                "y": 500,
                "w": 50,
                "h": 50
            };
            equips.push(obj);
        }
        changeEquip() {
            if (Date.now() > this.time && this.back) {
                this.context.clearRect(0, 0, 800, 600);
                sManager.popState();
            }
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var i = 0; i < equips.length; i++) {
                    var x1 = equips[i].x;
                    var x2 = equips[i].x + equips[i].w;
                    var y1 = equips[i].y - 15;
                    var y2 = equips[i].y + equips[i].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (equips[i].type === "Back") {
                            this.back = true;
                            this.time = Date.now() + 100;
                        }
                        else {
                            sManager.pushState(new SelectEquip(this.context, equips[i].type, this.battler));
                        }
                    }
                }
            }
        }
        drawPC() {
            var oKeys = Object.keys(battleList);
            for (var y = 0; y < oKeys.length; y++) {
                if (battleList[oKeys[y]].Base.Type === 0) {
                    if (this.battler === battleList[oKeys[y]]) {
                        this.context.fillText("*", 210 + (y * 75), 140)
                    }
                    this.context.fillText(battleList[oKeys[y]].Base.ID, 200 + (y * 75), 125);
                    this.objects[y] = {
                        "Name": battleList[oKeys[y]].Base.ID,
                        "x": 200 + (y * 75),
                        "y": 120,
                        "w": this.context.measureText(battleList[oKeys[y]].Base.ID).width,
                        "h": 5
                    };
                }
            }
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
        checkCurrentChar() {
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                var keys = Object.keys(this.objects);
                for (var i = 0; i < keys.length; i++) {
                    var x1 = this.objects[i].x;
                    var x2 = this.objects[i].x + this.objects[i].w;
                    var y1 = this.objects[i].y;
                    var y2 = this.objects[i].y + this.objects[i].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        this.reload(this.objects[keys[i]].Name);
                    }
                }
            }
        }
        init() {
            this.drawEquip();
            this.drawPC();
            this.addEquipPos();
        }
        update() {
            this.drawEquip();
            this.drawPC();
            this.changeEquip();
            this.checkCurrentChar();
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