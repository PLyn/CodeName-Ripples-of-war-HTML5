/*
    used to style the text on a particular context given with color, font, size etc
*/
function setStyle(ctx, font, size, color, bold?, italic?, align?) {
    var bolded = bold || '';
    var ital = italic || '';
    ctx.font = bolded + ' ' + ital + ' ' + size + ' ' + font;
    ctx.fillStyle = color;
    ctx.textAlign = align;
}