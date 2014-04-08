﻿///<reference path='gameobject.ts' />
module Game {
    export class Sprite extends GameObject {
        HP;
        MP;
        Atk;
        Def;
        Spd;
        MDef;
        Luc;
        Type;
        //all the base attributes and methods are to be added here, this will come when
        //the battle system is being developed but for now it stays relatively empty i guess 
        constructor(img, x, y, w, h, scale?) {
            super(img, x, y, w, h, scale);
        }
        setAttributes(hp, mp, atk, def, mdef, spd, luc, type?) {
            this.HP = hp || 1;
            this.MP = mp || 0;
            this.Atk = atk || 0;
            this.Def = def || 0;
            this.Spd = spd || 0;
            this.MDef = mdef || 0;
            this.Luc = luc || 0;
            this.Type = type || 0;
        }

    }
}