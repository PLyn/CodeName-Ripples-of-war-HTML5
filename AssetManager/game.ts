var pos = 0;
var audioElement = new Audio();
var WORLD = 0;
var sManager;
var GAME_VERSION = "0.02";
//State system core will most likely be here so read the book and figure out
//how to get it working and leading to each state as needed
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
                    ripple: 'Assets/Image/ripple.jpg'
                },
                Anim: {
                    at: 'Assets/Atlas/test.json'
                },
                Sprite: {
                    spr: 'Assets/Atlas/test.json'
                },
                Tileset: {
                    rpg: 'Assets/Tilemap/newmap.json',
                    carpet: 'Assets/Tilemap/nextmap.json'
                },
                XML: {
                    chapter: 'Assets/XML/test.xml'
                },
                JSON: {
                    equip: 'Assets/XML/Equipment.json',
                    formation: 'Assets/XML/Formation.json',
                    items: 'Assets/XML/item.json',
                    spell: 'Assets/XML/Spells.json',
                    character: 'Assets/XML/characters.json',
                    Enemies: 'Assets/XML/EnemyGroups.json'
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
            this.preloader = new Game.Preloader();
            this.preloader.queueAssets(source, this.onComplete);  
            sManager = new Game.StateManager();
        }
        onComplete = () => {
            //this.dialog = new Game.Cutscene("dia", 800, 600);
            this.world = new Game.Loop();
            setInterval(this.GameLoop, 1000 / 30);
            
        }
        GameLoop = () => { 
                    this.world.update();
                    this.world.render();
            //this.world.update();
            //this.world.render();
        }
    }
}
