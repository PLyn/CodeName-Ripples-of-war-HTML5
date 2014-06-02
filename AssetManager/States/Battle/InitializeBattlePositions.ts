function initializeBattlePositions(enemyID) {
    //Allies formation initialization
    var f = FORMATION.positions;
    for (var a = 0; a < battleList.length; a++) {
        battleList[a].setPos(f[a].x, f[a].y);
    }

    //Enemies creation and initialization then added into battlelist
    //stores all the data about the enemies from both the enemygroups and enemy json files
    var eData = [];

    //gets enemy position and name
    var group = JSON_CACHE['Enemies']['EnemyGroups'][enemyID]['pos'];
    var ekeys = Object.keys(group);
    //put enemygroup data into eData object
    for (var i = 0; i < ekeys.length; i++) {
        eData[i] = {
            "id": group[i].id,
            "x": group[i].x,
            "y": group[i].y,
            "w": group[i].w,
            "h": group[i].h
        };
    }
    //enemies from json
    var foe = JSON_CACHE['character']['Enemies'];
    //get key of all values in enemies
    var key = Object.keys(foe);
    //find which enemy matches the enemy name form the enemyGroup
    for (var e = 0; e < key.length; e++) {
        if (eData[e].id === key[e]) {
            eData[e] = {
                "Img": foe[e].Img,
                "HP": foe[e].HP,
                "MP": foe[e].MP,
                "Atk": foe[e].Atk,
                "Def": foe[e].Def,
                "Spd": foe[e].Spd,
                "MDef": foe[e].MDef,
                "Luc": foe[e].Luc,
                "Abilities": foe[e].Abilities,
                "growth": foe[e].growth
            };
        }
    }
    //create sprites using all the data drawn from the enemy groups and enemy files
    var spr;
    for (var x = 0; x < ekeys.length; x++) {
        spr = new Game.Sprite(eData[x].Img, eData[x].x, eData[x].y, 0, 0, eData[x].w, eData[x].h, 1);
        spr.setBaseAttributes(eData[x].id, eData[x].HP, eData[x].MP, eData[x].Atk, eData[x].Def, eData[x].MDef, eData[x].Spd, eData[x].Luc, 1);
    }

    //Initialize all characters to be alive and have full HP and stats before the battle starts
    for (var x = 0; x < battleList.length; x++) {
        battleList[x].currentState = 0;
        battleList[x].Current = battleList[x].getTotalStats();
    }
}