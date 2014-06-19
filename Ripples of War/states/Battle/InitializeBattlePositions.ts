function initializeBattlePositions(enemyID) {
    var enemies = [];
    //Allies formation initialization
    var f = FORMATION.positions;
    for (var a = 0; a < battleList.length; a++) {
        battleList[a].setPos(f[a].x, f[a].y);
    }

    //Enemies creation and initialization then added into battlelist
    //stores all the data about the enemies from both the enemygroups and enemy json files
    var eData = [];
    var eStat = [];
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
    for (var e = 0; e < ekeys.length; e++) {
        for (var x = 0; x < key.length; x++){
            if (eData[e].id === key[x]) {
                eStat[e] = {
                    "Img": foe[key[x]].Img,
                    "HP": foe[key[x]].HP,
                    "MP": foe[key[x]].MP,
                    "Atk": foe[key[x]].Atk,
                    "Def": foe[key[x]].Def,
                    "Spd": foe[key[x]].Spd,
                    "MDef": foe[key[x]].MDef,
                    "Luc": foe[key[x]].Luc,
                    "Abilities": foe[key[x]].Abilities,
                    "growth": foe[key[x]].growth
                };
            }
        }
    }
    //create sprites using all the data drawn from the enemy groups and enemy files
    var spr;
    for (var x = 0; x < ekeys.length; x++) {
        spr = new Game.Sprite(eStat[x].Img, IMAGE_CACHE[eStat[x].Img], eData[x].x, eData[x].y);
        spr.setBaseAttributes(eData[x].id, eStat[x].HP, eStat[x].MP, eStat[x].Atk, eStat[x].Def, eStat[x].Spd, eStat[x].MAtk, eStat[x].MDef, eStat[x].Luc, 1);
        spr.currentState = 0;
        spr.Current = spr.getTotalStats();
        enemies.push(spr);
    }
    return enemies;
}