///<reference path='../State.ts' />
var equips = [];
module Game {
    export class Equip extends State{
        context: CanvasRenderingContext2D;
        mx;
        my;
        time = 0;
        back = false;
        b;
        m;
        objects;
        battler: Sprite;
        constructor(context) {
            super();
            this.context = context;
            this.battler = battleList[0];
            this.objects = [];
        }
        drawEquip() {
            this.context.clearRect(0, 0, 800, 600);
            //this.context.drawImage(IMAGE_CACHE['dialog'], 15, 100);
            quickWindow(this.context, 25, 100, 600, 300, "blue", "red");
            setStyle(this.context, 'Calibri', '12pt', 'white');

            this.battler.setPos(450, 175);
            this.battler.render(this.context);

            this.context.fillText("Head: " + this.battler.Equipment['Head'], 150, 150);
            this.context.fillText("Body: " + this.battler.Equipment['Body'], 300, 150);
            this.context.fillText("Weapon: " + this.battler.Equipment['Weapon'], 150, 200);
            this.context.fillText("Feet: " + this.battler.Equipment['Feet'], 300, 200);

            this.b = this.battler.Base;
            this.m = this.battler.Modified;
            this.context.fillText("HP: " + this.b.HP + " + (" + this.m.HP + ")", 30, 250);
            this.context.fillText("MP: " + this.b.MP + " + (" + this.m.MP + ")", 30, 270);
            this.context.fillText("Attack: " + this.b.Atk + " + (" + this.m.Atk + ")", 30, 290);
            this.context.fillText("Defense: " + this.b.Def + " + (" + this.m.Def + ")", 30, 310);
            this.context.fillText("Speed: " + this.b.Spd + " + (" + this.m.Spd + ")", 30, 330);
            this.context.fillText("M. Defense: " + this.b.MDef + " + (" + this.m.MDef + ")", 30, 350);
            this.context.fillText("Luck: " + this.b.Luc + " + (" + this.m.Luc + ")", 30, 370);

            this.b = this.battler.ElementResist;
            this.context.fillText("Physical: " + this.b.Physical, 250, 250);
            this.context.fillText("Fire: " + this.b.Fire, 250, 270);
            this.context.fillText("Ice: " + this.b.Ice, 250, 290);
            this.context.fillText("Thunder: " + this.b.Thunder, 250, 310);
            this.context.fillText("Wind: " + this.b.Wind, 250, 330);
            this.context.fillText("Earth: " + this.b.Earth, 250, 350);
            this.context.fillText("Dark: " + this.b.Dark, 250, 370);
            this.context.fillText("Light: " + this.b.Light, 250, 390);

            this.b = this.battler.StatusResist;
            this.context.fillText("Poison: " + this.b.Poison, 400, 250);
            this.context.fillText("Paralysis: " + this.b.Paralysis, 400, 270);
            this.context.fillText("Sleep: " + this.b.Sleep, 400, 290);

            this.context.drawImage(IMAGE_CACHE['back'], 25, 500);
        }
        addEquipPos() {
            var obj = {
                "type": "Head",
                "x": 150,
                "y": 150,
                "w": this.context.measureText("Head: " + this.battler.Equipment['Head']).width,
                "h": 5
            };
            equips.push(obj);
            obj = {
                "type": "Body",
                "x": 300,
                "y": 150,
                "w": this.context.measureText("Body: " + this.battler.Equipment['Body']).width,
                "h": 5
            };
            equips.push(obj);
            obj = {
                "type": "Weapon",
                "x": 150,
                "y": 200,
                "w": this.context.measureText("Weapon: " + this.battler.Equipment['Weapon']).width,
                "h": 5
            };
            equips.push(obj);
            obj = {
                "type": "Feet",
                "x": 300,
                "y": 200,
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
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var i = 0; i < equips.length; i++) {
                    var x1 = equips[i].x;
                    var x2 = equips[i].x + equips[i].w;
                    var y1 = equips[i].y - 15;
                    var y2 = equips[i].y + equips[i].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (equips[i].type === "Back") {
                            this.context.clearRect(0, 0, 800, 600);
                            sManager.popState();
                        }
                        else {
                            sManager.pushState(new SelectEquip(this.context, equips[i].type, this.battler));
                        }
                        break;
                    }
                }
        }
        drawPC() {
            var oKeys = Object.keys(battleList);
            for (var y = 0; y < oKeys.length; y++) {
                quickWindow(this.context, 200 + (y * 75), 105, this.context.measureText("(" + battleList[oKeys[y]].Base.ID + ")").width, 20, "blue", "red");
                setStyle(this.context, 'calibre', 16, "white", "bold");
                if (battleList[oKeys[y]].Base.Type === 0) {
                    if (this.battler === battleList[oKeys[y]]) {
                        this.context.fillText("(" + battleList[oKeys[y]].Base.ID + ")", 200 + (y * 75), 125);
                        this.objects[y] = {
                            "Name": battleList[oKeys[y]].Base.ID,
                            "x": 200 + (y * 75),
                            "y": 105,
                            "w": this.context.measureText("(" + battleList[oKeys[y]].Base.ID + ")").width,
                            "h": 20
                        };
                    }
                    else {
                        this.context.fillText(battleList[oKeys[y]].Base.ID, 200 + (y * 75), 125);
                        this.objects[y] = {
                            "Name": battleList[oKeys[y]].Base.ID,
                            "x": 200 + (y * 75),
                            "y": 105,
                            "w": this.context.measureText(battleList[oKeys[y]].Base.ID).width,
                            "h": 20
                        };
                    }
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
            this.drawEquip();
            this.drawPC();
        }
        checkCurrentChar() {
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
        init() {
            this.drawEquip();
            this.drawPC();
            this.addEquipPos();
        }
        update() {
            if (mouseClicked()) {
                this.checkCurrentChar();
                this.changeEquip();
            }

        }
    }
}