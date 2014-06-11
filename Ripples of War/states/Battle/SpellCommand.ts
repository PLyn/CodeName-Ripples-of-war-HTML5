﻿function SpellSelectDialog(sp: Game.Sprite, context: CanvasRenderingContext2D) {
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
function castSpellSingle(context: CanvasRenderingContext2D, spell, sp: Game.Sprite, caster: Game.Sprite) {
    var dmg = spell.Damage + (spell.Ratio * caster.Current.MAtk); //change spell damage from base to base + ratio
    var def = sp.Base.MDef;

    var result = dmg - def;
    switch (spell.Type) {
        case "Enemy":
            if (spell.Effect) {
                //applies status resistance
                var resist = sp.StatusResist[spell.Status.Effect];
                var spellChance = spell.Status.chance;
                var chance = spellChance - ((spellChance * resist) / 100);
                sp = applyStatus(spell.Status.Effect, spell.Status.Chance, sp);
            }
            if (spell.Element !== 'undefined') {
                dmg = spell.Damage - ((spell.Damage * sp.ElementResist[spell.Element]) / 100);
                result = dmg - def;
            }
            sp.Current.HP -= result;
            context.fillText(dmg + "", sp.dx, sp.dy - 10);
            break;
        case "Ally":
            if (spell.Effect) {
                sp = applyStatus(spell.Status.Effect, spell.Status.Chance, sp);
            }
                sp.Current.HP += dmg;
                context.fillText(dmg + "", sp.dx, sp.dy - 10);
            break;
        default:
            break;
    }
    return sp;
}
function castSpellAll(context: CanvasRenderingContext2D, spell, queue: Game.Sprite[], caster?: Game.Sprite) {
    setStyle(context, 'Calibri', '12 pt', 'white', 'bold');

    switch (spell.Type) {
        case "Enemy":
            for (var x = 0; x < queue.length; x++) {
                var dmg = spell.Damage + (spell.Ratio * caster.Current.MAtk); //change spell damage from base to base + ratio
                var def = queue[x].Base.MDef;

                var result = dmg - def;
                if (caster.Base.Type === 0) {
                    if (queue[x].Base.Type === 1 && queue[x].currentState !== 1) {
                        if (spell.Effect) {
                            //applies status resistance
                            var resist = queue[x].StatusResist[spell.Status.Effect];
                            var spellChance = spell.Status.chance;
                            var chance = spellChance - ((spellChance * resist) / 100);
                            queue[x] = applyStatus(spell.Status.Effect, spell.Status.Chance, queue[x]);
                        }
                        if (spell.Element !== 'undefined') {
                            dmg = spell.Damage - ((spell.Damage * queue[x].ElementResist[spell.Element]) / 100);
                            result = dmg - def;
                        }
                        queue[x].Current.HP -= result;
                        context.fillText(result + "", queue[x].dx, queue[x].dy - 10);
                    }
                }
                else if (caster.Base.Type === 1) {
                    if (queue[x].Base.Type === 0 && queue[x].currentState !== 1) {
                        if (spell.Effect) {
                            //applies status resistance
                            var resist = queue[x].StatusResist[spell.Status.Effect];
                            var spellChance = spell.Status.chance;
                            var chance = spellChance - ((spellChance * resist) / 100);
                            queue[x] = applyStatus(spell.Status.Effect, spell.Status.Chance, queue[x]);
                        }
                        if (spell.Element !== 'undefined') {
                            dmg = spell.Damage - ((spell.Damage * queue[x].ElementResist[spell.Element]) / 100);
                            result = dmg - def;
                        }
                        queue[x].Current.HP -= result;
                        context.fillText(result + "", queue[x].dx, queue[x].dy - 10);
                    }
                }
            }
            break;
        case "Ally":
            for (var x = 0; x < queue.length; x++) {
                if (caster.Base.Type === 0) {
                    if (queue[x].Base.Type === 0 && queue[x].currentState !== 1) {
                        if (spell.Effect) {
                            queue[x] = applyStatus(spell.Status.Effect, spell.Status.Chance, queue[x]);
                        }
                        queue[x].Current.HP += spell.Damage;
                        context.fillText(spell.Damage + "", queue[x].dx, queue[x].dy - 10);
                    }
                }
                else if (caster.Base.Type === 1) {
                    if (queue[x].Base.Type === 1 && queue[x].currentState !== 1) {
                        if (spell.Effect) {
                            queue[x] = applyStatus(spell.Status.Effect, spell.Status.Chance, queue[x]);
                        }
                        queue[x].Current.HP += spell.Damage;
                        context.fillText(spell.Damage + "", queue[x].dx, queue[x].dy - 10);
                    }
                }
            }
            break;
        default:
            break;
    }
    return queue;
}