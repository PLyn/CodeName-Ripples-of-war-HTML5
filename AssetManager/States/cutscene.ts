///<reference path='State.ts' />
module Game {
    export class Cutscene extends State {
        dia;
        canvas;
        context;
        ctl;
        constructor(id, width, height, ctx) {
            super();
            //create new canvas to put dialogue on. 
           /* this.canvas = document.createElement('canvas');
            this.canvas.id = id;
            this.canvas.width = width;
            this.canvas.height = height;
            this.canvas.
            this.canvas.tabindex = '2';
            document.body.appendChild(this.canvas);*/
            //this.canvas = <HTMLCanvasElement> document.getElementById(id);
            //this.context = this.canvas.getContext('2d');

            this.dia = new Dialogue(ctx, width);
            
        }
        start() {
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