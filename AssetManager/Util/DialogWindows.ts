function quickWindow(context ,x, y, w, h, fcolor, scolor) {
    context.fillStyle = fcolor;
    context.fillRect(x, y, w, h);
    
    context.strokeStyle = scolor;
    context.strokeRect(x-1, y-1, w+2, h+2);
}
