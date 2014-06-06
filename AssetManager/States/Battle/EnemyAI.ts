function EnemyAction(enemy: Game.Sprite, queue: Game.Sprite[]) {
    var total = 100;
    var parts = [];
    var foe;
    //gets all the abilites of the enemy
    var keys = Object.keys(JSON_CACHE['character']['Enemies']);
    for (var x = 0; x < keys.length; x++) {
        if (enemy.Base.ID === keys[x]) {
            foe = JSON_CACHE['character']['Enemies'][keys[x]].Abilities;
        }
    }
    //get random int to determine which ability should be used by enemy
    var rand = getRandomInt(0, 100);
    var key = Object.keys(foe);
    var cAbilities;
    for (var y = 0; y < (key.length - 1); y++) {
        if (rand >= foe[key[y]] && (foe[key[y+1]]) >= rand) {
            cAbilities = key[y];
        }
    }
    //count the number of allies
    var allyCount = 0;
    for (var x = 0; x < queue.length; x++) {
        if (queue[x].Base.Type === 0 && queue[x].currentState !== 1) {
            allyCount++;
        }
    }
    //get random int to determine which ally to target
    var random = getRandomInt(0, allyCount);


    if (cAbilities === "Attack") {
        var sprite = Attack(enemy, queue[random]);
        queue[random] = sprite.Tar;
        return queue;
    }
    else if (cAbilities === "Defend") {
        return queue;
    }
    else{
        var spellkey = Object.keys(JSON_CACHE['spell']['Spells']);
        for (var x = 0; x < spellkey.length; x++) {
            if (cAbilities === spellkey[x]) {
                return checkSpellType(JSON_CACHE['spell']['Spells'][spellkey[x]], queue, random, enemy);
                break;
            }
        }
        return queue;
    }
}
function checkSpellType(spell, queue: Game.Sprite[], target: number, caster) {   
    if (spell.All === 0) {
        var counter = 0;
        //get target to attack if target is not all
        for (var x = 0; x < queue.length; x++) {
            if (queue[x].Base.Type === 0) {
                counter++;
            }
        }
        var rand = getRandomInt(0, counter);
        queue[target] = castSpellSingle(spell, queue[rand], caster);
        return queue;
    }
    else if (spell.All === 1) {
        return castSpellAll(spell, queue, caster);
    }
}