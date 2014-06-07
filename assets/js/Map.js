!(function(exports){
  function Map(container){
    this.container = $(container);

    this.map();
    this.polyline();
    this.makers();
    this.searches();
  }

  Map.prototype.map = function(){
    var map = this.mapObj = new qq.maps.Map(this.container[0], {
        center: new qq.maps.LatLng(31.0259,121.4326),
        zoom:15
    }) 
  };

  Map.prototype.searches = function(){
    var input = this.searches = 
    $('<input></input>')
    .css('zIndex',10000)
    .attr('type','textbox')
    .attr('value','上海交通大学闵行校区');
    this.container.append(input);
  }

  Map.prototype.polyline = function(){
    var latlngs = [
    [31.0260,121.4174],
    [31.0345,121.4460],
    [31.0233,121.4511],
    [31.0140,121.4216],
    [31.0260,121.4174]
    ];

    var path = [];
    for(var k in latlngs){
      var latlng = latlngs[k];
      path.push(new qq.maps.LatLng(latlng[0],latlng[1]));
    };

     var polylines = this.polylines = new qq.maps.Polygon({
        path: path,
        strokeColor: '#900',
        fillColor:new qq.maps.Color(255,255,255,0.5),
        strokeWeight: 6,
        StrokeDashStyle:"dash",
        editable:false,
        map: this.mapObj
    });
  }

  Map.prototype.makers = function(){
    var ptRes = new qq.maps.LatLng(31.01865,121.43433);
    var labelRes = new qq.maps.Label({
        position: ptRes,
        map: this.mapObj,
        style:{'background':'#900','width':'300px','height':'60px','line-height':'60px','font-size':'40px','border-radius':'0px 15px 15px 30px'},
        content:'留园餐厅二楼'
    });

    var ptRoads = new qq.maps.LatLng(31.03079,121.43);
    var labelRoads = new qq.maps.Label({
        position: ptRoads,
        map: this.mapObj,
        style:{'background':'#099','width':'300px','height':'40px','line-height':'40px','font-size':'30px','border-radius':'0px 15px 15px 30px'},
        content:'S4高速剑川路出口'
    });
    // var marker = new qq.maps.Marker({
    //             position: liuyanMaker,
    //             map: this.mapObj
    //         });
    // var infoWin = new qq.maps.InfoWindow({
    //     map: this.mapObj,
    //     animation:qq.maps.MarkerAnimation.DROP,
    // });
    // infoWin.open();
    // infoWin.setContent('<div style="width:100pt;padding-top:10pt;color:#999;background:#900;font-size:30px">'+
    //     '留园餐厅二楼</div>');
    // infoWin.setPosition(liuyanMaker);
  }


exports.Map = Map;
})(window);