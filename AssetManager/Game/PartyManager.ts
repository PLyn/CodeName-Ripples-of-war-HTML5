var PARTY;
module Game {
    export class PartyManager {
        character;
        constructor() {
            this.character = "";
        }
        add(char, type, x?, y?) {
            var x = x || 400;
            var y = y || 250;
            if (type === 0) {
                var keys = Object.keys(JSON_CACHE['character']['Party']);
                for (var s = 0; s < keys.length; s++) {
                    if (char === keys[s]) {
                        var b = JSON_CACHE['character']['Party'][keys[s]];
                        var p1 = new Sprite(IMAGE_CACHE[b.Img], 0, 0);
                        p1.setBaseAttributes(keys[s], b.HP, b.MP, b.Atk, b.Def, b.MDef, b.Spd, b.Luc, type);
                        //p1.setBaseAttributes('hero', 10, 0, 4, 1, 1, 1, 1, 0);
                        p1.growth = b.growth;
                        battleList.push(p1);
                    }
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