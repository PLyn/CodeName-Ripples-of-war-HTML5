/*
    draws dialogs for spells of the current character
*/
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
/*
    Single target spell cast on target
*/
function castSpellSingle(context: CanvasRenderingContext2D, spell, sp: Game.Sprite, caster: Game.Sprite) {
    var dmg = spell.Damage + (spell.Ratio * caster.Current.MAtk); //change spell damage from base to base + ratio
    //get targets Magic defense
    var def = sp.Current.MDef; 
    //get final result before resistance comes into play
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
                dmg = spell.Damage - Math.floor(((spell.Damage * sp.ElementResist[spell.Element]) / 100));
                result = dmg - def;
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
    var anim = ANIM_CACHE['at'];
    var animate = new Game.Animation(context);
    animate.queueAnimation(anim);
    animate.play();
    var playAnimation = setInterval(function () {
        if (animate.finishPlaying) {
            clearInterval(playAnimation);
        }
    }, 1000 / 1);
    return sp;
}
/*
    all-targeted spell cast on targets
*/
function castSpellAll(context: CanvasRenderingContext2D, spell, queue: Game.Sprite[], caster: Game.Sprite) {
    setStyle(context, 'Calibri', '12 pt', 'white', 'bold');

    switch (spell.Type) {
        case "Enemy":
            for (var x = 0; x < queue.length; x++) {
                var dmg = spell.Damage + (spell.Ratio * caster.Current.MAtk); //change spell damage from base to base + ratio
                var def = queue[x].Base.MDef;

                var result;
                if (caster.Base.Type === 0) {
                    if (queue[x].Base.Type === 1 && queue[x].currentState !== 1) {
                        if (spell.Effect) {
                            //applies status resistance
                            var resist = queue[x].StatusResist[spell.Status.Effect];
                            var spellChance = spell.Status.chance;
                            var chance = spellChance - ((spellChance * resist) / 100);
                            queue[x] = applyStatus(spell.Status.Effect, spell.Status.Chance, queue[x]);
                        }
                            dmg = spell.Damage - ((spell.Damage * queue[x].ElementResist[spell.Element]) / 100);
                            result = dmg - def;
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
                            //applies status resistance
                            var resist = queue[x].StatusResist[spell.Status.Effect];
                            var spellChance = spell.Status.chance;
                            var chance = spellChance - ((spellChance * resist) / 100);
                            queue[x] = applyStatus(spell.Status.Effect, spell.Status.Chance, queue[x]);
                        }
                        dmg = spell.Damage - ((spell.Damage * queue[x].ElementResist[spell.Element]) / 100);
                        result = dmg - def;
                        queue[x].Current.HP -= result;
                        context.fillText(result + "", queue[x].dx, queue[x].dy - 10);
                    }
                }
                else if (caster.Base.Type === 1) {
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
            }
            break;
        default:
            break;
    }
    return queue;
}