function applyStatus(effect, chance, sprite: Game.Sprite) {
    var status = STATUS.effects;
    var ran = getRandomInt(0, 100);
    switch (effect) {
        case "Poison":
            if (ran > chance) {
                sprite.currentState = status["Poison"]; 
            }
            break;
        default:
            break;
    }
    return sprite;
}
function applyStatusEffect(context, sprite: Game.Sprite) {
    var status = STATUS.effects;
    switch (sprite.currentState) {
        case status["Poison"]:
            sprite.Current.HP = Math.floor(sprite.Current.HP * 0.1); 
            context.fillText(Math.floor(sprite.Current.HP * 0.1) + "", sprite.dx, sprite.dy - 10);
            break;
        default:
            break;
    }
    return sprite;
}