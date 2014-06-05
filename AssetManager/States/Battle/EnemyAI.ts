function EnemyAction(enemy: Game.Sprite, queue: Game.Sprite[]) {
    var total = 100;
    var parts = [];
    var foe;
    var keys = Object.keys(JSON_CACHE['character']['Enemies']);
    for (var x = 0; x < keys.length; x++) {
        if (enemy.Base.ID === keys[x]) {
            foe = JSON_CACHE['character']['Enemies'][keys[x]].Abilities;
        }
    }
    var rand = getRandomInt(0, 100);
    var key = Object.keys(foe);
    var cAbilities;
    for (var y = 0; y < foe.length; y++) {
        if (rand >= foe[key[y]] && foe[key[y]] >= rand) {
            cAbilities = y;
        }
    }
    if (cAbilities === "Attack") {
        return queue;
    }
    else if (cAbilities === "Defend") {
        return queue;
    }
    else {
        var spellkey = Object.keys(JSON_CACHE['spell']['Spells']);
        for (var x = 0; x < spellkey.length; x++) {
            if (cAbilities === spellkey[x]) {
                return checkSpellType(JSON_CACHE['spell']['Spells'][spellkey[x]], queue);
                break;
            }
        }
        return queue;
    }
}
function checkSpellType(spell, queue: Game.Sprite[]) {   
    if (spell.All === 0) {
        var counter = 0;
        //get target to attack if target is not all
        for (var x = 0; x < queue.length; x++) {
            if (queue[x].Base.Type === 0) {
                counter++;
            }
        }
        var rand = getRandomInt(0, counter);
        queue[rand] = castSpellSingle(spell, queue[rand]);
        return queue;
    }
    else if (spell.All === 1) {
        return castSpellAll(spell, queue);
    }
}