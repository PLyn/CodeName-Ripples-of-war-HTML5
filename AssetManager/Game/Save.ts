module Game {
    export class SaveSystem {
        TileMapObjects;
        PartyMembers: Sprite[];
        switches;

        constructor() {
            this.TileMapObjects = [];
            this.PartyMembers = [];
            this.switches = [];
        }
        save() {
            this.TileMapObjects = objects;
            var k = Object.keys(battleList);
            for (var x = 0; x < k.length; x++) {
                if (battleList[k[x]].Base.Type === 0) {
                    this.PartyMembers.push(battleList[k[x]]);
                }
            }
            localStorage['Party'] = JSON.stringify(this.PartyMembers);
            localStorage['TileMap'] = JSON.stringify(this.TileMapObjects);
        }
        load() {
            objects = [];
            objects = JSON.parse(localStorage['TileMap']);
            battleList = [];
            battleList = JSON.parse(localStorage['Party']);
        }
    }
}