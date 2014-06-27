var sManager;
var GAME_VERSION = "0.3";
var PARTY_SIZE = 2;
var GAME_WIDTH = 640;
var GAME_HEIGHT = 640;

var ITEM;
var PARTY;
var QUEST;
var FORMATION;
var SAVE;
var SPELL;
var TileMap;
var battleList = [];
var equips = [];
var objects = [];

module Game {
    export class Init {
        preloader;
        world;
        dialog;
        
        constructor() {
            var source = {
                Images: {
                    menu: 'Assets/Image/menuButton.png',
                    back: 'Assets/Image/menuBack.png',
                    status: 'Assets/Image/status.png',
                    bg: 'Assets/Image/bg.png',
                    tick: 'Assets/Image/tick.png',
                    box: 'Assets/Image/box.png',
                    ripple: 'Assets/Image/ripple.jpg',
                    Shadow: 'Assets/Image/Shadow_Right.png',
                    Rin: 'Assets/Image/Rin_Right.png',
                    Domingo: 'Assets/Image/Domingo_Right.png'
                },
                Anim: {
                    at: 'Assets/Atlas/test.json',
                    slash: 'Assets/Atlas/slash.json'
                },
                Sprite: {
                    spr: 'Assets/Atlas/test.json'
                },
                Tileset: {
                    Timor_Grasslands: 'Assets/Tilemap/Timor_Grasslands.json',
                    Grassland: 'Assets/Tilemap/Grassland.json',
                    Grassland2: 'Assets/Tilemap/Grassland2.json',
                    Timor: 'Assets/Tilemap/Timor.json',
                    TMap: 'Assets/Tilemap/TMap.json',
                    TMap2: 'Assets/Tilemap/TMap2.json',

                },
                XML: {
                    chapter: 'Assets/XML/Scenes.xml'
                },
                JSON: {
                    equip: 'Assets/JSON/Equipment.json',
                    formation: 'Assets/JSON/Formation.json',
                    items: 'Assets/JSON/item.json',
                    spell: 'Assets/JSON/Spells.json',
                    character: 'Assets/JSON/characters.json',
                    Enemies: 'Assets/JSON/EnemyGroups.json',
                    location: 'Assets/JSON/locationMap.json'
                },
                Sounds: {
                    car: 'Assets/Sound/car',
                    punch: 'Assets/Sound/punch',
                    wood: 'Assets/Sound/wood'
                },
                Music: {
                    theme: 'Assets/Music/theme'
                }
            };
            //StateManager that controls the current state of the game
            sManager = new Game.StateManager();
            this.preloader = new Game.Preloader();
            //loads assets and calls the callback when complete
            this.preloader.queueAssets(source, this.onComplete);  

        }
        /*
            callback when preloader is finish loading assets
        */
        onComplete = () => {
            this.world = new Game.Loop();
            setInterval(this.GameLoop, 1000 / 30);
        }
        /*
            update loop for game
        */
        GameLoop = () => { 
            this.world.update();
        }
    }
}