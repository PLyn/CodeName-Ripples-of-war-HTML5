var AtlasCache = [];
var Imagecache = [];

var atlasLoader;
var atlasPos = 0;
var AtlasKey = [];
var preload;
(function (preload) {
    var Manager = (function () {
        function Manager() {
        }
        Manager.prototype.QueueAssets = function (Assets, OnComplete) {
            this.IsLoaded = 0;
            if (Assets.Images) {
                this.imgLoader = new preload.ImageLoader();
                this.imgLoader.Start(Assets.Images);
            }
            if (Assets.Atlas) {
                atlasLoader = new preload.AtlasLoader();

                AtlasKey = Object.keys(Assets.Atlas);
                for (var i = 0; i < AtlasKey.length; i++) {
                    atlasLoader.loadJSON(Assets.Atlas[AtlasKey[i]], this.OnJSONLoad);
                }
            }
        };
        Manager.prototype.OnJSONLoad = function (response) {
            var holder = [];
            this.json = JSON.parse(response);
            atlasLoader.Start(this.json);
            for (var i = 0; i < srcArray.frames.length; i++) {
                holder[i] = atlasLoader.NewSprite(srcArray.frames[i].filename);
            }
            AtlasCache[AtlasKey[atlasPos]] = holder;
            atlasPos++;
            OnComplete();
        };
        return Manager;
    })();
    preload.Manager = Manager;
})(preload || (preload = {}));
//# sourceMappingURL=Manager.js.map
