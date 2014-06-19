///<reference path='gameobject.ts' />
module Game {
    export class Sprite extends GameObject {
        Level;
        ID;
        Base;
        Modified;
        Equipment: Object;
        Current;
        dead;
        Spells;
        currentState;
        growth;
        defend;
        ElementResist;
        StatusResist;

        constructor(iKey, img, dx?, dy?, sx?, sy?, w?, h?, scale?) {
            super(iKey, img, dx, dy, sx, sy, w, h, scale);
            this.defend = false;
            this.dead = false;
            this.currentState = 0;
            this.Spells = [];
            //equipment object for holding name of the current equipment
            this.Equipment = {
                "Head": null,
                "Body": null,
                "Weapon": null,
                "Feet": null,
                "Accessory": null
            };
            //base stats of the sprite before equipment and other bonuses
            this.Base = {
                "ID": null,
                "HP": 0,
                "MP": 0,
                "Atk": 0,
                "Def": 0,
                "Spd": 0,
                "MAtk": 0,
                "MDef": 0,
                "Luc": 0,
                "Type": null
            };
            //modified is the additional stats that is added to the base stats
            this.Modified = this.Base;
            //current stats is the total of base and modified that is set at start of battle to be modifed as the battle goes on
            //this object is modified so that the original objects are not modified
            this.Current = this.Base;
            //resistance of sprite which reduces the damage done by attacks of that element
            this.ElementResist = {
                "Physical": 0,
                "Fire": 0,
                "Ice": 0,
                "Thunder": 0,
                "Wind": 0, 
                "Earth": 0,
                "Light": 0, 
                "Dark": 0,
            };
            //increases chance of resisting status ailments
            this.StatusResist = {
                "Poison": 0,
                "Paralysis": 0,
                "Sleep": 0
            };
            //level of character, characters get stronger as they level up
            this.Level = 1;
        }
        /*
            sets the base stats of the character along with their name and whether they 
            are enemy or ally
        */
        setBaseAttributes(id, hp, mp, atk, def, spd, matk, mdef, luc, type) {
            this.Base = 
            {
                "ID" : id,
                "HP" : hp,
                "MP" : mp || 0,
                "Atk" : atk || 0,
                "Def" : def || 0,
                "Spd": spd || 0,
                "MAtk": matk || 0,
                "MDef" : mdef || 0,
                "Luc" : luc || 0,
                "Type" : type,
            };
        }
        /*
            sets the modified stats which is the bonus attributes of the character along with their name and whether they 
            are enemy or ally
        */
        setModifiedAttributes(id?, hp?, mp?, atk?, def?, spd?, matk?, mdef?, luc?, type?) {
            this.Modified =
            {
                "ID": id,
                "HP": hp,
                "MP": mp || 0,
                "Atk": atk || 0,
                "Def": def || 0,
                "Spd": spd || 0,
                "MAtk": matk || 0,
                "MDef": mdef || 0,
                "Luc": luc || 0,
                "Type": type,
            };
        }
        /*
            Stores string name in Sprite.Equipment Object and uses the equipment data to add bonus stats to the modified object
        */
        equipItem(name, equipment, type) {
            this.Equipment[type] = name;
            this.setModifiedAttributes(name,
                this.Modified['HP'] + equipment.HP,
                this.Modified['MP'] + equipment.MP,
                this.Modified['Atk'] + equipment.Atk,
                this.Modified['Def'] + equipment.Def,
                this.Modified['Spd'] + equipment.Spd,
                this.Modified['MAtk'] + equipment.MAtk,
                this.Modified['MDef'] + equipment.MDef,
                this.Modified['Luc'] + equipment.Luc,
                type);
        }
        /*
            checks which type of equip is to be unequipped and then stores the equipment in the item variable and uses the data 
            to remove the bonus stats that the equipment provided then removed the equip Name in the sprite.Equipment object
        */
        unequipItem(type) {
            var key;
            var item;
            if (this.Equipment[type] !== null) {
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
                this.setModifiedAttributes(key,
                    this.Modified['HP'] - item.HP,
                    this.Modified['MP'] - item.MP,
                    this.Modified['Atk'] - item.Atk,
                    this.Modified['Def'] - item.Def,
                    this.Modified['Spd'] - item.Spd,
                    this.Modified['MAtk'] - item.MAtk,
                    this.Modified['MDef'] - item.MDef,
                    this.Modified['Luc'] - item.Luc,
                    type);
                this.Equipment[type] = null;
            }
        }
        /*
            returns total stats which is the addition of Base and modified stats
        */
        getTotalStats() {
            //gets the total of the base and the modified to get the total stats
            return {
                "ID": this.Base['ID'],
                "HP": this.Base['HP'] + this.Modified['HP'],
                "MP": this.Base['MP'] + this.Modified['MP'],
                "Atk": this.Base['Atk'] + this.Modified['Atk'],
                "Def": this.Base['Def'] + this.Modified['Def'],
                "Spd": this.Base['Spd'] + this.Modified['Spd'],
                "MAtk": this.Base['MAtk'] + this.Modified['MAtk'],
                "MDef": this.Base['MDef'] + this.Modified['MDef'],
                "Luc": this.Base['Luc'] + this.Modified['Luc'],
                "Type": this.Base['Type']
                };
        }
    }
}