///<reference path='State.ts' />
module Game {
    export class Cutscene extends State {
        dia;
        canvas;
        context;
        ctl;
        xmlID;
        constructor(id, width, height, ctx, xmlID) {
            super();
            this.canvas = <HTMLCanvasElement> document.getElementById('layer2');
            this.context = this.canvas.getContext('2d');
            this.xmlID = xmlID;
            this.dia = new Dialogue(this.context, width);
            
        }
        init() {
            this.dia.startScene('chapter', 'scene', this.xmlID);
        }

        update() {
            if (mousedown()) {
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