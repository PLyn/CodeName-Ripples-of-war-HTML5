var SAVE;
module Game {
    export class SaveSystem {
        MapID;
        PartyMembers: Sprite[];
        QuestItems: Object[];
        cName;
        cAmt;
        qName;
        qAmt;
        switches;
        context;

        ctx; ctx2;
        constructor(ctx) {
            this.MapID = [];
            this.PartyMembers = [];
            this.switches = [];
            this.QuestItems = [];
            //this.ConsumableItems = [];
            this.context = ctx;
            this.cName = [];
            this.cAmt = [];
            var canvas = <HTMLCanvasElement> document.getElementById('layer2');
            this.ctx = canvas.getContext('2d');

            var canvas2 = <HTMLCanvasElement> document.getElementById('layer1');
            this.ctx2 = canvas2.getContext('2d');
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
            var ckey = Object.keys(ITEM.consumable);
            if (ckey.length > 0) {
                for (var x = 0; x < ckey.length; x++) {
                    this.cName[x] = ITEM.consumable[ckey[x]].name;
                    this.cAmt[x] = ITEM.consumable[ckey[x]].quantity;
                }
            }
            /*var qkey = Object.keys(ITEM.quest)
            if (qkey.length > 0) {
                
                 for (var x = 0; x < qkey.length; x++) {
                    this.qName[x] = ITEM.quest[ckey[x]].name;
                    this.qAmt[x] = ITEM.quest[ckey[x]].quantity;
                }
            }
            localStorage['QName'] = JSON.stringify(this.qName);
            localStorage['QAmt'] = JSON.stringify(this.qAmt);*/
            localStorage['CName'] = JSON.stringify(this.cName);
            localStorage['CAmt'] = JSON.stringify(this.cAmt);
            this.ctx.clearRect(0, 0, 800, 600);
            this.ctx2.clearRect(0, 0, 800, 600);

            sManager.pushState(new Title(this.ctx));
        }
        load(w) {
            if (localStorage.getItem("TileMap") === null || localStorage.getItem("Party") === null) {
                this.context.fillText("No saved file detected. Please start a new Game", 100, 250);
            }
            else {
                var canvas = <HTMLCanvasElement> document.getElementById('layer1');
                var context = canvas.getContext('2d');
                var canvas2 = <HTMLCanvasElement> document.getElementById('layer2');
                var context2 = canvas.getContext('2d');
                TileMap = new Game.Tilemap();
                TileMap.Init();
                this.MapID = localStorage['TileMap'];
                battleList = [];
                ITEM.quest = [];
                ITEM.consumable = [];
                battleList = JSON.parse(localStorage['Party']);
                /*ITEM.quest = localStorage['Quest'];

                if (localStorage.getItem('QName') !== null) {
                    this.qName = JSON.parse(localStorage['QName']);
                    this.qAmt = JSON.parse(localStorage['QAmt']);
                    var qkey = Object.keys(this.qName);
                    for (var x = 0; x < qkey.length; x++) {
                        ITEM.quest[qkey[x]] = {
                            "name": this.qName[x],
                            "quantity": this.qAmt[x]
                        };
                    }
                }*/
            if (localStorage.getItem('CName') !== null){
                this.cName = JSON.parse(localStorage['CName']);
                this.cAmt = JSON.parse(localStorage['CAmt']);
                var ckey = Object.keys(this.cName);
                for (var x = 0; x < ckey.length; x++) {
                    ITEM.consumable[ckey[x]] = {
                        "name": this.cName[x],
                        "quantity": this.cAmt[x]
                    };
                }
            }
                sManager.pushState(new Explore(context, this.MapID));
            }
        }
    }
}