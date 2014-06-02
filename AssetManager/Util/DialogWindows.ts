function quickWindow(x, y, w, h, fcolor, scolor) {
    this.context.fillStyle = fcolor;
    this.context.fillRect(x, y, w, h);
    
    this.context.strokeStyle = scolor;
    this.context.strokeRect(x-1, y-1, w+2, h+2);
}
