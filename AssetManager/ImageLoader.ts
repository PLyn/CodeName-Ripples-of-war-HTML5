//numbers get corrupted in the onload function when initialized in the constructor for some weird reason so its global until
//i figure out something better
var number = 0;
var isLoaded = 0;
var error = 0;
module preload {
    export class ImageLoader {
        downloadQueue: string[] = [];

        Start(files) {
            //get the number of elements in the array
            for (var file in files) {
                number++;
            }
            //store each element in the cache for use in the program later on
            for (var file in files) {
                Imagecache[file] = new Image();
                Imagecache[file].onload =
                function () {
                    isLoaded++;
                };
                Imagecache[file].onerror =
                function () {
                    error++;
                }
            Imagecache[file].src = files[file];
            }
        }

    IsComplete() {
            return isLoaded >= this.downloadQueue.length;
    }
    Progress() {
            return ((isLoaded + error) / this.downloadQueue.length) * 100;
    }
   /* Get(key) {
            return cache[key];
        }*/
    }

}

