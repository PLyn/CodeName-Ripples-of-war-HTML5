///<reference path='../State.ts' />
module Game {
    export class ItemDetails extends State {
        context: CanvasRenderingContext2D;
        item;
        clickBounds;
        mx;
        my;
        constructor(item, ctx) {
            super();
            this.context = ctx;
            this.item = item;
            this.clickBounds = [];
        }
        init() {
            this.context.drawImage(IMAGE_CACHE['dialog'], 35, 150);
            this.context.fillText(this.item.name, 45, 160);
            this.context.fillText("description here", 45, 200);
            this.context.fillText("Image here", 200, 200);
            this.context.drawImage(IMAGE_CACHE['back'], 40, 490);
            this.context.fillText("Use", 300, 300);

            this.clickBounds.push({
                "name": "back",
                "x": 40,
                "y": 490,
                "w": 75,
                "h": 75
            });
            this.clickBounds.push({
                "name": "use",
                "x": 150,
                "y": 395,
                "w": this.context.measureText("use").width,
                "h": 5
            });
        }
        update() {
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var x = 0; x < this.clickBounds.length; x++) {
                    var x1 = this.clickBounds[x].x;
                    var x2 = this.clickBounds[x].x + this.clickBounds[x].w;
                    var y1 = this.clickBounds[x].y;
                    var y2 = this.clickBounds[x].y + this.clickBounds[x].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        switch (this.clickBounds[x].name) {
                            case "back":
                                this.context.clearRect(0, 0, 800, 600);
                                sManager.popState();
                                break;
                            case "use":
                                this.context.clearRect(0, 0, 800, 600);
                                sManager.popState();
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        }
        selectItemTarget() {
            quickWindow(this.context, 10, 10, 300, 500, "blue", "red");
            for (var x = 0; x < battleList.length; x++) {
                if (battleList[x].Base.Type === 0) {
                    this.context.drawImage(battleList[x].img, 25, 40 + (x * 50));
                    this.context.fillText(battleList[x].Base.ID, 100, 40 + (x * 50));
                    this.context.fillText(battleList[x].Base.ID, 100, 40 + (x * 50));
                }
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