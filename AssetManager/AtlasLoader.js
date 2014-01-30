var srcArray;

var preload;
(function (preload) {
    var AtlasLoader = (function () {
        function AtlasLoader() {
            this.atlasImage = new Image();
        }
        AtlasLoader.prototype.Start = function (JSONArray) {
            srcArray = JSONArray;
            this.atlasImage.src = 'Assets/' + JSONArray.meta.image;
        };
        AtlasLoader.prototype.Sprite = function (sourceAtlas, originX, originY, originW, originH) {
            this.sprite = sourceAtlas;
            this.x = originX;
            this.y = originY;
            this.width = originW;
            this.height = originH;
            this.scale = 1.0;

            this.draw = function (canvas, x, y) {
                canvas.drawImage(this.sprite, this.x, this.y, this.width, this.height, x, y, this.width * this.scale, this.height * this.scale);
            };
        };
        AtlasLoader.prototype.NewSprite = function (spriteName) {
            this.isFound = false;
            for (var i = 0; i < srcArray.frames.length; i++) {
                if (srcArray.frames[i].filename == spriteName) {
                    var spriteWanted = srcArray.frames[i];
                    this.isFound = true;

                    return new this.Sprite(this.atlasImage, spriteWanted.frame.x, spriteWanted.frame.y, spriteWanted.frame.w, spriteWanted.frame.h);
                    break;
                }
            }
            if (!this.isFound) {
                alert("Error: Sprite \"" + spriteName + "\" not found");
            }
        };
        AtlasLoader.prototype.loadJSON = function (url, call) {
            var xobj = new XMLHttpRequest();
            xobj.overrideMimeType("application/json");
            xobj.open('GET', url, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == 200) {
                    call(xobj.responseText);
                }
            };
            xobj.send(null);
        };
        AtlasLoader.prototype.IsComplete = function () {
            return this.isFound;
        };
        return AtlasLoader;
    })();
    preload.AtlasLoader = AtlasLoader;
})(preload || (preload = {}));
//# sourceMappingURL=AtlasLoader.js.map
