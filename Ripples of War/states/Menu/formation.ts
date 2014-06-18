///<reference path='../State.ts' />
module Game {
    export class Formation extends State{
        ctx2: CanvasRenderingContext2D;
        mx;
        my;
        time = 0;
        back = false;
        forms;
        keys;
        battleKeys;
        formation;
        constructor(ctx2) {
            super();
            this.ctx2 = ctx2;
            this.forms = [];
            this.battleKeys = Object.keys(battleList);
        }
        addObjects() {
            this.keys = Object.keys(JSON_CACHE['formation'].Formations);
            for (var i = 0; i < this.keys.length; i++) {
                this.forms.push({
                    "Name": this.keys[i],
                    "x": 50,
                    "y": (i * 25) + 150,
                    "w": 75,
                    "h": 5
                });
            }
            var obj = {
                "Name": "Back",
                "x": 25,
                "y": 500,
                "w": 50,
                "h": 50
            };
            this.forms.push(obj);
        }
        draw(){
            this.ctx2.clearRect(0, 0, 800, 600);
            //this.ctx2.drawImage(IMAGE_CACHE['dialog'], 15, 100);
            quickWindow(this.ctx2, 25, 100, 600, 400, "blue", "red");
            setStyle(this.ctx2, 'Calibri', '16pt', 'white', 'bold');
            this.ctx2.fillText('Formations', 150, 125);
            this.ctx2.fillText("Formation Bonuses", 400, 125);
            this.ctx2.fillText("Current Formation: " + FORMATION.current, 350, 400);
            setStyle(this.ctx2, 'Calibri', '12pt', 'white');
            for (var i = 0; i < this.keys.length; i++) {
                this.ctx2.fillText(this.keys[i], this.forms[i].x, this.forms[i].y);
            }

            var fkeys = Object.keys(FORMATION.bonus);
            var bonus = FORMATION.bonus;
            var c = 0;
            for (var x = 0; x < fkeys.length; x++) {
                if (bonus[fkeys[x]] === 0) {
                }
                else {
                    this.ctx2.fillText(fkeys[x] + ": " + bonus[fkeys[x]], 400, 150 + (c * 15));
                    c++;
                }
            }

            var cForm = JSON_CACHE['formation'].Formations[FORMATION.current];
            for (var y = 0; y < battleList.length; y++) {
                battleList[y].setPos(cForm.positions.x[y], cForm.positions.y[y]);
                battleList[y].render(this.ctx2);
            }
            this.ctx2.drawImage(IMAGE_CACHE['back'], 25, 500);
        }
        changeFormation() {
            if (Date.now() > this.time && this.back) {
                this.ctx2.clearRect(0, 0, 800, 600);
                sManager.popState();
            }
            else if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var i = 0; i <= this.keys.length; i++) {
                    var x1 = this.forms[i].x;
                    var x2 = this.forms[i].x + this.forms[i].w;
                    var y1 = this.forms[i].y - 15;
                    var y2 = this.forms[i].y + this.forms[i].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (this.forms[i].Name === "Back") {
                            this.back = true;
                            this.time = Date.now() + 100;
                        }
                        else {
                            //sManager.pushState(new SelectEquip(this.ctx2, equips[i].type));
                            for (var x = 0; x <= this.keys.length; x++) {
                                if (this.forms[i].Name === this.keys[i]) {
                                    FORMATION.setFormation(this.keys[i]);
                                    this.draw();
                                    this.time = Date.now() + 100;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        init() {
            this.addObjects();
            this.draw();
        }
        update() {
            this.changeFormation();
        }
    }
}