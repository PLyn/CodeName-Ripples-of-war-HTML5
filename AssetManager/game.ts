var pos = 0;
var audioElement = new Audio();

module Game {
    export class Init {
        preloader;
        loop;

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
        }
        onComplete = () => {
            this.loop = new Game.Loop('canvas', 800, 600, this.preloader);
            setInterval(this.GameLoop, 1000 / 30);
            
        }
        GameLoop = () => { 
            this.loop.update();
            this.loop.render();
        }
    }
}
