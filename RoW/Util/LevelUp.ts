/*
    takes a sprite, and increases their level and their stats according to growth string and adds new spells 
    if there are any to be learned
*/
function LevelUp(sprite: Game.Sprite, context) {
    var growth = [];
    var split = sprite.growth.split(" ");
    var keys = Object.keys(sprite.Base);
    var increase = 0;
    var lvl = sprite.Level + 1;
    var newSpells = [];
    var spell = Object.keys(JSON_CACHE['character']['Party'][sprite.Base.ID]['Abilities']);
    for (var y = 0; y < spell.length; y++) {
        if (lvl === JSON_CACHE['character']['Party'][spell[y]]['Abilities'][spell[y]]) {
            var spellkeys = Object.keys(JSON_CACHE['spell']['Spells']);
            SPELL.AddSpell(sprite, spellkeys[y]);
            newSpells.push(spellkeys[y]);
        }
    }
    /*
        growth is in the form of +'s and -'s in a string and each gorup of symbols is split and taken as the 
        growth of a particular stat eg "+++ + -" would be a high growth for HP, average growth for MP and weak
        growth for Atk 
    */
    for (var x = 1; x < (keys.length - 1); x++) {
        switch (split[x - 1]) {
            case "+++++":
                increase = 10;
                break;
            case "++++":
                increase = 8;
                break;
            case "+++":
                increase = 6;
                break;
            case "++":
                increase = 4;
                break;
            case "+":
                increase = 2;
                break;
            case "-":
                increase = -1;
                break;
            case "--":
                increase = -2;
                break;
            case "---":
                increase = -3;
                break;
            case "----":
                increase = -4;
                break;
            case "-----":
                increase = -5;
                break;
        }
        var growthAmount = (sprite.Level) + increase;
        //formula is the increase from the growth plus the sprites level and if its less than zero, normalize it back to zero
        if (((sprite.Level) + increase) <= 0) {
            growthAmount = 0;
        }
        sprite.Base[keys[x]] += growthAmount;
        growth[keys[x]] = growthAmount;
    }

    LevelUpDisplay(context, growth, sprite.Base, sprite, newSpells);
}
/*
    draws dialog on screen with the growth of the character and new skills learned
*/
function LevelUpDisplay(context: CanvasRenderingContext2D, growth, base, sprite : Game.Sprite, spells) {
    quickWindow(context, 200, 50, 400, 400, "blue", "red");
    var x = 200;
    var y = 50;
    //levelup text
    setStyle(context, 'calibre', 20, "yellow", "bold");
    context.fillText("Level Up!", x + 100, y + 40);
    //Name and stats
    setStyle(context, 'calibre', 20, "white", "bold");
    context.fillText(sprite.Base.ID, x + 20, y + 30);
    setStyle(context, 'calibre', 18, "white");
    context.fillText("Level: " + sprite.Level + " + " + "1 = " + (sprite.Level + 1), x + 75, y + (30 * 2));
    context.fillText("HP: " + (base.HP - growth.HP) + " + " + growth.HP + " = " + base.HP, x + 75, y + (30 * 3));
    context.fillText("MP: " + (base.MP - growth.MP) + " + " + growth.MP + " = " + base.MP, x + 75, y + (30 * 4));
    context.fillText("Attack: " + (base.Atk - growth.Atk) + " + " + growth.Atk + " = " + base.Atk, x + 75, y + (30 * 5));
    context.fillText("Defense: " + (base.Def - growth.Def) + " + " + growth.Def + " = " + base.Def, x + 75, y + (30 * 6));
    context.fillText("Speed: " + (base.Spd - growth.Spd) + " + " + growth.Spd + " = " + base.Spd, x + 75, y + (30 * 7));
    context.fillText("M. Attack: " + (base.MAtk - growth.MAtk) + " + " + growth.MAtk + " = " + base.MAtk, x + 75, y + (30 * 8));
    context.fillText("M. Defense: " + (base.MDef - growth.MDef) + " + " + growth.MDef + " = " + base.MDef, x + 75, y + (30 * 9));
    context.fillText("Luck: " + (base.Luc - growth.Luc) + " + " + growth.Luc + " = " + base.Luc, x + 75, y + (30 * 10));

    context.fillText("Spells Learned: ", x + 10, y + (30 * 11));
    var newSpellKeys = Object.keys(spells);
    for (var x = 0; x < newSpellKeys.length; x++) {
        context.fillText(spells[x], x + 50, (y + (30 * 11)) + (x * 25));
    }

}