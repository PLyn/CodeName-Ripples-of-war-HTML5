function Attack(context: CanvasRenderingContext2D, Attacker: Game.Sprite, Target: Game.Sprite) {
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
    //add check if status is applied here, possible statuses could be 
    Target.Current.HP -= result;
    if (Target.Current.HP < 0) {
        Target.Current.HP = 0;
    } 
    context.fillText(result + "", Target.dx, Target.dy - 10);
    return {"Atk" : Attacker, "Tar": Target };
}