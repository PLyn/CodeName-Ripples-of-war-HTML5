var ITEM;
var PARTY;
var QUEST;
var FORMATION;
var SAVE;
var SPELL;
var TileMap;
var battleList = [];
var equips = [];
module Game {
    export class GameObject {
        //holds the index in the IMAGE_CACHE where the image is stored
        iKey = "";
        //sx and sy are the source x and y of the image in the case of spritesheets ie where the image you want to draw is located in the spritesheet
        sx = 0;
        sy = 0;
        //dx, dy refers to the destination ie where you want the object to appear on the screen
        dx = 0;
        dy = 0;
        //W, H the size of the object when it is drawn
        W = 0;
        H = 0;
        img = new Image();
        //the scale of the image
        scale = 1;
        
        constructor(iKey, img, dx?, dy?, sx?, sy?, w?, h?, scale?) {
            this.iKey = iKey;
            this.img = img;
            this.sx = sx || 0;
            this.sy = sy || 0;
            this.dx = dx;
            this.dy = dy;
            //naturalWidth, naturalHeight gets the size of of the img if possible
            this.W = w || img.naturalWidth;
            this.H = h || img.naturalHeight;
            this.scale = scale || 1;
        }
        /*
            draws the image using image dimensions
        */
        render(context) {
            context.drawImage(this.img, this.sx, this.sy, this.W, this.H, this.dx, this.dy, this.W * this.scale, this.H * this.scale);
        }
        /*
            sets the x and y before calling the render
        */
        setPos(x, y) {
            this.dx = x;
            this.dy = y;
        }
    }
}