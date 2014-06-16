!(function(exports) {
  // 复杂的自定义覆盖物
  function BaiduMaker(point, text, map, type) {
    this._point = point;
    this._text = text;
    this._map = map;
    this._type = type;
  }

  BaiduMaker.prototype = new BMap.Overlay();
  BaiduMaker.prototype.initialize = function(map) {
    var type = this._type;
    var url,color;
    if(type ===0){
      color = "#EE5D5B";
      url = 'http://open-wedding.qiniudn.com/pngredLabel.png';
    }else if(type ===1){
      color = '#5bc2ee'
      url ='http://open-wedding.qiniudn.com/blueLabel.png';
    }
    this._map = map;
    var div = this._div = document.createElement("div");
    div.style.position = "absolute";
    div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
    div.style.backgroundColor = color;
    div.style.border = "1px solid rgba(0,0,0,0.2)";
    div.style.color = "white";
    div.style.height = "50px";
    div.style.padding = "2px";
    div.style.lineHeight = "50px";
    div.style.whiteSpace = "nowrap";
    div.style.MozUserSelect = "none";
    div.style.fontSize = "40px";
    div.style.borderRadius = "10px";
    var span = this._span = document.createElement("span");
    div.appendChild(span);
    span.appendChild(document.createTextNode(this._text));
    var that = this;

    var arrow = this._arrow = document.createElement("div");
    arrow.style.background = "url('"+url+"') no-repeat";
    arrow.style.backgroundSize = "100% 100%";
    arrow.style.position = "absolute";
    arrow.style.width = "20px";
    arrow.style.height = "20px";
    arrow.style.top = "54px";
    arrow.style.left = "50px";
    arrow.style.overflow = "hidden";
    div.appendChild(arrow);

    this._map.getPanes().labelPane.appendChild(div);

    return div;
  };

  BaiduMaker.prototype.draw = function() {
    var map = this._map;
    var pixel = map.pointToOverlayPixel(this._point);
    this._div.style.left = pixel.x - parseInt(this._arrow.style.left) + "px";
    this._div.style.top = pixel.y - 70 + "px";
  };

  exports.BaiduMaker = BaiduMaker;
})(window);