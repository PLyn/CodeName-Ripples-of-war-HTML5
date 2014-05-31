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
            PARTY.add("Shadow", 0);
            PARTY.add("Syndra", 0);
            PARTY.add("Johnathan", 0);
            //PARTY.remove("Shadow", 0);
            //var p1 = new Sprite(IMAGE_CACHE['D'], 400, 250, 35, 35);
            //var p2 = new Sprite(IMAGE_CACHE['D'], 400, 325, 35, 35);
           // p1.setBaseAttributes('hero', 10, 0, 4, 1, 1, 1, 1, 0);
            //p2.setBaseAttributes('ally', 5, 2, 1, 1, 1, 1, 1, 0);
           // battleList[0] = p1;
            //battleList[1] = p2;

            FORMATION = new BattleFormation();
            ITEM = new ItemManager();
            SPELL = new SpellManager();
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