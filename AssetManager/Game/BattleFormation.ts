var FORMATION;
module Game {
    export class BattleFormation {
        positions;
        bonus;
        current;
        formKey;
        battleKeys;
        positionLength = 2;

        constructor() {
            this.formKey = Object.keys(JSON_CACHE['formation']['Formations']);     
            this.current = this.formKey[0];
            this.positions = [];
            var currentFormation = JSON_CACHE['formation']['Formations'][this.current];
            //add positions 
            for (var i = 0; i < this.formKey.length; i++) {
                var obj = {
                    "x": currentFormation.positions.x[i],
                    "y": currentFormation.positions.y[i]
                };
                this.positions[i] = obj;
            }
            //add bonues to objects
            this.bonus = {
                "HP": currentFormation.bonus.HP,
                "MP": currentFormation.bonus.MP,
                "Atk": currentFormation.bonus.Atk,
                "Def": currentFormation.bonus.Def,
                "Spd": currentFormation.bonus.Spd,
                "MDef": currentFormation.bonus.MDef,
                "Luc": currentFormation.bonus.Luc
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
            var fKeys = Object.keys(JSON_CACHE['formation']['Formations']);
            for (var i = 0; i < this.formKey.length; i++) {
                if (formation === this.formKey[i]) {
                    this.current = this.formKey[i];
                }
            }
            //add bonues to objects
            this.bonus = {
                "HP": JSON_CACHE['formation']['Formations'][this.current].bonus.HP,
                "MP": JSON_CACHE['formation']['Formations'][this.current].bonus.MP,
                "Atk": JSON_CACHE['formation']['Formations'][this.current].bonus.Atk,
                "Def": JSON_CACHE['formation']['Formations'][this.current].bonus.Def,
                "Spd": JSON_CACHE['formation']['Formations'][this.current].bonus.Spd,
                "MDef": JSON_CACHE['formation']['Formations'][this.current].bonus.MDef,
                "Luc": JSON_CACHE['formation']['Formations'][this.current].bonus.Luc
            };
            //add stats to modified
            for (var i = 0; i < this.battleKeys.length; i++) {
                if (battleList[i].Base.Type === 0) {
                    battleList[i].setModifiedAttributes(battleList[i].Modified.ID, battleList[i].Modified['HP'] + this.bonus.HP, battleList[i].Modified['MP'] + this.bonus.MP, battleList[i].Modified['Atk'] + this.bonus.Atk, battleList[i].Modified['Def'] + this.bonus.Def, battleList[i].Modified['MDef'] + this.bonus.MDef, battleList[i].Modified['Spd'] + this.bonus.Spd, battleList[i].Modified['Luc'] + this.bonus.Luc, battleList[i].Modified.Type);
                }
            }
            //add positions 
            for (var i = 0; i < this.formKey.length; i++) {
                var obj = {
                    "x": JSON_CACHE['formation']['Formations'][this.current].positions.x[i],
                    "y": JSON_CACHE['formation']['Formations'][this.current].positions.y[i]
                };
                this.positions[i] = obj;
            }
        }
    }
}