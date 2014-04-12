///<reference path='equipable.ts' />
module Game {
    export class Helm extends Equipable{
        constructor(hp, mp, atk, def, mdef, spd, luc) {
            super(hp, mp, atk, def, mdef, spd, luc);
        }
    }
}