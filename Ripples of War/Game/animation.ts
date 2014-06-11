
module Game {
    export class Animation {
        context;
        animHolder;
        finishPlaying = false;
        counter = 0;
        constructor(context) {
            this.context = context;
        }
        queueAnimation(anim) {
            this.animHolder = anim;
            this.finishPlaying = false;
        }
        play = () => {
            var animate = requestAnimationFrame(this.play);
            this.context.clearRect(0, 0, 800, 600);
            var im = this.animHolder[this.counter];
            //this.context.drawImage(im.img, im.x, im.y, im.W, im.H, 200, 200, im.W * im.scale, im.H * im.scale);
            this.animHolder[this.counter].render(this.context);
            this.counter++;
            if (this.counter >= ObjLength(this.animHolder)) {
                cancelAnimationFrame(animate);
                this.context.clearRect(0, 0, 800, 600);
                this.finishPlaying = true;
            }
        }
    }
}