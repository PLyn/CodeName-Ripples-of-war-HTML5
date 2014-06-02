function Attack(Attacker:Game.Sprite, Target: Game.Sprite) {
    var dmg = Attacker.Base.Atk;
    if (Target.defend) dmg = dmg / 2;
    var def = Target.Base.Def;
    var result = dmg - def;

    if (result < 0) result = 0;

    Target.Base.HP -= result;

    return {"Atk" : Attacker, "Tar": Target };
}