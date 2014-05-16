///<reference path='../State.ts' />
module Game {
    export class Inventory extends State{
        context;
        items;
        mx;
        my;
        constructor(ctx2) {
            super();
            this.context = ctx2;
        }
        init() {
            this.context.clearRect(0, 0, 800, 600);
            this.context.drawImage(IMAGE_CACHE['dialog'], 15, 100);

            this.context.fillText("Items", 25, 120);
            this.context.fillText("Key Items", 75, 120);

            this.items = [];
            var ikeys = Object.keys(ITEM.consumable);
            var items = ITEM.consumable;
            for (var x = 0; x < ikeys.length; x++) {
                this.context.fillText(items[ikeys[x]].name, 25, 150 + (x * 30));
                this.items.push({
                    "name": items[ikeys[x]].name,
                    "x": 25,
                    "y": (150 + (x * 30)),
                    "w": this.context.measureText(items[ikeys[x]]).width,
                    "h": 15
                });
            }
            this.items.push({
                "name": "quest",
                "x": 75,
                "y": 120,
                "w": this.context.measureText("quest").width,
                "h": 15
            });
            this.items.push({
                "name": "consumable",
                "x": 25,
                "y": 120,
                "w": this.context.measureText("consumable").width,
                "h": 15
            });
            this.items.push({
                "name": "back",
                "x": 40,
                "y": 490,
                "w": 75,
                "h": 75
            });
        }
        reload(type: String) {
            this.context.clearRect(0, 0, 800, 600);
            if (type === "quest") {
                var ikeys = Object.keys(JSON_CACHE['items']['quest']);
                var items = JSON_CACHE['items']['quest'];
                for (var x = 0; x < ikeys.length; x++) {
                    this.context.fillText(items[ikeys[x]], 25, 130 + (x * 30));
                }
            }
            else if (type === "consumable") {
                var ikeys = Object.keys(JSON_CACHE['items']['consumable']);
                var items = JSON_CACHE['items']['consumable'];
                for (var x = 0; x < ikeys.length; x++) {
                    this.context.fillText(items[ikeys[x]], 25, 130 + (x * 30));
                }
            }
        }
        update() {
            if (mousedown) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var x = 0; x < this.items.length; x++) {
                    var x1 = this.items[x].x;
                    var x2 = this.items[x].x + this.items[x].w;
                    var y1 = this.items[x].y;
                    var y2 = this.items[x].y + this.items[x].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        switch (this.items[x].name) {
                            case "quest":
                                this.reload("quest");
                                break;
                            case "consumable":
                                this.reload("consumable");
                                break;
                            case "back":
                                sManager.popState();
                                break;
                            default:
                                for (var i = 0; i < ObjLength(this.items); i++) {
                                    if (this.items[x].name === this.items[i].name) {
                                        sManager.pushState(new ItemDetails(this.items[x], this.context));
                                    }
                                }
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