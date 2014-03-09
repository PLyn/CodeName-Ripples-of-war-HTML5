///<reference path='State.ts' />
module Game {
    export class Cutscene extends State {
        dia;
        canvas;
        context;
        constructor(id, width, height) {
            super();
            //create new canvas to put dialogue on. 
            this.canvas = document.createElement('canvas');
            this.canvas.id = id;
            this.canvas.width = width;
            this.canvas.height = height;
            this.canvas.tabindex = '2';
            document.body.appendChild(this.canvas);
            this.canvas = <HTMLCanvasElement> document.getElementById(id);
            this.context = this.canvas.getContext('2d');

            control = new Game.input(this.canvas);
            console.log(this.canvas);
            console.log(this.canvas.width);
            this.dia = new Dialogue(this.context, this.canvas.width);
            this.dia.startScene('chapter', 'scene', 0);
        }
        update() {
            if (control.mousedown()) {
                this.dia.updateScene();
            }
        }
        render() {

        }

    }
}