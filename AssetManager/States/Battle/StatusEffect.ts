﻿function applyStatus(effect, chance, sprite: Game.Sprite) {
    var status = STATUS.effects;
    var ran = getRandomInt(0, 100);
    switch (effect) {
        case "Poison":
            if (ran < chance) {
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
            sprite.Current.HP = sprite.Current.HP - Math.floor(sprite.getTotalStats().HP * 0.2); 
            context.fillText(Math.floor(sprite.getTotalStats().HP * 0.2) + "", sprite.dx, sprite.dy - 10);
            break;
        default:
            break;
    }
    return sprite;
}