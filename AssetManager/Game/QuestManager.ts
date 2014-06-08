var QUEST;
module Game {
    export class QuestManager {
        Switch: boolean[];

        constructor() {
            this.Switch = [];
            var key = Object.keys(JSON_CACHE['location']);
            for (var x = 0; x < key.length; x++) {
                var bkeys = Object.keys(JSON_CACHE['location'][key[x]]);
                for (var y = 0; y < bkeys.length; y++)
                    if (bkeys[y] === key[x]) {
                        this.Switch[bkeys[y]] = JSON_CACHE['location'][key[x]][key[x]]['auto'];
                    }
                    else {
                        this.Switch[bkeys[y]] = false;
                    }
            }
        }
    }
}