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
            //loads items that are consumables by default
            this.reload("consumable");
        }
        /*
            reloads the items seen based on the current category of items selected 
            (consumables or quest items)
        */
        reload(type: String) {
            this.context.clearRect(0, 0, 800, 600);
            this.items = []; //empties object that stores items
            //back button
            this.context.drawImage(IMAGE_CACHE['back'], 40, 490); 
            if (type === "quest") {
                //draws the main window, then the two smaller boxes around the consumables and quest text
                quickWindow(this.context, 25, 100, 600, 300, "blue", "red");
                quickWindow(this.context, 30, 105, this.context.measureText("Consumable").width + 10, 20, "#73B1B7", "#4A777A");
                quickWindow(this.context, 150, 105, this.context.measureText("(Quest)").width + 10, 20, "#73B1B7", "#4A777A");

                setStyle(this.context, 'calibre', 16, "white");
                this.context.fillText("Consumable", 30, 120);
                this.context.fillText("(Quest)", 150, 120);

                //gets the info from the json about each quest item
                var ikeys = Object.keys(JSON_CACHE['items']['quest']);
                var items = JSON_CACHE['items']['quest'];
                var ikeys = Object.keys(ITEM.quest);
                var items = ITEM.quest;
                for (var x = 0; x < ikeys.length; x++) {
                    if (items[ikeys[x]].quantity > 0) {
                        //draws box aorund item and adds items bounds to object 
                        quickWindow(this.context, 40, 140 + (x * 30), 110, 15, "#73B1B7", "#4A777A");
                        setStyle(this.context, 'calibre', 12, "white");
                        this.context.fillText(items[ikeys[x]].name, 50, 150 + (x * 30));
                        this.context.fillText(items[ikeys[x]].quantity, 125, 150 + (x * 30));
                        this.items.push({
                            "name": items[ikeys[x]].name,
                            "x": 40,
                            "y": 140 + (x * 30),
                            "w": this.context.measureText(items[ikeys[x]].name).width,
                            "h": 15
                        });
                    }
                }
            }
            else if (type === "consumable") {
                quickWindow(this.context, 25, 100, 600, 300, "blue", "red");
                quickWindow(this.context, 30, 105, this.context.measureText("(Consumable)").width + 10, 20, "#73B1B7", "#4A777A");
                quickWindow(this.context, 150, 105, this.context.measureText("Quest").width + 10, 20, "#73B1B7", "#4A777A");

                setStyle(this.context, 'calibre', 16, "white");
                this.context.fillText("(Consumable)", 30, 120);
                this.context.fillText("Quest", 150, 120);

                var ikeys = Object.keys(ITEM.consumable);
                var items = ITEM.consumable;
                for (var x = 0; x < ikeys.length; x++) {
                    if (items[ikeys[x]].quantity > 0) {
                        quickWindow(this.context, 40, 140 + (x * 30), 110, 15, "#73B1B7", "#4A777A");
                        setStyle(this.context, 'calibre', 12, "white");
                        this.context.fillText(items[ikeys[x]].name, 50, 150 + (x * 30));
                        this.context.fillText(items[ikeys[x]].quantity, 125, 150 + (x * 30));
                        this.items.push({
                            "name": items[ikeys[x]].name,
                            "x": 40,
                            "y": 140 + (x * 30),
                            "w": this.context.measureText(items[ikeys[x]].name).width,
                            "h": 15
                        });
                    }
                }
            }
            //adds menu items bounds to the object for hit detection
            this.items.push({
                "name": "quest",
                "x": 150,
                "y": 115,
                "w": this.context.measureText("quest").width,
                "h": 5
            });
            this.items.push({
                "name": "consumable",
                "x": 30,
                "y": 115,
                "w": this.context.measureText("consumable").width,
                "h": 5
            });
            this.items.push({
                "name": "back",
                "x": 40,
                "y": 490,
                "w": 75,
                "h": 75
            });
        }
        update() {
            if (mouseClicked()) {
                //gets mouse coordinates
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var x = 0; x < this.items.length; x++) {
                    var x1 = this.items[x].x;
                    var x2 = this.items[x].x + this.items[x].w;
                    var y1 = this.items[x].y;
                    var y2 = this.items[x].y + this.items[x].h;
                    //if there is a click on any of the objects
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        switch (this.items[x].name) {
                            case "quest":
                                //reload to show quest items
                                this.reload("quest");
                                break;
                            case "consumable":
                                //reload to show consumables
                                this.reload("consumable");
                                break;
                            case "back":
                                //clear screen and go back to previous state
                                this.context.clearRect(0, 0 ,800, 600);
                                sManager.popState();
                                break;
                            default:
                                //move to next state to show item details
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
    }
}