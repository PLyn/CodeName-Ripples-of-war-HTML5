var ITEM;
module Game {
    export class ItemManager {
        consumable: Object[];
        quest: Object[];
        itemSource;
        itemKeys;
        constructor() {
            this.consumable = [];
            this.quest = [];
        }
        add(name, amt, type) {
            if (type === "consumable") {
                this.itemSource = JSON_CACHE['items']['consumable'];
                this.itemKeys = Object.keys(JSON_CACHE['items']['consumable']);
            }
            else if (type === "quest") {
                this.itemSource = JSON_CACHE['items']['quest'];
                this.itemKeys = Object.keys(JSON_CACHE['items']['quest']);
            }
            for (var x = 0; x < this.itemKeys.length; x++) {
                if (name === this.itemSource[this.itemKeys[x]].name) {
                    if (type === "consumable") {
                        this.consumable[this.itemKeys[x]] = {
                            "name": this.itemSource[this.itemKeys[x]].name,
                            "quantity": amt
                        };
                    }
                    else if (type === "quest") {
                        this.quest[this.itemKeys[x]] = {
                            "name": this.itemSource[this.itemKeys[x]],
                            "quantity": amt
                        };
                    }
                }
            }
        }
    }
}