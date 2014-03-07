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
            this.canvas.tabindex = '10';
            document.body.appendChild(this.canvas);
            this.context = this.canvas.getContext('2d');
            //this.dia = new Dialogue(ctx, w);
            this.dia.startScene('chapter', 'scene', 0);
            control = new Game.input(this.canvas);
        }
        update() {
            if (control.mousedown()) {
                this.dia.updateScene();
            }
        }
        render() {

        }
        input() {

        }
    }
}