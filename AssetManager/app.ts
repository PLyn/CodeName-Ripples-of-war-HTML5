var manager;
var context;
var xpos = 0;

window.onload = function () {
    var canvas = <HTMLCanvasElement> document.getElementById('Can');
    context = canvas.getContext('2d');
    //group assets in a array of array
    var source = {
        Images: {
            D: 'Assets/diamond.png',
            S: 'Assets/star.png'
        },
        Atlas: {
            at: 'Assets/test.json',
            gat: 'Assets/test.json'
        },
        Tileset: {
            rpg: 'Assets/map.json'
        }
    };
    manager = new Preloader.Manager();
    manager.queueAssets(source, OnComplete);
    }
function OnComplete() {
    manager.drawTiles(context);
    context.drawImage(IMAGE_CACHE['D'], 0, 100);
    context.drawImage(IMAGE_CACHE['S'],  100, 0);
    setInterval(animate, 1000 / 15);
}
function animate() {
    //context.clearRect(25, 25, 25, 25);
    ATLAS_CACHE['at'][xpos].draw(context, 150, 150);
    xpos = (xpos + 1) % ATLAS_CACHE['at'].length;
    
}
