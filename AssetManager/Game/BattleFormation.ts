var FORMATION;
module Game {
    export class Formation {
        positions;
        bonus;
        current;
        formKey;
        battleKeys;
        positionLength = 2;

        constructor() {
            this.formKey = Object.keys(JSON_CACHE['formation']['Formations']);     
            this.current = JSON_CACHE['formation']['Formations'][this.formKey[0]];
            this.positions = [];

            //add positions 
            for (var i = 0; i < this.positionLength; i++) {
                var obj = {
                    "x": this.current.positions.x[i],
                    "y": this.current.positions.y[i]
                };
                this.positions[i] = obj;
            }
            //add bonues to objects
            this.bonus = {
                "HP": this.current.bonus.HP,
                "MP": this.current.bonus.MP,
                "Atk": this.current.bonus.Atk,
                "Def": this.current.bonus.Def,
                "Spd": this.current.bonus.Spd,
                "MDef": this.current.bonus.MDef,
                "Luc": this.current.bonus.Luc
            };

            this.battleKeys = Object.keys(battleList);
            //add stats to modified
            for (var i = 0; i < this.battleKeys.length; i++) {
                if (battleList[i].Base.Type === 0) {
                    battleList[i].setModifiedAttributes(battleList[i].Modified.ID, battleList[i].Modified['HP'] + this.bonus.HP, battleList[i].Modified['MP'] + this.bonus.MP, battleList[i].Modified['Atk'] + this.bonus.Atk, battleList[i].Modified['Def'] + this.bonus.Def, battleList[i].Modified['MDef'] + this.bonus.MDef, battleList[i].Modified['Spd'] + this.bonus.Spd, battleList[i].Modified['Luc'] + this.bonus.Luc, battleList[i].Modified.Type);
                }
            }
        }
        setFormation(formation: String) {
            //remove bonuses before applying new onw
            for (var i = 0; i < this.battleKeys.length; i++) {
                if (battleList[i].Base.Type === 0) {
                    battleList[i].setModifiedAttributes(battleList[i].Modified.ID, battleList[i].Modified['HP'] - this.bonus.HP, battleList[i].Modified['MP'] - this.bonus.MP, battleList[i].Modified['Atk'] - this.bonus.Atk, battleList[i].Modified['Def'] - this.bonus.Def, battleList[i].Modified['MDef'] - this.bonus.MDef, battleList[i].Modified['Spd'] - this.bonus.Spd, battleList[i].Modified['Luc'] - this.bonus.Luc, battleList[i].Modified.Type);
                }
            }
            //find reference to new formation
            for (var i = 0; i < ObjLength(JSON_CACHE['formation']); i++) {
                if (formation === this.formKey[i]) {
                    this.current = JSON_CACHE['formation']['Formations'][this.formKey[i]];
                }
            }
            //add stats to modified
            for (var i = 0; i < this.battleKeys.length; i++) {
                if (battleList[i].Base.Type === 0) {
                    battleList[i].setModifiedAttributes(battleList[i].Modified.ID, battleList[i].Modified['HP'] + this.bonus.HP, battleList[i].Modified['MP'] + this.bonus.MP, battleList[i].Modified['Atk'] + this.bonus.Atk, battleList[i].Modified['Def'] + this.bonus.Def, battleList[i].Modified['MDef'] + this.bonus.MDef, battleList[i].Modified['Spd'] + this.bonus.Spd, battleList[i].Modified['Luc'] + this.bonus.Luc, battleList[i].Modified.Type);
                }
            }
            //add positions to the array
            for (var i = 0; i < this.positionLength; i++) {
                var obj = {
                    "x": this.current.positions.x[i],
                    "y": this.current.positions.y[i]
                };
                this.positions[i] = obj;
            }
        }
    }
}