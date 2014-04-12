module Game {
    export class Equipable {
        HP;
        MP;
        Atk;
        Def;
        Spd;
        MDef;
        Luc;
        constructor(hp, mp, atk, def, mdef, spd, luc) {
            this.HP = hp || 1;
            this.MP = mp || 0;
            this.Atk = atk || 0;
            this.Def = def || 0;
            this.Spd = spd || 0;
            this.MDef = mdef || 0;
            this.Luc = luc || 0;
        }
    }
}