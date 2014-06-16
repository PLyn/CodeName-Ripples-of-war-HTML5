function initializeItemBounds() {
    var obj = [];
    var ikeys = Object.keys(ITEM.consumable);
    var items = ITEM.consumable;
    for (var x = 0; x < ikeys.length; x++) {
        obj.push({
            "name": items[ikeys[x]].name,
            "x": 25,
            "y": 320 + (x * 30),
            "w": 50,
            "h": 10
        });
    }
    return obj;
}