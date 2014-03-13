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
        //remove alot of initialization code from here as it will go in the states
        //need to put the code in here to deal with the states as needed thoughs
        constructor(canvasid, width, height, preloader) {
            /*this.canvas = document.createElement('canvas');
            this.canvas.id = canvasid;
            this.canvas.width = width;
            this.canvas.height = height;
            this.canvas.tabindex = '1';
            document.body.appendChild(this.canvas);*/
            this.asset = preloader;
            this.canvas = <HTMLCanvasElement> document.getElementById('layer1');
            this.context = this.canvas.getContext('2d');
            this.canvas2 = <HTMLCanvasElement> document.getElementById('layer2');
            this.context2 = this.canvas.getContext('2d');
            control = new Game.input(this.canvas2);
            tiles = new Game.Tilemap();
            tiles.Init();
            this.currentArea = new Game.Area1(this.context , width);   
        }
        update() {
            this.currentArea.update();
        }
        render = () => {
            this.currentArea.render(this.context);
        }
        playerInput() {

        }
    }
}