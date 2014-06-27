module Game {
    export class ItemManager {
        consumable: Object[];
        quest: Object[];
        equipment: Object[];
        itemSource;
        itemKeys;
        constructor() {
            this.consumable = [];
            this.quest = [];
            this.equipment = [];
        }
        /*
            adds new item to the player's inventory either as a consumable or quest item and takes the amount and adds it
            to the appropriate object that holds the player's items
        */
        add(name, amt, type) {
            if (type === "consumable") {
                this.itemSource = JSON_CACHE['items']['consumable'];
                this.itemKeys = Object.keys(JSON_CACHE['items']['consumable']);
            }
            else if (type === "quest") {
                this.itemSource = JSON_CACHE['items']['quest'];
                this.itemKeys = Object.keys(JSON_CACHE['items']['quest']);
            }
            else if (type === "Head" || type === "Body" || type === "Weapon" || type === "Feet") {
                this.itemSource = JSON_CACHE['equip'][type];
                this.itemKeys = Object.keys(JSON_CACHE['equip'][type]);
            }
            for (var x = 0; x < this.itemKeys.length; x++) {
                if (name === this.itemKeys[x]) {
                    if (type === "consumable") {
                        this.consumable[this.itemKeys[x]] = {
                            "name": this.itemSource[this.itemKeys[x]].name,
                            "quantity": amt
                        };
                        //UNTESTED
                        if (this.consumable[this.itemKeys[x]]['quantity'] <= 0) {
                            this.consumable.splice(x, 1);
                        }
                    }
                    else if (type === "quest") {
                        this.quest[this.itemKeys[x]] = {
                            "name": this.itemSource[this.itemKeys[x]].name,
                            "quantity": amt
                        };
                        //UNTESTED
                        if (this.quest[this.itemKeys[x]]['quantity'] <= 0) {
                            this.quest.splice(x, 1);
                        }
                    }
                    else if (type === "Head" || type === "Body" || type === "Weapon" || type === "Feet") {
                        this.equipment[this.itemKeys[x]] = {
                            "name": this.itemSource[this.itemKeys[x]].name,
                            "quantity": amt,
                            "type": type
                        };
                        //UNTESTED
                        if (this.equipment[this.itemKeys[x]]['quantity'] <= 0) {
                            this.equipment.splice(x, 1);
                        }
                    }
                }
            }
        }
    }
}