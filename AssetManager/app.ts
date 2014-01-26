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
            at: 'Assets/test.json'
        }
    };
    manager = new preload.Manager();
    manager.QueueAssets(source, OnComplete);
    }
function OnComplete() {
    context.drawImage(cache['D'], 0, 0);
    context.drawImage(cache['S'], 50, 50);
    setInterval(animate, 1000 / 10);
}
function animate() {
    context.clearRect(75, 75, 100, 100);
    AtlasCache['at'][xpos].draw(context, 100, 100);
    xpos = (xpos + 1) % AtlasHolder.length;
}
