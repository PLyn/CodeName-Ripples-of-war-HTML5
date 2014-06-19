
module Game {
    export class Loop {
        canvas;
        context;
        constructor() {
            this.canvas = <HTMLCanvasElement> document.getElementById('layer1');
            this.context = this.canvas.getContext('2d');

            TileMap = new Game.Tilemap();
            PARTY = new PartyManager();
            FORMATION = new BattleFormation();
            ITEM = new ItemManager();
            SPELL = new SpellManager();
            QUEST = new QuestManager();
            sManager.pushState(new Title(this.context));
        }
        update() {
            sManager.updateStack();
        }
    }
}