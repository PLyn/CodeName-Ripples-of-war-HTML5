﻿function LevelUp(sprite: Game.Sprite, context) {
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
        sprite.Base[keys[x]] += (sprite.Level) + increase;
        growth[keys[x]] = (sprite.Level) + increase;
    }

    LevelUpDisplay(context, growth, sprite.Base, sprite.Base.ID, newSpells);
}
function LevelUpDisplay(context: CanvasRenderingContext2D, growth, base, name, spells) {
    //box to put text on
    context.fillStyle = "blue";
    context.fillRect(250, 250, 400, 300);
    //Border around box
    context.strokeStyle = "#FF0000";
    context.strokeRect(249, 249, 402, 302);
    //levelup text
    setStyle(context, 'calibre', 16, "yellow", "bold");
    context.fillText("Level Up!", 300, 265);
    //Name and stats
    setStyle(context, 'calibre', 12, "white", "bold");
    context.fillText(name, 255, 265);
    context.fillText("HP: " + (base.HP - growth.HP) + " + " + growth.HP + " = " + base.HP , 275, 300);
    context.fillText("MP: " + (base.MP - growth.MP) + " + " + growth.MP + " = " + base.MP, 275, 320);
    context.fillText("Attack: " + (base.Atk - growth.Atk) + " + " + growth.Atk + " = " + base.Atk, 275, 340);
    context.fillText("Defense: " + (base.Def - growth.Def) + " + " + growth.Def + " = " + base.Def, 275, 360);
    context.fillText("Speed: " + (base.Spd - growth.Spd) + " + " + growth.Spd + " = " + base.Spd, 275, 380);
    context.fillText("M. Attack: " + (base.MAtk - growth.MAtk) + " + " + growth.MAtk + " = " + base.MAtk, 275, 400);
    context.fillText("M. Defense: " + (base.MDef - growth.MDef) + " + " + growth.MDef + " = " + base.MDef, 275, 420);
    context.fillText("Luck: " + (base.Luc - growth.Luc) + " + " + growth.Luc + " = " + base.Luc, 275, 440);

    context.fillText("Spells Learned: ", 255, 460);
    var newSpellKeys = Object.keys(spells);
    for (var x = 0; x < newSpellKeys.length; x++) {
        context.fillText("Luck: " + base.Luc + " + " + growth.Luc, 300, 460 + (x * 20));
    }

}