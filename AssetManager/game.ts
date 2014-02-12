var pos = 0;
var audioElement = new Audio();

module Game {
    export class Init {
        preloader;
        loop;

        constructor() {
            var source = {
                Images: {
                    D: 'Assets/diamond.png',
                    S: 'Assets/star.png'
                },
                Anim: {
                    at: 'Assets/test.json'
                },
                Sprite: {
                    spr: 'Assets/test.json'
                },
                Tileset: {
                    rpg: 'Assets/map.json'
                },
                XML: {
                    chapter: 'Assets/test.xml'
                },
                Sounds: {
                    car: 'Assets/Sounds/car',
                    punch: 'Assets/Sounds/punch',
                    wood: 'Assets/Sounds/wood'
                },
                Music: {
                    theme: 'Assets/Music/theme'
                }
            };
            this.preloader = new Game.Preloader();
            this.preloader.queueAssets(source, this.onComplete);
            
            
        }

        onComplete = () => {
            MUSIC_CACHE['theme'].play();
            var song = Object.keys(SOUND_CACHE);
            var x = 0;
            setInterval(function () {
                SOUND_CACHE[song[x]].play();
                x = (x + 1) % song.length;
            }, 1);
            this.loop = new Game.Loop('canvas', 800, 600, this.preloader);
            setInterval(this.GameLoop, 1000 / 10);
            
        }
        GameLoop = () => {           
            this.loop.update();
            this.loop.render();
        }
    }
}
