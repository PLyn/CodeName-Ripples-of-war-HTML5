function SpellSelectDialog(sp: Game.Sprite, context: CanvasRenderingContext2D) {
    quickWindow(context, 50, 400, 600, 200, "blue", "red");
    setStyle(context, 'calibre', 14, "white", "bold");
    context.fillText(sp.Base.ID + " Spells", 150, 415);
    var bounds = [];
    for (var x = 0; x < sp.Spells.length; x++) {
        context.fillText(sp.Spells[x], 75, 430 + (x * 20));
        bounds[x] = {
            "name": sp.Spells[x],
            "x": 75,
            "y": 430 + (x * 20),
            "w": context.measureText(sp.Spells[x]).width,
            "h": 10
        }
    }
    return bounds;
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