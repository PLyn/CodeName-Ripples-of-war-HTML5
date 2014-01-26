var preload;
(function (preload) {
    var Preloader = (function () {
        function Preloader() {
            this.downloadQueue = [];
            this.asset = new Image();
            this.isLoaded = 0;
            this.errorLoading = 0;
            this.errors = [];
            this.downloadQueue = [];
        }
        Preloader.prototype.Queue = function (path) {
            this.downloadQueue.push(path);
        };
        Preloader.prototype.StartDownload = function () {
            for (var QueueItem in this.downloadQueue) {
                this.currentQueueItem = QueueItem;
                this.asset.onerror = this.AssetLoadError;
                this.asset.onload = this.OnLoadComplete;
                this.asset.src = QueueItem;
            }
        };
        Preloader.prototype.OnLoadComplete = function () {
            this.isLoaded++;
        };
        Preloader.prototype.AssetLoadError = function () {
            this.errors[this.errorLoading] = this.currentQueueItem;
            this.errorLoading++;
        };
        Preloader.prototype.IsComplete = function () {
            return (this.downloadQueue.length === (this.isLoaded + this.errorLoading));
        };
        Preloader.prototype.CurrentProgress = function () {
            return ((this.isLoaded + this.errorLoading) / this.downloadQueue.length) * 100;
        };
        Preloader.prototype.GetErrors = function () {
            for (var error in this.errors) {
                console.log(error + "encountered an error while loading");
            }
        };
        return Preloader;
    })();
    preload.Preloader = Preloader;
})(preload || (preload = {}));
//# sourceMappingURL=AssetManager.js.map
