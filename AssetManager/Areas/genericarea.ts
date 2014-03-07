module Game {
    export class GenericArea {
        x;
        y;
        velocity;
        mx;
        my;
        dia;
        //make this as the name suggests, a more generic class for other classes to build on
        //to create "scenes" physcially such as the palce, music etc for the dialogue scenes and exploration aspects
        //most of the specific code will be removed and put somewhere else like in the states
        constructor(ctx, w) {
            this.x = 0;
            this.y = 0;
            this.mx = 0;
            this.my = 0;
            this.velocity = 2.0;
            GAME_OBJECTS.push(SPRITE_CACHE[0]);
            this.dia = new Dialogue(ctx, w);

            ctx.clearRect(0, 0, 800, 600);
            tiles.drawTiles(ctx, 'rpg');
            tiles.getObjects(ctx, 'rpg');
            GAME_OBJECTS[0].render(ctx, this.x, this.y);
            this.dia.startScene('chapter', 'scene', 0);
        }
        update() {
            if (control.keydown('W')) {
                this.y -= this.velocity;
            }
            else if (control.keydown('D')) {
                this.x += this.velocity;
            }
            else if (control.keydown('A')) {
                this.x -= this.velocity;
            }
            else if (control.keydown('S')) {
                this.y += this.velocity;
            }
            
            if (control.mousedown()) {
                this.mx = control.mEvent.pageX;
                this.my = control.mEvent.pageY;
                this.objectClick(this.mx, this.my, objects);
                this.dia.updateScene();
            }
            
            //imagex += 50;
            /*if (pos === 0) {
                imagex = 0;
            }*/
        }
        render(context) {


            /*ANIM_CACHE['at'][pos].render(context, 200, 150);
            pos = (pos + 1) % ANIM_CACHE['at'].length;*/
        }
        objectClick = (x, y, obj) => {
            for (var i = 0; i < obj.length; i++) {
                var x1 = obj[i].x;
                var x2 = obj[i].x + obj[i].width;
                var y1 = obj[i].y;
                var y2 = obj[i].y + obj[i].width;
                if ((x1 <= x && x <= x2) && (y1 <= y && y <= y2)) {
                    console.log(obj[i].x);
                }
            }
        }
    }
}