function StateDialogs(context: CanvasRenderingContext2D, state) {
    setStyle(context, 'Calibri', '18 pt', 'white', 'bold');
    switch (state) {
        case 0: //p select
            context.drawImage(IMAGE_CACHE['Attack'], 600, 50);
            context.drawImage(IMAGE_CACHE['Spell'], 600, 150);
            context.drawImage(IMAGE_CACHE['Defend'], 600, 250);
            break;
        case 1: //p Attack
            context.fillText("Select target to Attack", 350, 50);
            break;
        case 3: //p spell
            context.fillText("Select Spell to cast", 350, 50);
            break;
        case 4: //pdefend
            context.fillText("Select Target to cast spell", 350, 50);
            break;
        case 6: //pre ally turn
            break;
        case 7: //pre enemy turn
            break;
    }
}
