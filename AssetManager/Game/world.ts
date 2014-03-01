var control;
var tiles;
module Game {
    export class Loop {
        canvas;
        context;
        asset;
        currentArea;

        constructor(canvasid, width, height, preloader) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = canvasid;
            this.canvas.width = width;
            this.canvas.height = height;
            this.canvas.tabindex = '1';
            document.body.appendChild(this.canvas);
            this.asset = preloader;
            this.canvas = <HTMLCanvasElement> document.getElementById(canvasid);
            this.context = this.canvas.getContext('2d');
            control = new Game.input(this.canvas);
            tiles = new Game.Tilemap();
            tiles.Init();
            this.currentArea = new Game.GenericArea();   
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