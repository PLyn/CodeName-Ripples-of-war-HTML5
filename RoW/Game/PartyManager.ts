module Game {
    export class PartyManager {
        constructor() {
        }
        /*
            searches for name of character that matches provided name and creates sprite class from attributes and data in the JSON file 
        */
        add(char, x?, y?) {
            var x = x || 0;
            var y = y || 0;
                var keys = Object.keys(JSON_CACHE['character']['Party']);
                for (var s = 0; s < keys.length; s++) {
                    if (char === keys[s]) {
                        var b = JSON_CACHE['character']['Party'][keys[s]];
                        var p1 = new Sprite(b.Img, IMAGE_CACHE[b.Img], 0, 0);
                        p1.setBaseAttributes(keys[s], b.HP, b.MP, b.Atk, b.Def, b.Spd, b.MAtk, b.MDef, b.Luc, 0);
                        p1.growth = b.growth;
                        battleList.push(p1);
                }
            }
        }
        /*
            searches for character in Battle List with the provided name and removes that sprite from the array
        */
        remove(char) {
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