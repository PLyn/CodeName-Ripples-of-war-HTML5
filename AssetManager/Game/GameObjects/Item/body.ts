///<reference path='equipable.ts' />
module Game {
    export class Body extends Equipable {
        constructor(hp, mp, atk, def, mdef, spd, luc) {
            super(hp, mp, atk, def, mdef, spd, luc);
        }
    }
}