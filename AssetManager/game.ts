var pos = 0;
module Game {
    export class Game {
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
                }
            };
            this.preloader = new Engine.Preloader();
            this.preloader.queueAssets(source, this.onComplete);
            this.loop = new Engine.Loop('canvas', 800, 600, this.preloader);


        }
        onComplete = () => {
            setInterval(this.GameLoop, 1000 / 10);
        }
        GameLoop = () => {
            this.loop.update();
            this.loop.render();
        }
    }
}
