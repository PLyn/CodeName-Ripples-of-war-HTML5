module Game {
    export class SpellManager{
        SpellKeys;
        constructor() {
            this.SpellKeys = Object.keys(JSON_CACHE['spell'].Spells);
        }
        /*
            Grants the character the spell by adding it to the spell list of the Sprite
        */    
        AddSpell(character, SpellName) {
            character.Spells.push(SpellName);
        }
        /*
            searches for spellname that matches provided spellName and remove it from the spell list of the sprite
        */
        RemoveSpell(character, SpellName) {
            var keys = Object.keys(character.Spells);
            for (var i = 0; i < keys.length; i++) {
                if (SpellName === keys[i]) {
                    character.Spells.splice(i, 1);
                    break;
                }
            }
        }
    }
}