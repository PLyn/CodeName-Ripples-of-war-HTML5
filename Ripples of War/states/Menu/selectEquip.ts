﻿///<reference path='../State.ts' />
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
        battler: Sprite;

        constructor(ctx2, type, battler) {
            super();
            this.ctx2 = ctx2;
            this.type = type;
            this.battler = battler;
        }
        init() {
            //this.ctx2.drawImage(IMAGE_CACHE['dialog'], 15, 300);
            this.ctx2.drawImage(IMAGE_CACHE['back'], 25, 500);
            quickWindow(this.ctx2, 25, 300, 500, 200, "blue", "red");
            setStyle(this.ctx2, 'calibre', 12, 'white');
            var eq = JSON_CACHE['equip'];
            if (this.type === "Head") {
                this.hKeys = Object.keys(eq.Head);
                for (var i = 0; i < ObjLength(eq.Head); i++) {
                    this.ctx2.fillText(this.hKeys[i], 50, (25 * i) + 325);
                    var obj = {
                        "Name": this.hKeys[i],
                        "x": 50,
                        "y": (25 * i) + 320,
                        "w": this.ctx2.measureText(this.hKeys[i]).width,
                        "h": 5
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
                        "y": (25 * i) + 320,
                        "w": this.ctx2.measureText(this.bKeys[i]).width,
                        "h": 5
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
                        "y": (25 * i) + 320,
                        "w": this.ctx2.measureText(this.wKeys[i]).width,
                        "h": 5
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
                        "y": (25 * i) + 320,
                        "w": this.ctx2.measureText(this.fKeys[i]).width,
                        "h": 5
                    }
                currentEquips.push(obj);
                }
            }
            var object = {
                "Name": "back",
                "x": 25,
                "y": 500,
                "w": this.ctx2.measureText("back").width,
                "h": 50
            };
            currentEquips.push(object);
            this.itemSelected = false;
        }
        update() {
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var i = 0; i < currentEquips.length; i++) {
                    var x1 = currentEquips[i].x;
                    var x2 = currentEquips[i].x + currentEquips[i].w;
                    var y1 = currentEquips[i].y - 10;
                    var y2 = currentEquips[i].y + currentEquips[i].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (currentEquips[i].Name === "back") {
                            //this.ctx2.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                            sManager.popState();
                        }
                        else if (this.type === "Head") {
                            for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Head); x++) {
                                if (currentEquips[i].Name === this.hKeys[x]) {
                                    this.item = JSON_CACHE['equip'].Head[this.hKeys[x]];
                                    sManager.popState();
                                    sManager.pushState(new EquipDetails(this.ctx2, this.item, this.hKeys[x], this.type, this.battler));
                                    break;
                                }
                            }
                        }
                        else if (this.type === "Body") {
                            for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Body); x++) {
                                if (currentEquips[i].Name === this.bKeys[x]) {
                                    //this.itemSelected = true;
                                    this.item = JSON_CACHE['equip'].Body[this.bKeys[x]];
                                    sManager.popState();
                                    sManager.pushState(new EquipDetails(this.ctx2, this.item, this.bKeys[x], this.type, this.battler));
                                    break;
                                }
                            }
                        }
                        else if (this.type === "Weapon") {
                            for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Weapon); x++) {
                                if (currentEquips[i].Name === this.wKeys[x]) {
                                    //this.itemSelected = true;
                                    this.item = JSON_CACHE['equip'].Weapon[this.wKeys[x]];
                                    sManager.popState();
                                    sManager.pushState(new EquipDetails(this.ctx2, this.item, this.wKeys[x], this.type, this.battler));
                                    break;
                                }
                            }
                        }
                        else if (this.type === "Feet") {
                            for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Feet); x++) {
                                if (currentEquips[i].Name === this.fKeys[x]) {
                                    //this.itemSelected = true;
                                    this.item = JSON_CACHE['equip'].Feet[this.fKeys[x]];
                                    sManager.popState();
                                    sManager.pushState(new EquipDetails(this.ctx2, this.item, this.fKeys[x], this.type, this.battler));
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}