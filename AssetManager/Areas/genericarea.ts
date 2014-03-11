var SCENE;
var EX;
var startScene;
module Game {
    export class GenericArea {
        x;
        y;
        velocity;
        mx;
        my;
        cut;
        explore;
        prevState = 0;
        ctx;
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
            /*SCENE = new Cutscene("scene", 800, 600, ctx);
            EX = new Explore(ctx, w);*/
            this.ctx = ctx;
            startScene = true;
            sManager.pushState(new Explore(ctx, w));
        }
        update = () => {
            sManager.updateStack();   
        }
        render(context) {


            /*ANIM_CACHE['at'][pos].render(context, 200, 150);
            pos = (pos + 1) % ANIM_CACHE['at'].length;*/
        }

    }
}