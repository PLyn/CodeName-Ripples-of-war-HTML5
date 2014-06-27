/*
    saves bounds of menu commands to be used for hit detection
*/
function initializeMenuBounds() {
    var menu = [];
    menu.push({
        "Name": "Attack",
        "x": 600,
        "y": 50,
        "w": 100,
        "h": 30
    });
    menu.push({
        "Name": "Spell",
        "x": 600,
        "y": 100,
        "w": 100,
        "h": 30
    });
    menu.push({
        "Name": "Defend",
        "x": 600,
        "y": 150,
        "w": 100,
        "h": 30
    });
    menu.push({
        "Name": "Item",
        "x": 600,
        "y": 200,
        "w": 100,
        "h": 30
    });

    return menu;
}