///<reference path='equipable.ts' />
module Game {
    export class Feet extends Equipable {
        constructor(name, desc, type, hp, mp, atk, def, spd, matk, mdef, luc) {
            super(name, desc, type, hp, mp, atk, def, spd, matk, mdef, luc);
        }
    }
}