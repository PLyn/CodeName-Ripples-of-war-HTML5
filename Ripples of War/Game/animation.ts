
module Game {
    export class Animation {
        context;
        animHolder;
        finishPlaying = false;
        counter = 0;
        delay = 0;
        timer;
        constructor(context) {
            this.context = context; 
            this.finishPlaying = false;
        }
        queueAnimation(anim) {
            this.animHolder = anim;
            this.finishPlaying = false;
            this.delay = Date.now() + 200;
            this.counter = 0;
        }
        play = () => {
            this.timer = requestAnimationFrame(this.play);
            this.context.clearRect(0, 0, 800, 600);
            var im = this.animHolder[this.counter];
            //this.context.drawImage(im.img, im.x, im.y, im.W, im.H, 200, 200, im.W * im.scale, im.H * im.scale);
            this.animHolder[this.counter].render(this.context);
            this.counter++;
            if (this.counter === (this.animHolder.length)) {
                cancelAnimationFrame(this.timer);
                this.context.clearRect(0, 0, 800, 600);
                this.finishPlaying = true;
            }
        }
    }
}