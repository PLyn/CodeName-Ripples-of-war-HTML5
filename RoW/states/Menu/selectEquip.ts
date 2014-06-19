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
        keys;
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
            currentEquips = [];
        }
        /*
            determine what type of equipment shoudl be shown adn add the bounds to an object while printing them to the screen
        */
        init() {
            this.ctx2.drawImage(IMAGE_CACHE['back'], 25, 500);
            quickWindow(this.ctx2, 25, 300, 500, 200, "blue", "red");
            setStyle(this.ctx2, 'calibre', 12, 'white');
            var eq = JSON_CACHE['equip'];
            this.keys = Object.keys(eq[this.type]);
            for (var i = 0; i < ObjLength(eq[this.type]); i++) {
                this.ctx2.fillText(this.keys[i], 50, (25 * i) + 325);
                var obj = {
                    "Name": this.keys[i],
                    "x": 50,
                    "y": (25 * i) + 320,
                    "w": this.ctx2.measureText(this.keys[i]).width,
                    "h": 5
                }
                currentEquips.push(obj);
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
        /*
            takes player input to determine which equip was selected and pushes that equip to the next state 
            to see details of the equipment
        */
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
                            sManager.popState();
                        }
                        else {
                            for (var x = 0; x <= ObjLength(JSON_CACHE['equip'][this.type]); x++) {
                                if (currentEquips[i].Name === this.keys[x]) {
                                    this.item = JSON_CACHE['equip'][this.type][this.keys[x]];
                                    sManager.popState();
                                    sManager.pushState(new EquipDetails(this.ctx2, this.item, this.keys[x], this.type, this.battler));
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