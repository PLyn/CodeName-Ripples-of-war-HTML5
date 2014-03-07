///<reference path='State.ts' />
module Game {
    export class Cutscene extends State {
        dia;
        constructor() {
            super();
            //create new canvas to put dialogue on
            this.dia = new Dialogue(ctx, w);
            this.dia.startScene('chapter', 'scene', 0);
        }
        update() {

        }
        render() {

        }
        input() {

        }
    }
}