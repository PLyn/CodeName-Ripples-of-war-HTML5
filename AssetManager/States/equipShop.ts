///<reference path='State.ts' />
var equips = [];
module Game {
    export class EquipShop extends State{
        ctx : CanvasRenderingContext2D;
        ctx2: CanvasRenderingContext2D;
        mx;
        my;
        time = 0;
        back = false;
        stats;
        constructor(ctx, ctx2) {
            super();
            this.ctx = ctx; 
            this.ctx2 = ctx2;

        }
        drawEquip() {
            this.ctx2.clearRect(0, 0, 800, 600);
            this.ctx2.drawImage(IMAGE_CACHE['dialog'], 15, 100);
            setStyle(this.ctx2, 'Calibri', '16pt', 'black', 'bold', 'italic', 'left');
            this.ctx2.fillText(battleList[0].Base.ID + " Equipment Area", 200, 125);
            this.ctx2.fillText("Head: " + battleList[0].Equipment['Head'], 75, 150);
            this.ctx2.fillText("Body: " + battleList[0].Equipment['Body'], 75, 175);
            this.ctx2.fillText("Weapon: " + battleList[0].Equipment['Weapon'], 75, 200);
            this.ctx2.fillText("Feet: " + battleList[0].Equipment['Feet'], 75, 225);

            this.stats = battleList[0].getTotalStats();
            this.ctx2.fillText("HP: " + this.stats.HP, 400, 150);
            this.ctx2.fillText("MP: " + this.stats.MP, 400, 175);
            this.ctx2.fillText("Attack: " + this.stats.Atk, 400, 200);
            this.ctx2.fillText("Defense: " + this.stats.Def, 400, 225);
            this.ctx2.fillText("Speed: " + this.stats.Spd, 400, 250);
            this.ctx2.fillText("Magic Defense: " + this.stats.MDef, 400, 275);
            this.ctx2.fillText("Luck: " + this.stats.Luc, 400, 300);

            this.ctx2.drawImage(IMAGE_CACHE['back'], 25, 500);
        }
        addEquipPos() {
            var obj = {
                "type": "Head",
                "x": 75,
                "y": 145,
                "w": this.ctx2.measureText("Head: " + battleList[0].Equipment['Head']).width,
                "h": 5
            };
            equips.push(obj);
            obj = {
                "type": "Body",
                "x": 75,
                "y": 175,
                "w": this.ctx2.measureText("Body: " + battleList[0].Equipment['Body']).width,
                "h": 5
            };
            equips.push(obj);
            obj = {
                "type": "Weapon",
                "x": 75,
                "y": 200,
                "w": this.ctx2.measureText("Weapon: " + battleList[0].Equipment['Weapon']).width,
                "h": 5
            };
            equips.push(obj);
            obj = {
                "type": "Feet",
                "x": 75,
                "y": 225,
                "w": this.ctx2.measureText("Legs: " + battleList[0].Equipment['Feet']).width,
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
            /*if (Date.now() > this.time && this.back) {
                this.ctx2.clearRect(0, 0, 800, 600);
                sManager.popState();
            }*/
            if (mousedown()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var i = 0; i < equips.length; i++) {
                    var x1 = equips[i].x;
                    var x2 = equips[i].x + equips[i].w;
                    var y1 = equips[i].y - 15;
                    var y2 = equips[i].y + equips[i].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (equips[i].type === "Back") {
                            /*this.back = true;
                            this.time = Date.now() + 100;*/
                            this.ctx2.clearRect(0, 0, 800, 600);
                            sManager.popState();
                        }
                        else {
                            sManager.pushState(new SelectEquip(this.ctx2, equips[i].type));
                        }
                    }
                }
            }
        }
        init() {
            this.drawEquip();
            this.addEquipPos();
        }
        update() {
            this.drawEquip();
            this.changeEquip();
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