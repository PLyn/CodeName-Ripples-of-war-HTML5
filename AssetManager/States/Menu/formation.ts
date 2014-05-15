///<reference path='../State.ts' />
module Game {
    export class Formation extends State{
        ctx : CanvasRenderingContext2D;
        ctx2: CanvasRenderingContext2D;
        mx;
        my;
        time = 0;
        back = false;
        forms;
        keys;
        constructor(ctx2) {
            super();
            this.ctx2 = ctx2;
            this.forms = [];
        }
        draw(){
            this.ctx2.clearRect(0, 0, 800, 600);
            this.ctx2.drawImage(IMAGE_CACHE['dialog'], 15, 100);
            setStyle(this.ctx2, 'Calibri', '16pt', 'black', 'bold', 'italic', 'left');
            this.ctx2.fillText('Formations', 150, 125);
            for (var i = 0; i < this.keys.length; i++) {
                this.ctx2.fillText(this.keys[i], this.forms[i].x, this.forms[i].y);
            }
            this.ctx2.fillText("Formation Bonuses", 400, 125);
            this.ctx2.fillText("HP: " + FORMATION.bonus.HP, 400, 150);
            this.ctx2.fillText("MP: " + FORMATION.bonus.MP, 400, 175);
            this.ctx2.fillText("Attack: " + FORMATION.bonus.Atk, 400, 200);
            this.ctx2.fillText("Defense: " + FORMATION.bonus.Def, 400, 225);
            this.ctx2.fillText("Speed: " + FORMATION.bonus.Spd, 400, 250);
            this.ctx2.fillText("Magic Defense: " + FORMATION.bonus.MDef, 400, 275);
            this.ctx2.fillText("Luck: " + FORMATION.bonus.Luc, 400, 300);

            this.ctx2.fillText("Current Formation: " + FORMATION.current, 200, 325);

            this.ctx2.drawImage(IMAGE_CACHE['back'], 25, 500);
        }
        addObjects() {
            this.keys = Object.keys(JSON_CACHE['formation'].Formations);
            for (var i = 0; i < this.keys.length; i++) {
                this.forms.push({
                    "Name": this.keys[i],
                    "x": 25,
                    "y": (i * 50) + 150,
                    "w": 75,
                    "h": 5
                });
                this.ctx2.fillText(this.keys[i], this.forms[i].x, this.forms[i].y);
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
        changeFormation() {
            if (Date.now() > this.time && this.back) {
                this.ctx2.clearRect(0, 0, 800, 600);
                sManager.popState();
            }
            else if (mousedown) {
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