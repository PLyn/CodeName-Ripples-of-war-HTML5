///<reference path='State.ts' />
var currentEquips = [];
module Game {
    export class SelectEquip extends State{
        ctx2: CanvasRenderingContext2D;
        mx;
        my;
        keys;
        item;
        itemSelected = false;
        time = 0;
        type;

        constructor(ctx2, type) {
            super();
            this.ctx2 = ctx2;
            this.type = type;
        }
        init() {
            this.ctx2.drawImage(IMAGE_CACHE['dialog'], 15, 300);
            var eq = JSON_CACHE['equip'];
            if (this.type === "Head") {
                this.keys = Object.keys(eq.Head[0]);
                for (var i = 0; i < eq.Head.length; i++) {
                    this.ctx2.fillText(eq.Head[0][this.keys[i]].Name, 50, (25 * i) + 325);
                    var obj = {
                        "Name": eq.Head[0][this.keys[i]].Name,
                        "x": 50,
                        "y": (25 * i) + 325,
                        "w": this.ctx2.measureText(eq.Head[0][this.keys[i]].Name).width,
                        "h": 25
                    }
                currentEquips.push(obj);
                }
                this.keys = null;
            }
            else if (this.type === "Body") {
                this.keys = Object.keys(eq.Body[0]);
                for (var i = 0; i < eq.Body.length; i++) {
                    this.ctx2.fillText(eq.Body[0][this.keys[i]].Name, 50, (25 * i) + 325);
                    var obj = {
                        "Name": eq.Body[0][this.keys[i]].Name,
                        "x": 50,
                        "y": (25 * i) + 325,
                        "w": this.ctx2.measureText(eq.Body[0][this.keys[i]].Name).width,
                        "h": 25
                    }
                currentEquips.push(obj);
                }
                this.keys = null;
            }
            else if (this.type === "Weapon") {
                this.keys = Object.keys(eq.Weapon[0]);
                for (var i = 0; i < eq.Weapon.length; i++) {
                    this.ctx2.fillText(eq.Weapon[0][this.keys[i]].Name, 50, (25 * i) + 325);
                    var obj = {
                        "Name": eq.Weapon[0][this.keys[i]].Name,
                        "x": 50,
                        "y": (25 * i) + 325,
                        "w": this.ctx2.measureText(eq.Weapon[0][this.keys[i]].Name).width,
                        "h": 25
                    }
                currentEquips.push(obj);
                }
                this.keys = null;
            }
            else if (this.type === "Feet") {
                this.keys = Object.keys(eq.Feet[0]);
                for (var i = 0; i < eq.Feet.length; i++) {
                    this.ctx2.fillText(eq.Feet[0][this.keys[i]].Name, 50, (25 * i) + 325);
                    var obj = {
                        "Name": eq.Feet[0][this.keys[i]].Name,
                        "x": 50,
                        "y": (25 * i) + 325,
                        "w": this.ctx2.measureText(eq.Feet[0][this.keys[i]].Name).width,
                        "h": 25
                    }
                currentEquips.push(obj);
                }
                this.keys = null;
            }

            this.itemSelected = false;
        }
        update() {
            /*var time = Date.now();
            if (this.itemSelected) {
                this.itemSelected = false;

            }*/
            if (mousedown() && !this.itemSelected) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var i = 0; i < currentEquips.length; i++) {
                    var x1 = currentEquips[i].x;
                    var x2 = currentEquips[i].x + currentEquips[i].w;
                    var y1 = currentEquips[i].y - 10;
                    var y2 = currentEquips[i].y + currentEquips[i].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        for (var x = 0; x <= JSON_CACHE['equip'].Weapon.length; x++) {
                            if (currentEquips[i].Name === JSON_CACHE['equip'].Weapon[0][this.keys[x]].Name) {
                                //this.itemSelected = true;
                                this.item = JSON_CACHE['equip'].Weapon[0][this.keys[x]];
                                battleList[0].equipItem(this.item, 'Weapon');
                                sManager.popState();
                                break;
                            }
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