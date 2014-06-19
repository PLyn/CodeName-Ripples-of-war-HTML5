/*
    determines which action an enemy should take
*/
function EnemyActionChooser(target: Game.Sprite, queue: Game.Sprite[]) {
    var total = 100;
    var parts = [];
    var foe;
    //gets all the abilites of the enemy
    var keys = Object.keys(JSON_CACHE['character']['Enemies']);
    for (var x = 0; x < keys.length; x++) {
        if (target.Base.ID === keys[x]) {
            foe = JSON_CACHE['character']['Enemies'][keys[x]].Abilities;
        }
    }
    //get random int to determine which ability should be used by enemy
    var rand = getRandomInt(0, 100);
    var key = Object.keys(foe);
    var cAbilities;
    for (var y = 0; y < (key.length - 1); y++) {
        if (rand >= foe[key[y]] && (foe[key[y + 1]]) >= rand) {
            cAbilities = key[y];
            break;
        }
    }
    return cAbilities;
}
/*
    Enemy cast spell on target/s dpending on the spell
*/
function EnemySpellCast(context, spell, queue: Game.Sprite[], target: number, caster) {   
    if (spell.All === 0) {
        var counter = 0;
        //get target to attack if target is not all
        for (var x = 0; x < queue.length; x++) {
            if (queue[x].Base.Type === 0) {
                counter++;
            }
        }
        var rand = getRandomInt(0, counter);
        queue[target] = castSpellSingle(context, spell, queue[rand], caster);
        return queue;
    }
    else if (spell.All === 1) {
        return castSpellAll(context, spell, queue, caster);
    }
}