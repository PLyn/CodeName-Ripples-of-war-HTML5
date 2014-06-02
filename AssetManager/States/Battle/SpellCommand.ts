function SpellSelectDialog(sp: Game.Sprite, context: CanvasRenderingContext2D) {
    quickWindow(50, 400, 600, 200, "blue", "red");
    setStyle(this.context, 'calibre', 14, "white", "bold");
    context.fillText(sp.Base.ID + " Spells", 150, 405);
    var bounds = [];
    for (var x = 0; x < sp.Spells.length; x++) {
        context.fillText(sp.Spells[x], 75, 420 + (x * 20));
        bounds[x] = {
            "name": sp.Spells[x],
            "x": 75,
            "y": 420 + (x * 20),
            "w": context.measureText(sp.Spells[x]).width,
            "h": 10
        }
    }
    return bounds;
}
function SpellTouched(bounds) {
    var mx = mEvent.pageX;
    var my = mEvent.pageY;
    for (var i = 0; i < bounds.length; i++) {
        var a1 = bounds[i].dx;
        var a2 = bounds[i].dx + bounds[i].w;
        var b1 = bounds[i].dy;
        var b2 = bounds[i].dy + bounds[i].h;
        if ((a1 <= mx && mx <= a2) && (b1 <= my && my <= b2)) {
            var spells = Object.keys(JSON_CACHE['spell']['Spells']);
            for (var x = 0; x < spells.length; x++) {
                if (bounds[i].name === spells[x]) {
                    getSpellTargets(JSON_CACHE['spell']['Spells'][spells[x]]);
                    break;
                }
            }
        }
    }
}
function getSpellTargets(spell) {
    
}