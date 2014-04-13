function ObjLength(obj) {
    var key, count = 0;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            count++;
        }
    }
    return count;
}