function UseItem(context: CanvasRenderingContext2D, itemName, target: Game.Sprite) {
    var itemKeys = Object.keys(JSON_CACHE['items']['consumable']);
    var allItems = JSON_CACHE['items']['consumable'];
    for (var x = 0; x < itemKeys.length; x++) {
        if (itemName === allItems[itemKeys[x]].name) {
            break;
        }
    }
    var item = allItems[itemKeys[x]];

    target.Current[item.stat] += item.value;
    
    context.fillStyle = "White";
    context.fillText("+" + item.value, target.dx, target.dy);
    return target;
}