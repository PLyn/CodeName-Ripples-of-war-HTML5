///<reference path='equipable.ts' />
module Game {
    export class Body extends Equipable {
        constructor(name, desc, type, hp, mp, atk, def, spd, matk, mdef, luc) {
            super(name, desc, type, hp, mp, atk, def, spd, matk, mdef, luc);
        }
    }
}