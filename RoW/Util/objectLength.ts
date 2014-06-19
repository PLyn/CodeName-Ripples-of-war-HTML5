/*
    more accurate way to determine the length of an object when .length fails for some reason
*/
function ObjLength(obj) {
    var key, count = 0;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            count++;
        }
    }
    return count;
}