///<reference path='State.ts' />
module Game {
    export class Cutscene extends State {
        dia;
        canvas;
        context;
        ctl;
        constructor(id, width, height, ctx, xmlID, area) {
            super();
            this.canvas = <HTMLCanvasElement> document.getElementById('layer2');
            this.context = this.canvas.getContext('2d');

            this.dia = new Dialogue(this.context, width, area);
            
        }
        init() {
            this.dia.startScene('chapter', 'scene', 0);
        }

        update() {
            if (control.mousedown()) {
                this.dia.updateScene();
            }
        }
        render() {

        }
        pause() {

        }
        resume() {

        }
        destroy() {

        }
    }
}