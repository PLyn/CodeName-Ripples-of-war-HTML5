/*
    use item on target to heal, cure status, boost stats or decrease stats
*/
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
    if (item.stat === 'HP' && (target.Current[item.stat] < 0) ) {
        target.Current[item.stat] = 0;
    }
    if (target.Current[item.stat] > target.Base.HP && item.stat === 'HP') {
        target.Current[item.stat] = target.Base.HP;
    }
    setStyle(context, 'calibre', 12, "white");
    context.fillText("+" + item.value, target.dx, target.dy);
    return target;
}