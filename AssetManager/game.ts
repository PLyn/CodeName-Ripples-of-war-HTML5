var pos = 0;
var audioElement = new Audio();
var WORLD = 0;
var sManager;
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
                    S: 'Assets/Image/star.png'
                },
                Anim: {
                    at: 'Assets/Atlas/test.json'
                },
                Sprite: {
                    spr: 'Assets/Atlas/test.json'
                },
                Tileset: {
                    rpg: 'Assets/Tilemap/map.json'
                },
                XML: {
                    chapter: 'Assets/XML/test.xml'
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
            this.world = new Game.Loop('canvas', 800, 600, this.preloader);
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
