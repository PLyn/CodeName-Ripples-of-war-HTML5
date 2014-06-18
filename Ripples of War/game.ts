var pos = 0;
var audioElement = new Audio();
var WORLD = 0;
var sManager;
var GAME_VERSION = "0.3";
var PARTY_SIZE = 2;
var GAME_WIDTH = 600;
var GAME_HEIGHT = 600;

module Game {
    export class Init {
        preloader;
        world;
        dialog;
        
        constructor() {
            var source = {
                Images: {
                    D: 'Assets/Image/diamond.png',
                    S: 'Assets/Image/star.png',
                    menu: 'Assets/Image/menuButton.png',
                    back: 'Assets/Image/menuBack.png',
                    LArrow: 'Assets/Image/arrowLeft.png',
                    RArrow: 'Assets/Image/arrowRight.png',
                    dialog: 'Assets/Image/dialogWindow.png',
                    hero: 'Assets/Image/hero.png',
                    status: 'Assets/Image/status.png',
                    Attack: 'Assets/Image/attack_button.png',
                    Defend: 'Assets/Image/defend_button.png',
                    Spell: 'Assets/Image/spell.png',
                    bg: 'Assets/Image/bg.png',
                    tick: 'Assets/Image/tick.png',
                    box: 'Assets/Image/box.png',
                    ripple: 'Assets/Image/ripple.jpg',
                    items: 'Assets/Image/items.png'
                },
                Anim: {
                    at: 'Assets/Atlas/test.json'
                },
                Sprite: {
                    spr: 'Assets/Atlas/test.json'
                },
                Tileset: {
                    map1: 'Assets/Tilemap/map1.json',
                    map2: 'Assets/Tilemap/map2.json',
                    map3: 'Assets/Tilemap/map3.json',
                    Timor_Grasslands: 'Assets/Tilemap/Timor_Grasslands.json'
                },
                XML: {
                    chapter: 'Assets/XML/Scenes.xml'
                },
                JSON: {
                    equip: 'Assets/XML/Equipment.json',
                    formation: 'Assets/XML/Formation.json',
                    items: 'Assets/XML/item.json',
                    spell: 'Assets/XML/Spells.json',
                    character: 'Assets/XML/characters.json',
                    Enemies: 'Assets/XML/EnemyGroups.json',
                    location: 'Assets/XML/locationMap.json'
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
        onComplete = () => {
            this.world = new Game.Loop();
            setInterval(this.GameLoop, 1000 / 30);
        }
        GameLoop = () => { 
            this.world.update();
        }
    }
}

function startGame() {
    var world = new Game.Loop();
    setInterval(function () {
        world.update();
    }, 1000 / 30);
}