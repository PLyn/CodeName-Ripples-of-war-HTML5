var TileMap;
module Game {
    export class Loop {
        canvas;
        context;
        canvas2;
        context2;
        width;
        //remove alot of initialization code from here as it will go in the states
        //need to put the code in here to deal with the states as needed thoughs
        constructor() {
            this.canvas = <HTMLCanvasElement> document.getElementById('layer1');
            this.context = this.canvas.getContext('2d');
            this.canvas2 = <HTMLCanvasElement> document.getElementById('layer2');
            this.context2 = this.canvas.getContext('2d');
            TileMap = new Game.Tilemap();
            TileMap.Init();
            this.width = 800;
            //sManager.pushState(new Explore(this.context, this.width, 'rpg'));
            sManager.pushState(new Title(this.context, this.width));

            PARTY = new PartyManager();
            FORMATION = new BattleFormation();
            ITEM = new ItemManager();
            SPELL = new SpellManager();
            QUEST = new QuestManager();

            PARTY.add("Shadow", 0);
            var spellkeys = Object.keys(JSON_CACHE['spell']['Spells']);
            SPELL.AddSpell(battleList[0], spellkeys[1]);
            PARTY.add("Syndra", 0);
            PARTY.add("Johnathan", 0);
        }
        update() {
            sManager.updateStack();
        }
        render = () => {
        }
        playerInput() {

        }
    }
}