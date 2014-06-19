function Attack(context: CanvasRenderingContext2D, Attacker: Game.Sprite, Target: Game.Sprite) {
    //damage calculation
    //attack is almost always physical damage
    //we we reduce the damage by the physical resistance
    var dmg = Attacker.Base.Atk - (Attacker.Base.Atk * Target.ElementResist.Physical);
    //if player defends then the damage is reduced by a third but only blocks one attack
    if (Target.defend) {
        dmg = Math.floor((dmg * 2) / 3);
        Target.defend = false;
    }
    //then the targets def is subtracted from the damage
    var def = Target.Base.Def;
    var result = dmg - def;

    //check if it goes below zero and make it zero 
    if (result < 0) {
        result = 0;
    }
    //apply result to the target
    Target.Current.HP -= result;
    //showing text above target with damage dealt to the target
    context.fillText(result + "", Target.dx, Target.dy - 10);
    //returns the target and attacker to the battle class
    return {"Atk" : Attacker, "Tar": Target };
}