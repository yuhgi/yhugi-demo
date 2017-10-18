require('jqueryPlugin');


function crop_pre(img, preview, pcnt, pimg) {
  var jcrop_api,
    boundx = "",
    boundy = "",
    $preview = preview,
    $pcnt = pcnt,
    $pimg = pimg,
    xsize = $pcnt.width(),
    ysize = $pcnt.height();
  img.Jcrop({
    onChange: showCoords, //获取选中的值
    onSelect: showCoords, //获取拖拽的值
    aspectRatio: xsize / ysize
  }, function() {
    var bounds = this.getBounds();
    boundx = bounds[0];
    boundy = bounds[1];
    jcrop_api = this;
    jcrop_api.animateTo([50,50,178,178]);
    $preview.appendTo(jcrop_api.ui.holder);
  });

  function showCoords(c) {
    var x = c.x;
    var y = c.y;
    var w = c.w;
    var h = c.h;
    $("#x1").val(parseInt(x));
    $("#y1").val(parseInt(y));
    $("#w").val(parseInt(w));
    $("#h").val(parseInt(h));
    if (parseInt(c.w) > 0) {
      var rx = xsize / c.w;
      var ry = ysize / c.h;
      $pimg.css({
        width: Math.round(rx * boundx) + 'px',
        height: Math.round(ry * boundy) + 'px',
        marginLeft: '-' + Math.round(rx * c.x) + 'px',
        marginTop: '-' + Math.round(ry * c.y) + 'px'
      });
    }
  }
}