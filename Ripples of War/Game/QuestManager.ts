module Game {
    export class QuestManager {
        Switch: boolean[];
        /*
            populates a switch (array of bools) with false which is used to determine quest triggers and sequence of story based on the 
            values of different indexes of the switch. indexes with the names of maps can be used to auto start a scene on entering
            location hence it can be set to true 
        */
        constructor() {
            this.Switch = [];
            var key = Object.keys(JSON_CACHE['location']);
            for (var x = 0; x < key.length; x++) {
                var bkeys = Object.keys(JSON_CACHE['location'][key[x]]);
                for (var y = 0; y < bkeys.length; y++) {
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
}