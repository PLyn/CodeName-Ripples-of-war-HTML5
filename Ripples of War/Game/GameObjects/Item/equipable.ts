module Game {
    export class Equipable {
        Name;
        Desc;
        Type;
        HP;
        MP;
        Atk;
        MAtk;
        Def;
        Spd;
        MDef;
        Luc;
        constructor(name, desc, type, hp, mp, atk, def, spd, matk, mdef, luc) {
            this.Name = name;
            this.Desc = desc;
            this.Type = type;
            this.HP = hp || 1;
            this.MP = mp || 0;
            this.Atk = atk || 0;
            this.Def = def || 0;
            this.Spd = spd || 0;
            this.MAtk = matk || 0;
            this.MDef = mdef || 0;
            this.Luc = luc || 0;
        }
    }
}