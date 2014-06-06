function Attack(Attacker:Game.Sprite, Target: Game.Sprite) {
    var dmg = Attacker.Base.Atk;
    if (Target.defend) {
        dmg = Math.floor(dmg / 2);
        Target.defend = false;
    }
    var def = Target.Base.Def;
    var result = dmg - def;

    if (result < 0) {
        result = 0;
    }

    Target.Current.HP -= result;
    if (Target.Current.HP < 0) {
        Target.Current.HP = 0;
    }
    return {"Atk" : Attacker, "Tar": Target };
}