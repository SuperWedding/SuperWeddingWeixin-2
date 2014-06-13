

    var mapText = '上海闵行东川路800号（看地图）'
!(function(exports) {
    function Map(container) {
        this.container = $(container);

        this.maps();
        this.locations();
        this.polygons();
        this.markers();
        this.clicks();
    }

    Map.prototype.maps = function() {
        var mapDiv = this.mapDiv = $('<div></div>')
            .css('background', 'rgba(150,150,150,1)')
            .attr('id','mapDiv')
            .css('width', '100%')
            .css('height', '100%')
            .css('zIndex', 2);
        this.container.append(mapDiv);
        var map = this.map = new BMap.Map('mapDiv');
        map.centerAndZoom(new BMap.Point(121.440308,31.034003), 16);
        map.enableScrollWheelZoom(); 
    };

    Map.prototype.locations = function() {
        //获得当前位置
        var self = this;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r) {
            if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                self.curPos = r.point;
            }  
        }, {
            enableHighAccuracy: true
        })
        setTimeout(this.locations.bind(this),2000);
    }


    Map.prototype.polygons = function() {
        var path = [
            new BMap.Point(121.429363,31.033771),
            new BMap.Point(121.452288,31.041429),
            new BMap.Point(121.457372,31.029996),
            new BMap.Point(121.43425,31.0226),
            new BMap.Point(121.429363,31.033771)
        ];

        var polygon = this.polygon = new BMap.Polygon(path,{
            strokeColor: '#900',
            strokeOpacity:0.9,
            fillColor: 'rgb(255,255,255)',
            fillOpacity:0.2,
            strokeWeight: 5,
            strokeStyle: "dashed",
            map: this.map
        });
        this.map.addOverlay(polygon);
    }

    Map.prototype.markers = function() {
        var map = this.map;

        var ptRes = this.ptRes = new BMap.Point(121.438909,31.024623);
        var nameRes = '婚宴：上海交大留园餐厅2楼';
        var floatTagRes = new BaiduMaker(ptRes, nameRes, map, 0);
        this.map.addOverlay(floatTagRes);

        var ptHighway = this.ptHighway = new BMap.Point(121.436255,31.037202);
        var nameHighway = '沪金高速剑川路口';
        var floatTagHighWay = new BaiduMaker(ptHighway, nameHighway, map, 1);
        this.map.addOverlay(floatTagHighWay);

        var ptRailway = this.ptRailway = new BMap.Point(121.426392,31.02453);
        var nameRailway = '5号轻轨剑川路站';
        var floatTagRailway = new BaiduMaker(ptRailway, nameRailway, map, 1);
        this.map.addOverlay(floatTagRailway);
    };

    Map.prototype.clicks = function() {
        var self = this;
        var inputH = this.container.height() * 0.1;
        var areaBotton = this.areaBotton =
            $('<div></div>')
            .css('position', 'absolute')
            .css('zIndex', 100)
            .css("top", '0%')
            .css("left", '0%')
            .css('height', inputH + 'px')
            .css('lineHeight', inputH + 'px')
            .css('width', '25%')
            .css('background', '#f55')
            .css('fontSize', '40pt')
            .css('float', 'left')
            .text('酒宴地点');
        this.container.append(areaBotton);
        areaBotton.click(function() {
            self.map.centerAndZoom(self.ptRes, 16)
        });

        var driveBotton = this.driveBotton =
            $('<div></div>')
            .css('position', 'absolute')
            .css('zIndex', 100)
            .css("top", '0%')
            .css("left", '25%')
            .css('height', inputH + 'px')
            .css('lineHeight', inputH + 'px')
            .css('width', '25%')
            .css('background', '#099')
            .css('fontSize', '40pt')
            .css('float', 'left')
            .text('自驾导航');
        this.container.append(driveBotton);
        driveBotton.click(function() {
            if (self.curPos) {
                var p1 = self.curPos; //curPos;
                var p2 = self.ptRes;
                var driving = new BMap.DrivingRoute(self.map, {
                    renderOptions: {
                        map: self.map,
                        autoViewport: true
                    }
                });
                driving.search(p1, p2);
            }
        });

        var busBotton = this.busBotton =
            $('<div></div>')
            .css('position', 'absolute')
            .css('zIndex', 100)
            .css("top", '0%')
            .css("left", '50%')
            .css('height', inputH + 'px')
            .css('lineHeight', inputH + 'px')
            .css('width', '25%')
            .css('background', '#909')
            .css('fontSize', '40pt')
            .css('float', 'left')
            .text('公交导航');
        this.container.append(busBotton);
        busBotton.click(function() {
            if (self.curPos) {
                var p1 = self.curPos; //curPos;
                var p2 = self.ptRes;
                var transit = new BMap.TransitRoute(self.map, {
                    renderOptions: {
                        map: self.map,
                        autoViewport: true
                    }
                });
                transit.search(p1, p2);
            }
        });

    }

    exports.Map = Map;
})(window);