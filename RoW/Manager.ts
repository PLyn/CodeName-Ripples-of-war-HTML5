/*      HTML5 AssetManager
*   Currently supports images and Atlases(image and json from texturepacker)
*   how to use:
*   store assets in array as shown
*       var source = {
*       Images: {
*            D: 'Assets/diamond.png',
*            S: 'Assets/star.png'
*        },
*        Atlas: {
*            at: 'Assets/test.json'
*        }
*    };
*    manager = new preload.Manager();
*    manager.QueueAssets(source, OnComplete);
*
*   function OnComplete(){
*   //do what you need with loaded assets now which are in global variables seen at below(Imagecache, AtlasCache etc)
*    }
*/
var AtlasCache = [];
var Imagecache = [];

var atlasLoader;
var atlasPos = 0;
var AtlasKey = [];
module preload {
    export class Manager {
        Total_Assets: number;

        imgLoader: preload.ImageLoader;

        json: any;
        AtlasKey: string[];
        QueueAssets(Assets, OnComplete) {
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
        }
        OnJSONLoad(response) {
            var holder = [];
            this.json = JSON.parse(response);
            atlasLoader.Start(this.json);
            for (var i = 0; i < srcArray.frames.length; i++) {
                holder[i] = atlasLoader.NewSprite(srcArray.frames[i].filename);
            }
            AtlasCache[AtlasKey[atlasPos]] = holder;
            atlasPos++;
            OnComplete();
        }
    }
}
