var enableScene = false;
module Game {
    export class GenericArea {
        x;
        y;
        velocity;
        mx;
        my;
        cut;
        explore;
        startScene;
        //make this as the name suggests, a more generic class for other classes to build on
        //to create "scenes" physcially such as the palce, music etc for the dialogue scenes and exploration aspects
        //most of the specific code will be removed and put somewhere else like in the states
        constructor(ctx, w) {
            this.x = 0;
            this.y = 0;
            this.mx = 0;
            this.my = 0;
            this.velocity = 2.0;
            GAME_OBJECTS.push(SPRITE_CACHE[0]);
            this.cut = new Cutscene("scene", 800, 600, ctx);
            this.explore = new Explore(ctx, w);
            this.startScene = true;
        }
        update = () => {
            var state = sManager.getInGameState();
            switch (state) {
                case 0:
                    this.explore.update();
                    break;
                case 1:
                    if (this.startScene) {
                        this.cut.start();
                        this.startScene = false;
                    }
                    this.cut.update();
                    break;
                default:
                    break;
            }
                    
        }
        render(context) {


            /*ANIM_CACHE['at'][pos].render(context, 200, 150);
            pos = (pos + 1) % ANIM_CACHE['at'].length;*/
        }

    }
}