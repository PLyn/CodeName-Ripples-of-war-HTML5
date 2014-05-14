var control;
var tiles;
module Game {
    export class Loop {
        canvas;
        context;
        canvas2;
        context2;
        asset;
        currentArea;
        width;
        battle; 

        //remove alot of initialization code from here as it will go in the states
        //need to put the code in here to deal with the states as needed thoughs
        constructor() {
            /*this.canvas = document.createElement('canvas');
            this.canvas.id = canvasid;
            this.canvas.width = width;
            this.canvas.height = height;
            this.canvas.tabindex = '1';
            document.body.appendChild(this.canvas);*/
            this.canvas = <HTMLCanvasElement> document.getElementById('layer1');
            this.context = this.canvas.getContext('2d');
            this.canvas2 = <HTMLCanvasElement> document.getElementById('layer2');
            this.context2 = this.canvas.getContext('2d');
            //control = new Game.input();
            tiles = new Game.Tilemap();
            tiles.Init();
            this.width = 800;
            this.currentArea = new Game.Area1(this.context, this.width, this);

            var p1 = new Sprite(IMAGE_CACHE['D'], 400, 250, 35, 35);
            var p2 = new Sprite(IMAGE_CACHE['D'], 400, 325, 35, 35);
            p1.setBaseAttributes('hero', 10, 0, 4, 1, 1, 1, 1, 0);
            p2.setBaseAttributes('ally', 5, 2, 1, 1, 1, 1, 1, 0);

            //var sword = new Weapon('hero', 'hero sword', 'Weapon', 10, 0, 4, 1, 1, 1, 1);
            //p1.equipItem(sword, sword.Type);
            battleList[0] = p1;
            battleList[1] = p2;
            FORMATION = new BattleFormation();
        }
        update() {
            this.currentArea.update();
        }
        render = () => {
            //this.currentArea.render(this.context);
        }
        playerInput() {

        }
    }
}