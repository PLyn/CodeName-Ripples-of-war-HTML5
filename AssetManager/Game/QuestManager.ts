var QUEST;
module Game {
    export class QuestManager {
        Switch: boolean[];

        constructor() {
            this.Switch = [];
            var key = Object.keys(JSON_CACHE['switches']);
            for (var x = 0; x < key.length; x++) {
                this.Switch[key[x]] = JSON_CACHE['switches'][key[x]];
            }
        }
    }
}