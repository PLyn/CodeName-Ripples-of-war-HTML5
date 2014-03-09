var pos = 0;
var audioElement = new Audio();
var STATES; 
var dialog;
//State system core will most likely be here so read the book and figure out
//how to get it working and leading to each state as needed
module Game {
    export class Init {
        preloader;
        world;
        DIALOG = 0;
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
           // STATES = new Game.StateManager();
            //STATES.addState("dialog", 0);
            this.preloader = new Game.Preloader();
            this.preloader.queueAssets(source, this.onComplete);  
            //STATES.setState("dialog"); 
            
        }
        onComplete = () => {
            dialog = new Game.Cutscene("dia", 800, 600);
            //this.world = new Game.Loop('canvas', 800, 600, this.preloader);
            setInterval(this.GameLoop, 1000 / 30);
            
        }
        GameLoop = () => { 
            //var state = STATES.getState();
            //switch (state) {
                //case this.DIALOG:
                    dialog.update();
                    dialog.render();
                   // break;
               // default:
                   // break;
           // }
            //this.world.update();
            //this.world.render();
        }
    }
}
