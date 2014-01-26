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
*   //do what you need with loaded assets now
*    }
*/
var AtlasHolder = [];
var cache = [];

var atlasLoader;

var atlasnames = ['at'];
module preload {
    export class Manager {
        Total_Assets: number;
        IsLoaded: number;

        imgLoader: preload.ImageLoader;

        json: any;
        QueueAssets(Assets, OnComplete) {
            this.IsLoaded = 0;
            if (Assets.Images) {
                this.imgLoader = new preload.ImageLoader();
                this.imgLoader.Start(Assets.Images);
            }
            if (Assets.Atlas) {
                atlasLoader = new preload.AtlasLoader();
                for (var i = 0; i < atlasnames.length; i++) {
                    atlasLoader.loadJSON(Assets.Atlas[atlasnames[i]], this.OnJSONLoad);
                }
            }
        }
        OnJSONLoad(response) {
            this.json = JSON.parse(response);
            atlasLoader.Start(this.json);
            for (var i = 0; i < namearray.length; i++) {
                AtlasHolder[i] = atlasLoader.NewSprite(namearray[i]);
            }
            OnComplete();
        }
    }
}
