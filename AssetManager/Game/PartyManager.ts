var PARTY;
module Game {
    export class PartyManager {
        character;
        constructor() {
            this.character = "";
        }
        add(char, type) {
            var keys = Object.keys(JSON_CACHE['character']['Party']);
            for (var x = 0; x < keys.length; x++) {
                if (char === keys[x]) {
                    var b = JSON_CACHE['character']['Party'][keys[x]];
                    var p1 = new Sprite(IMAGE_CACHE[b.Img], 400, 250, 35, 35);
                    p1.setBaseAttributes(keys[x], b.HP, b.MP, b.Atk, b.Def, b.MDef, b.Spd, b.Luc, type);
                    //p1.setBaseAttributes('hero', 10, 0, 4, 1, 1, 1, 1, 0);
                    battleList.push(p1);
                }
            }
        }
        remove(char, type) {
            var keys = Object.keys(battleList);
            for (var c = 0; c < keys.length; c++) {
                if (char === battleList[c].Base.ID) {
                    battleList.splice(c, 1);
                    break;
                }
            }
        }
    }
}