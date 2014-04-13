///<reference path='gameobject.ts' />
module Game {
    export class Sprite extends GameObject {
        ID;
        Base;
        Modified;
        Equipment: Object;
        //all the base attributes and methods are to be added here, this will come when
        //the battle system is being developed but for now it stays relatively empty i guess 
        constructor(img, x, y, w, h, scale?) {
            super(img, x, y, w, h, scale);
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
        }
        setBaseAttributes(id, hp, mp, atk, def, mdef, spd, luc, type) {
            this.Base = 
            {
                "ID" : id,
                "HP" : hp || 1,
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
                "ID": "",
                "HP": hp || 0,
                "MP": mp || 0,
                "Atk": atk || 0,
                "Def": def || 0,
                "Spd": spd || 0,
                "MDef": mdef || 0,
                "Luc": luc || 0,
                "Type": type || 0,
            };
        }

        equipItem(equipment: Equipable, type) {
            this.Equipment[type] = equipment.Name;

            this.setModifiedAttributes(equipment.Name, equipment.HP, equipment.MP, equipment.Atk, equipment.Def
                , equipment.MDef, equipment.Spd, equipment.Luc, equipment.Type);
        }
        unequipItem(type) {
            this.Equipment[type] = null;
            this.setModifiedAttributes();
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