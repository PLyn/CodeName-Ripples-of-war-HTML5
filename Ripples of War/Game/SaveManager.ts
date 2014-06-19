
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
        context2;
        constructor(ctx) {
            this.MapID = [];
            this.PartyMembers = [];
            this.cName = [];
            this.cAmt = [];
            var canvas = <HTMLCanvasElement> document.getElementById('layer1');
            this.context = canvas.getContext('2d');

            var canvas2 = <HTMLCanvasElement> document.getElementById('layer2');
            this.context2 = canvas2.getContext('2d');
        }
        /*
            serializes the progress accomplished by the player and saves it via the HTML5 localstorage API 
            data saved:
            MapID to draw map
            party members including stats, skills, equips and level
            Items including consumables and Quest items
            current formation
            quest progress
        */        
        save() {
            this.MapID = TileMap.currentIndex;
            localStorage['TileMap'] = this.MapID;

            var k = Object.keys(battleList);
            for (var x = 0; x < k.length; x++) {
                if (battleList[k[x]].Base.Type === 0) {
                    this.PartyMembers.push(battleList[k[x]]);
                }
            }
            localStorage['Party'] = JSON.stringify(this.PartyMembers);
            localStorage['PImg'] = JSON.stringify(battleList[0].img);

            var ckey = Object.keys(ITEM.consumable);
            if (ckey.length > 0) {
                for (var x = 0; x < ckey.length; x++) {
                    this.cName[x] = ITEM.consumable[ckey[x]].name;
                    this.cAmt[x] = ITEM.consumable[ckey[x]].quantity;
                }
            }
            localStorage['CName'] = JSON.stringify(this.cName);
            localStorage['CAmt'] = JSON.stringify(this.cAmt);

            if (ITEM.quest !== 'undefined') {
                var qkey = Object.keys(ITEM.quest)
                if (qkey.length > 0) {
                    for (var x = 0; x < qkey.length; x++) {
                        this.qName[x] = ITEM.quest[qkey[x]].name;
                        this.qAmt[x] = ITEM.quest[qkey[x]].quantity;
                    }
                }
                localStorage['QName'] = JSON.stringify(this.qName);
                localStorage['QAmt'] = JSON.stringify(this.qAmt);
            }
            localStorage['Quests'] = JSON.stringify(QUEST.Switch);
            localStorage['Formation'] = JSON.stringify(FORMATION.current);

            this.context.clearRect(0, 0, 800, 600);
            this.context2.clearRect(0, 0, 800, 600);
            sManager.pushState(new Title(this.context));
        }
        /*
            Loads the data from localstorage and puts the data back into each of the 
            appropriate data stores for each data.
        */
        load() {
            if (localStorage.getItem("TileMap") === null || localStorage.getItem("Party") === null) {
                this.context.fillText("No saved file detected. Please start a new Game", 100, 250);
            }
            else {
                TileMap = new Game.Tilemap();
                TileMap.Init();
                this.MapID = localStorage['TileMap'];
                battleList = [];
                ITEM.quest = [];
                ITEM.consumable = [];
                FORMATION.current = JSON.parse(localStorage['Formation']);
                QUEST.Switch = JSON.parse(localStorage['Quests']);

                var keys = Object.keys(JSON.parse(localStorage['Party']));
                var party = JSON.parse(localStorage['Party']);
                for (var s = 0; s < keys.length; s++) {
                    var b = party[s];
                    var p1 = new Sprite(b.iKey, IMAGE_CACHE[b.iKey], 0, 0);
                    p1.setBaseAttributes(b.iKey, b.HP, b.MP, b.Atk, b.Def, b.Spd, b.MAtk, b.MDef, b.Luc, 0);
                    p1.growth = b.growth;
                    battleList.push(p1);
                }
                ITEM.quest = localStorage['Quest'];

                if (localStorage.getItem('QName') !== 'undefined') {
                    this.qName = JSON.parse(localStorage['QName']);
                    this.qAmt = JSON.parse(localStorage['QAmt']);
                    var qkey = Object.keys(this.qName);
                    for (var x = 0; x < qkey.length; x++) {
                        ITEM.quest[qkey[x]] = {
                            "name": this.qName[x],
                            "quantity": this.qAmt[x]
                        };
                    }
                }
            if (localStorage.getItem('CName') !== 'undefined'){
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
                sManager.pushState(new Explore(this.context, this.MapID));
            }
        }
    }
}