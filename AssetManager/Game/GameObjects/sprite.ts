///<reference path='gameobject.ts' />
var statusEffects = {
    "normal": 0,
    "dead": 1,
    "poison": 2,
    "sleep": 3,
    "paralyze": 4
}
module Game {
    export class Sprite extends GameObject {
        ID;
        Base;
        Modified;
        Equipment: Object;
        Current;
        dead: boolean = false;
        Spells;
        currentState;
        //all the base attributes and methods are to be added here, this will come when
        //the battle system is being developed but for now it stays relatively empty i guess 
        constructor(img, dx?, dy?, sx?, sy?, w?, h?, scale?) {
            super(img, dx, dy, sx, sy, w, h, scale);
            this.currentState = 0;
            this.Spells = [];
            this.Equipment = {
                "Head": null,
                "Body": null,
                "Weapon": null,
                "Feet": null,
                "Accessory": null
            };
            this.Base = {
                "ID": null,
                "HP": 0,
                "MP": 0,
                "Atk": 0,
                "Def": 0,
                "Spd": 0,
                "MDef": 0,
                "Luc": 0,
                "Type": null
            };
            this.Modified =
            {
                "ID": null,
                "HP": 0,
                "MP": 0,
                "Atk": 0,
                "Def": 0,
                "Spd": 0,
                "MDef": 0,
                "Luc": 0,
                "Type": null
            };
            this.Current =
            {
                "ID": null,
                "HP": 0,
                "MP": 0,
                "Atk": 0,
                "Def": 0,
                "Spd": 0,
                "MDef": 0,
                "Luc": 0,
                "Type": null
            };
        }
        setBaseAttributes(id, hp, mp, atk, def, mdef, spd, luc, type) {
            this.Base = 
            {
                "ID" : id,
                "HP" : hp,
                "MP" : mp || 0,
                "Atk" : atk || 0,
                "Def" : def || 0,
                "Spd" : spd || 0,
                "MDef" : mdef || 0,
                "Luc" : luc || 0,
                "Type" : type,
            };
        }
        setModifiedAttributes(id?, hp?, mp?, atk?, def?, mdef?, spd?, luc?, type?) {
            this.Modified =
            {
                "ID": id,
                "HP": hp,
                "MP": mp || 0,
                "Atk": atk || 0,
                "Def": def || 0,
                "Spd": spd || 0,
                "MDef": mdef || 0,
                "Luc": luc || 0,
                "Type": type,
            };
        }

        equipItem(name, equipment: Equipable, type) {
            this.Equipment[type] = name;

                this.setModifiedAttributes(name, this.Modified['HP'] + equipment.HP, this.Modified['MP'] + equipment.MP, this.Modified['Atk'] + equipment.Atk, this.Modified['Def'] + equipment.Def, this.Modified['MDef'] + equipment.MDef, this.Modified['Spd'] + equipment.Spd, this.Modified['Luc'] + equipment.Luc, type);
        }
        unequipItem(type) {
            if (this.Equipment[type] !== null) {
                var key;
                var item;
                if (type === "Head") {
                    key = Object.keys(JSON_CACHE['equip'].Head)
                    for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Head); x++) {
                        if (this.Equipment[type] === key[x]) {
                            item = JSON_CACHE['equip'].Head[key[x]];
                            break;
                        }
                    }
                }
                else if (type === "Body") {
                    key = Object.keys(JSON_CACHE['equip'].Body)
                    for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Body); x++) {
                        if (this.Equipment[type] === key[x]) {
                            item = JSON_CACHE['equip'].Body[key[x]];
                            break;
                        }
                    }
                }
                else if (type === "Weapon") {
                    key = Object.keys(JSON_CACHE['equip'].Weapon)
                    for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Weapon); x++) {
                        if (this.Equipment[type] === key[x]) {
                            item = JSON_CACHE['equip'].Weapon[key[x]];
                            break;
                        }
                    }
                }
                else if (type === "Feet") {
                    key = Object.keys(JSON_CACHE['equip'].Feet)
                    for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Feet); x++) {
                        if (this.Equipment[type] === key[x]) {
                            item = JSON_CACHE['equip'].Feet[key[x]];
                            break;
                        }
                    }
                }
                this.setModifiedAttributes(key, this.Modified['HP'] - item.HP, this.Modified['MP'] - item.MP, this.Modified['Atk'] - item.Atk, this.Modified['Def'] - item.Def
                    , this.Modified['MDef'] - item.MDef, this.Modified['Spd'] - item.Spd, this.Modified['Luc'] - item.Luc, type);
                this.Equipment[type] = null;
            }
        }
        getTotalStats() {
            return {
                "ID": this.Base['ID'],
                "HP": this.Base['HP'] + this.Modified['HP'],
                "MP": this.Base['MP'] + this.Modified['MP'],
                "Atk": this.Base['Atk'] + this.Modified['Atk'],
                "Def": this.Base['Def'] + this.Modified['Def'],
                "Spd": this.Base['Spd'] + this.Modified['Spd'],
                "MDef": this.Base['MDef'] + this.Modified['MDef'],
                "Luc": this.Base['Luc'] + this.Modified['Luc'],
                "Type": this.Base['Type']
                };
        }
    }
}