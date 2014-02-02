var asset;
var context;
var timer;
var x = 0;
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
            at: 'Assets/test.json'
        },
        Tileset: {
            rpg: 'Assets/map.json'
        }
    };
    asset = new Preloader.Manager();
    asset.queueAssets(source, OnComplete);
    timer = setTimeout(asset.progress, 1000 / 1);

}
function OnComplete() {
    clearTimeout(timer);
    asset.drawTiles(context);
    context.drawImage(IMAGE_CACHE['D'], 0, 100);
    context.drawImage(IMAGE_CACHE['S'],  100, 0);
    setInterval(animate, 1000 / 15);
}
function animate() {

    //context.clearRect(25, 25, 25, 25);
    ATLAS_CACHE['at'][x].draw(context, 150, 150);
    x = (x + 1) % ATLAS_CACHE['at'].length;
    
}
