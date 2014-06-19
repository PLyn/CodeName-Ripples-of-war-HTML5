/*
    saves bounds of menu commands to be used for hit detection
*/
function initializeMenuBounds() {
    var menu = [];
    menu.push({
        "Name": "Attack",
        "x": 600,
        "y": 50,
        "w": 190,
        "h": 50
    });
    menu.push({
        "Name": "Spell",
        "x": 600,
        "y": 150,
        "w": 190,
        "h": 50
    });
    menu.push({
        "Name": "Defend",
        "x": 600,
        "y": 250,
        "w": 190,
        "h": 50
    });
    menu.push({
        "Name": "Item",
        "x": 600,
        "y": 350,
        "w": 190,
        "h": 50
    });

    return menu;
}