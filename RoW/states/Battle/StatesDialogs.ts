/*
    draws dialogs and graphics based on the state of the battle
*/
function StateDialogs(context: CanvasRenderingContext2D, state) {
    setStyle(context, 'Calibri', '18 pt', 'white', 'bold');
    switch (state) {
        case 1: //p select
            context.drawImage(IMAGE_CACHE['Attack'], 600, 50);
            context.drawImage(IMAGE_CACHE['Spell'], 600, 150);
            context.drawImage(IMAGE_CACHE['Defend'], 600, 250);
            context.drawImage(IMAGE_CACHE['items'], 600, 350);
            break;
        case 2: //p Attack
            context.fillText("Select target to Attack", 350, 50);
            context.drawImage(IMAGE_CACHE['back'], 700, 5);
            break;
        case 6: //p spell
            context.fillText("Select Spell to cast", 350, 50);
            context.drawImage(IMAGE_CACHE['back'], 700, 5);
            break;
        case 16: //enemy turn
            context.fillText("Enemy's Turn", 350, 150);;
            break;
        case 7:
        case 12:
        case 13:
            context.drawImage(IMAGE_CACHE['back'], 700, 5);
            break;
    }
}
