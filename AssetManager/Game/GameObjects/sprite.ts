///<reference path='gameobject.ts' />
module Game {
    export class Sprite extends GameObject {
        ID;
        HP;
        MP;
        Atk;
        Def;
        Spd;
        MDef;
        Luc;
        Type;
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
        }
        setAttributes(id, hp, mp, atk, def, mdef, spd, luc, type) {
            this.ID = id;
            this.HP = hp || 1;
            this.MP = mp || 0;
            this.Atk = atk || 0;
            this.Def = def || 0;
            this.Spd = spd || 0;
            this.MDef = mdef || 0;
            this.Luc = luc || 0;
            this.Type = type || 0;
        }

        equipItem(equipment: Equipable, type) {
            this.Equipment[type] = equipment.Name;
            this.setAttributes(this.ID, this.HP + equipment.HP, this.MP + equipment.MP, this.Atk + equipment.Atk, this.Def + equipment.Def
                , this.MDef + equipment.MDef, this.Spd + equipment.Spd, this.Luc + equipment.Luc, this.Type);
        }
        unequipItem(equipment: Equipable, type) {
            this.Equipment[type] = null;
            this.setAttributes(this.ID, this.HP - equipment.HP, this.MP - equipment.MP, this.Atk - equipment.Atk, this.Def - equipment.Def
                , this.MDef - equipment.MDef, this.Spd - equipment.Spd, this.Luc - equipment.Luc, this.Type);
        }
    }
}