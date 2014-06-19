
module Game {
    export class Animation {
        context;
        animHolder;
        finishPlaying = false;
        counter = 0;
        delay = 0;
        timer;
        constructor(context) {
            //stores the context to draw the 
            this.context = context; 
            this.finishPlaying = false;
        }
        /*
            queues up animation to be played and resetting variables used to check if animation ended
        */
        queueAnimation(anim) {
            //a holder to store the animation frames
            this.animHolder = anim;
            this.finishPlaying = false;
            this.delay = Date.now() + 200;
            this.counter = 0;
        }
        /*
            use RequestAnimationFrame to play the animation that is queued up and uses variables to determine if it is complete
            and cancels the RAF
        */
        play = () => {
            this.timer = requestAnimationFrame(this.play);
            //clears layer of screen
            this.context.clearRect(0, 0, 800, 600);
            //render the frame to the screen
            this.animHolder[this.counter].render(this.context);
            //increments counter
            this.counter++;
            if (this.counter === (this.animHolder.length)) {
                //cancels the RAF so that the game can continue
                cancelAnimationFrame(this.timer);
                this.context.clearRect(0, 0, 800, 600);
                //sets bool to true to stop the animation playing
                this.finishPlaying = true;
            }
        }
    }
}