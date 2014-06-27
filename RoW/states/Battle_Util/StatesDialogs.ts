/*
    draws dialogs and graphics based on the state of the battle
*/
function StateDialogs(context: CanvasRenderingContext2D, state) {
    setStyle(context, 'Calibri', '18 pt', 'white', 'bold');
    switch (state) {
        case 1: //p select
            quickWindow(context, 600, 50, 100, 30, "blue", "red");
            quickWindow(context, 600, 100, 100, 30, "blue", "red");
            quickWindow(context, 600, 150, 100, 30, "blue", "red");
            quickWindow(context, 600, 200, 100, 30, "blue", "red");

            setStyle(context, 'calibre', 16, "white", "bold");
            context.fillText('Attack', 620, 75);
            context.fillText('Spell', 620, 125);
            context.fillText('Defend', 620, 175);
            context.fillText('items', 620, 225);
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
