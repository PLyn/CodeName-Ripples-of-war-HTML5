var SAVE;
module Game {
    export class SaveSystem {
        MapID;
        PartyMembers: Sprite[];
        switches;
        context;
        constructor(ctx) {
            this.MapID = [];
            this.PartyMembers = [];
            this.switches = [];
            this.context = ctx;
        }
        save() {
            this.MapID = TileMap.currentIndex;
            var k = Object.keys(battleList);
            for (var x = 0; x < k.length; x++) {
                if (battleList[k[x]].Base.Type === 0) {
                    this.PartyMembers.push(battleList[k[x]]);
                }
            }
            localStorage['Party'] = JSON.stringify(this.PartyMembers);
            localStorage['TileMap'] = this.MapID;
            this.context.clearRect(0 ,0 , 800, 600);
            sManager.restart();
            sManager.pushState(new Title(this.context, 800));
        }
        load(w) {
            if (localStorage.getItem("TileMap") === null || localStorage.getItem("Party") === null) {
                this.context.fillText("No saved file detected. Please start a new Game", 100, 250);
            }
            else {
                this.MapID = localStorage['TileMap'];
                battleList = [];
                battleList = JSON.parse(localStorage['Party']);
                sManager.pushState(new Explore(this.context, w, this.MapID));
            }
        }
    }
}