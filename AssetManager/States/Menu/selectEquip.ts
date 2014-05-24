///<reference path='../State.ts' />
var currentEquips = [];
module Game {
    export class SelectEquip extends State {
        ctx2: CanvasRenderingContext2D;
        mx;
        my;
        hKeys;
        bKeys;
        wKeys;
        fKeys;
        item;
        itemSelected = false;
        time = 0;
        type;
        battler;

        constructor(ctx2, type, battler) {
            super();
            this.ctx2 = ctx2;
            this.type = type;
            this.battler = battler;
        }
        init() {
            this.ctx2.drawImage(IMAGE_CACHE['dialog'], 15, 300);
            var eq = JSON_CACHE['equip'];
            if (this.type === "Head") {
                this.hKeys = Object.keys(eq.Head);
                for (var i = 0; i < ObjLength(eq.Head); i++) {
                    this.ctx2.fillText(this.hKeys[i], 50, (25 * i) + 325);
                    var obj = {
                        "Name": this.hKeys[i],
                        "x": 50,
                        "y": (25 * i) + 325,
                        "w": this.ctx2.measureText(this.hKeys[i]).width,
                        "h": 15
                    }
                currentEquips.push(obj);
                }
            }
            else if (this.type === "Body") {
                this.bKeys = Object.keys(eq.Body);
                for (var i = 0; i < ObjLength(eq.Body); i++) {
                    this.ctx2.fillText(this.bKeys[i], 50, (25 * i) + 325);
                    var obj = {
                        "Name": this.bKeys[i],
                        "x": 50,
                        "y": (25 * i) + 325,
                        "w": this.ctx2.measureText(this.bKeys[i]).width,
                        "h": 15
                    }
                currentEquips.push(obj);
                }
            }
            else if (this.type === "Weapon") {
                this.wKeys = Object.keys(eq.Weapon);
                for (var i = 0; i < ObjLength(eq.Weapon); i++) {
                    this.ctx2.fillText(this.wKeys[i], 50, (25 * i) + 325);
                    var obj = {
                        "Name": this.wKeys[i],
                        "x": 50,
                        "y": (25 * i) + 325,
                        "w": this.ctx2.measureText(this.wKeys[i]).width,
                        "h": 15
                    }
                currentEquips.push(obj);
                }
            }
            else if (this.type === "Feet") {
                this.fKeys = Object.keys(eq.Feet);
                for (var i = 0; i < ObjLength(eq.Feet); i++) {
                    this.ctx2.fillText(this.fKeys[i], 50, (25 * i) + 325);
                    var obj = {
                        "Name": this.fKeys[i],
                        "x": 50,
                        "y": (25 * i) + 325,
                        "w": this.ctx2.measureText(this.fKeys[i]).width,
                        "h": 15
                    }
                currentEquips.push(obj);
                }
            }

            this.itemSelected = false;
        }
        update() {
            /*var time = Date.now();
            if (this.itemSelected) {
                this.itemSelected = false;

            }*/
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var i = 0; i < currentEquips.length; i++) {
                    var x1 = currentEquips[i].x;
                    var x2 = currentEquips[i].x + currentEquips[i].w;
                    var y1 = currentEquips[i].y - 10;
                    var y2 = currentEquips[i].y + currentEquips[i].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (this.type === "Head") {
                            for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Head); x++) {
                                if (currentEquips[i].Name === this.hKeys[x]) {
                                    this.item = JSON_CACHE['equip'].Head[this.hKeys[x]];
                                    this.battler.unequipItem(this.type);
                                    this.battler.equipItem(this.hKeys[x], this.item, 'Head');
                                    sManager.popState();
                                    break;
                                }
                            }
                        }
                        else if (this.type === "Body") {
                            for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Body); x++) {
                                if (currentEquips[i].Name === this.bKeys[x]) {
                                    //this.itemSelected = true;
                                    this.item = JSON_CACHE['equip'].Body[this.bKeys[x]];
                                    this.battler.unequipItem(this.type);
                                    this.battler.equipItem(this.bKeys[x], this.item, 'Body');
                                    sManager.popState();
                                    break;
                                }
                            }
                        }
                        else if (this.type === "Weapon") {
                            for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Weapon); x++) {
                                if (currentEquips[i].Name === this.wKeys[x]) {
                                    //this.itemSelected = true;
                                    this.item = JSON_CACHE['equip'].Weapon[this.wKeys[x]];
                                    this.battler.unequipItem(this.type);
                                    this.battler.equipItem(this.wKeys[x], this.item, 'Weapon');
                                    sManager.popState();
                                    break;
                                }
                            }
                        }
                        else if (this.type === "Feet") {
                            for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Feet); x++) {
                                if (currentEquips[i].Name === this.fKeys[x]) {
                                    //this.itemSelected = true;
                                    this.item = JSON_CACHE['equip'].Feet[this.fKeys[x]];
                                    this.battler.unequipItem(this.type);
                                    this.battler.equipItem(this.fKeys[x], this.item, 'Feet');
                                    sManager.popState();
                                    break;
                                }
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