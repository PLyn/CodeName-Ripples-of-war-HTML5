function SpellSelectDialog(sp: Game.Sprite, context: CanvasRenderingContext2D) {
    quickWindow(context, 50, 400, 600, 200, "blue", "red");
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
function getSpellTouched(bounds) {
    var index = 0;
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
                    index = x;
                    break;
                }
            }
        }
    }
    return {"spell" : JSON_CACHE['spell']['Spells'][spells[index]], "SpellName" : spells[index] };
}
function selectSpellTargets(spell, queue: Game.Sprite[]) {
    var bounds = [];
    if (spell.All === 0) {
        //select target
        var mx = mEvent.pageX;
        var my = mEvent.pageY;
        for (var i = 0; i < queue.length; i++) {
                var a1 = queue[i].dx;
                var a2 = queue[i].dx + queue[i].W;
                var b1 = queue[i].dy;
                var b2 = queue[i].dy + queue[i].H;
                if ((a1 <= mx && mx <= a2) && (b1 <= my && my <= b2)) {
                    var sprite = castSpellSingle(spell, queue[i]);
                    queue[i] = sprite;
                }
        }
        return queue;
    }
    else if (spell.All === 1) {
        //go ahead and cast
        return castSpellAll(spell, queue);
    }
    
}
function castSpellSingle(spell, sp: Game.Sprite) {
    var dmg = spell.Damage;
    var def = sp.Base.MDef;

    var result = dmg - def;
    switch (spell.Type) {
        case "Enemy":
            sp.Base.HP -= result;
            break;
        case "Ally":
            sp.Base.HP += dmg;
            break;
        default:
            break;
    }
    return sp;
}
function castSpellAll(spell, queue: Game.Sprite[]) {
    for (var x = 0; x < queue.length; x++) {
        if (queue[x].Base.Type === 0 && spell.Type === "Ally") {
                queue[x].Base.HP += spell.Damage;
        }
        else if (queue[x].Base.Type === 1 && spell.Type === "Enemy") {
            queue[x].Base.HP -= (spell.Damage - queue[x].Base.MDef);
        }
    }
    return queue;
}