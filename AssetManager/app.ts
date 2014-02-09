var asset;
var context;
var timer;
var x = 0;
var imagex = 0;
var imagey = 0;
var en;
window.onload = function () {
    var game = new Game.Game();
}
    /*var canvas = <HTMLCanvasElement> document.getElementById('Can');
    window.addEventListener('mousedown', mousedown);
    context = canvas.getContext('2d');
    en = new Base.Engine(800, 600, 'can');
    //group assets in a array of array
    var source = {
        Images: {
            D: 'Assets/diamond.png',
            S: 'Assets/star.png'
        },
        Anim: {
            at: 'Assets/test.json'
        },
        Sprite: {
            spr: 'Assets/test.json'
        },
        Tileset: {
            rpg: 'Assets/map.json'
        },
        XML: {
            chapter: 'Assets/test.xml'
        }
    };

    asset = new Preloader.Manager();
    asset.queueAssets(source, OnComplete);
    asset.progress();
}
function mousedown(e) {
    var test = relMouseCoords(e);
    var cx = e.pageX; 
    var cy = e.pageY;
    console.log(cx);
    console.log(cy);
}
function OnComplete() {
    /*for (var x = 0; x < SPRITE_CACHE.length; x++) {
        GAME_OBJECTS[x] = SPRITE_CACHE[x];
        GAME_OBJECTS[x].render(this.context, imagex, imagey);
        imagex += 50;
    }
    asset.drawTiles(this.context);
    this.context.drawImage(IMAGE_CACHE['D'], imagex, 100);
    this.context.drawImage(IMAGE_CACHE['S'], 100, 0);*/
    /*setInterval(en.render, 1000 / 30);
}
function animate() {
    //context.clearRect(imagex - 10, 100, imagex + 25, 100);
    ANIM_CACHE['at'][x].render(context, 200, 200);
    x = (x + 1) % ANIM_CACHE['at'].length;
}
//deal with this function later to do proper coordinates for mouse position in canvas
function relMouseCoords(event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while(currentElement === currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return { x: canvasX, y: canvasY }
}*/