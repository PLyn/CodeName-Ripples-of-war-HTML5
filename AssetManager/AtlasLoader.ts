/*var srcArray;

module preload {
    export class AtlasLoader {
        //srcArray: any;
        atlasImage: HTMLImageElement = new Image();

        key: string;
        sprite: HTMLImageElement;
        x: number;
        y: number;
        width: number;
        height: number;
        scale: number;

        isFound: boolean;
        draw: Function;

        Start(JSONArray) {
            //store JSONarray in variable
            srcArray = JSONArray;
            this.atlasImage.src = 'Assets/' + JSONArray.meta.image;
        }
        Sprite(sourceAtlas, originX, originY, originW, originH) {
            this.sprite = sourceAtlas;
            this.x = originX;
            this.y = originY;
            this.width = originW;
            this.height = originH;
            this.scale = 1.0;

            this.draw = function (canvas, x, y) {
                canvas.drawImage(this.sprite, this.x, this.y, this.width, this.height, x, y, this.width * this.scale, this.height * this.scale);
            }
        }
        NewSprite(spriteName) {
            this.isFound = false;
            for (var i = 0; i < srcArray.frames.length; i++) {
                //search for array element to matches the filename of the frame
                if (srcArray.frames[i].filename == spriteName) {
                    var spriteWanted = srcArray.frames[i];
                    this.isFound = true;
                    //return new sprite function with all the dimensions and data of the frame
                    return new this.Sprite(this.atlasImage, spriteWanted.frame.x, spriteWanted.frame.y, spriteWanted.frame.w, spriteWanted.frame.h);
                    break;
                }
            }
            if (!this.isFound) {
                alert("Error: Sprite \"" + spriteName + "\" not found");
                }
        }
        loadJSON(url, call) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', url, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == 200) {
                    call(xobj.responseText);
                }
            };
            xobj.send(null);
        }
        IsComplete() {
            return this.isFound;
        }
    }
} */