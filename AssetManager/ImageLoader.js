var number = 0;
var isLoaded = 0;
var error = 0;
var preload;
(function (preload) {
    var ImageLoader = (function () {
        function ImageLoader() {
            this.downloadQueue = [];
        }
        ImageLoader.prototype.Start = function (files) {
            for (var file in files) {
                number++;
            }

            for (var file in files) {
                Imagecache[file] = new Image();
                Imagecache[file].onload = isLoaded++;
                Imagecache[file].onerror = error++;
                Imagecache[file].src = files[file];
            }
        };

        ImageLoader.prototype.IsComplete = function () {
            return isLoaded >= this.downloadQueue.length;
        };
        ImageLoader.prototype.Progress = function () {
            return ((isLoaded + error) / this.downloadQueue.length) * 100;
        };
        return ImageLoader;
    })();
    preload.ImageLoader = ImageLoader;
})(preload || (preload = {}));
//# sourceMappingURL=ImageLoader.js.map
