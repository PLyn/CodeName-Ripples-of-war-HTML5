///<reference path='State.ts' />
module Game {
    export class StatusMenu extends State {
        mx;
        my;
        menuItems;
        context: CanvasRenderingContext2D;
        //used as the base class to be extended for each state
        //might need some initialization code to remove some clutter
        //from each state to make stuff look better
        constructor(ctx) {
            super();
            this.context = ctx;
            this.context.clearRect(0,0, 800, 600);
            this.context.fillStyle = "rgba(0, 0, 0, 0.6)";
            this.context.fillRect(0, 0, 650, 600);
            

            this.menuItems = [];
            this.menuItems.push({
                "name": "back",
                "x": 40,
                "y": 490,
                "w": 75,
                "h": 75 
            });
            this.menuItems.push({
                "name": "inventory",
                "x": 400,
                "y": 100,
                "w": 150,
                "h": 45
            });
            this.menuItems.push({
                "name": "equip",
                "x": 400,
                "y": 160,
                "w": 150,
                "h": 45 
            });
            this.menuItems.push({
                "name": "formation",
                "x": 400,
                "y": 220,
                "w": 150,
                "h": 40 
            });

            this.menuItems.push({
                "name": "status",
                "x": 400,
                "y": 270,
                "w": 150,
                "h": 45 
            });
            this.menuItems.push({
                "name": "setting",
                "x": 400,
                "y": 330,
                "w": 150,
                "h": 45 
            });
            this.menuItems.push({
                "name": "save",
                "x": 400,
                "y": 380,
                "w": 150,
                "h": 45 
            });
        }
        init() {
            this.context.drawImage(IMAGE_CACHE['status'], 400, 100);
            this.context.drawImage(IMAGE_CACHE['back'], 40, 490);

            this.context.fillStyle = "blue";
            this.context.fillRect(10, 100, 380, 100);
            this.context.fillRect(10, 225, 380, 100);
            this.context.fillRect(10, 350, 380, 100);

            this.context.strokeStyle = "#FF0000";
            this.context.strokeRect(9, 99, 382, 102);
            this.context.strokeRect(9, 224, 382, 102);
            this.context.strokeRect(9, 349, 382, 102);

            setStyle(this.context, 'calibre', 14, "white", "bold");
            for (var x = 0; x < PARTY_SIZE; x++) {
                if (battleList[x].Base.Type === 0) {
                    this.context.drawImage(battleList[x].img, 25, 15 + (125 * (x + 1)));
                    this.context.fillText("Level: 1", 75, 15 + (125 * (x + 1)));
                    this.context.fillText("HP: " + battleList[x].getTotalStats().HP, 75, 35 + (125 * (x + 1)));
                    this.context.fillText("MP: " + battleList[x].getTotalStats().MP, 150, 35 + (125 * (x + 1)));
                }
            }
        }
        update() {
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var x = 0; x < this.menuItems.length; x++) {
                    var x1 = this.menuItems[x].x;
                    var x2 = this.menuItems[x].x + this.menuItems[x].w;
                    var y1 = this.menuItems[x].y;
                    var y2 = this.menuItems[x].y + this.menuItems[x].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        switch (this.menuItems[x].name) {
                            case "back":
                                this.context.clearRect(0, 0, 800, 600);
                                sManager.popState();
                                break;
                            case "inventory":
                                sManager.pushState(new Inventory(this.context));
                                break;
                            case "equip":
                                sManager.pushState(new Equip(this.context));
                                break;
                            case "formation":
                                sManager.pushState(new Formation(this.context));
                                break;
                            case "status":
                                sManager.pushState(new Status(this.context));
                                break;
                            case "setting":
                                sManager.pushState(new Setting(this.context));
                                break;
                            case "save":
                                sManager.pushState(new Save(this.context));
                                break;
                            default:
                                break;
                        }
                    }
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