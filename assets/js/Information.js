
    var timeText = '公元2014年6月21日中午11点整'
    var mainText = '诚邀您见证周宁奕、余晓瑞婚礼'
    var mapText = '上海闵行东川路800号（看地图）'
    var panoText = '上海交大留园餐厅2楼（看实景）'
    var telText = '周宁奕: 18357138841 (拨电话)'


    var Information = function(){
      this.mapType = true;
      this.panoTpye = true;
      this.mapBol = false;

      $('#time').text(timeText);
      $('#main').text(mainText);
      $('#map').text(mapText);
      $('#pano').text(panoText).css('background','rgba(0,150,180,0.7)');
      $('#tel').text(telText);
    
      this.click();
    };

    Information.prototype.maps = function(){
      this.map = new Map($('#map'));
    };

    Information.prototype.clearMap = function(){
      $('#map').find('.div').remove();
      $('#pano').find('.div').remove();
    }

    Information.prototype.pano = function(){

    var panorama = new BMap.Panorama('pano');
    panorama.setPosition(new BMap.Point(121.438909,31.024623));
    panorama.setPov({heading:-20,pitch : 0});
    //   var pano = new qq.maps.Panorama($('#pano')[0], {
    //     pano: '10021016120726133355000',
    //     disableMove: false,
    //     disableFullScreen: false,
    //     zoom:1,
    //     pov:{
    //         heading:355,
    //         pitch:-2
    //     }
    // });

    };

    Information.prototype.shrink = function(){
      this.clearMap();
      this.mapType = true;
      this.panoTpye = true;
      this.mapBol = false;
      this.panoBol = false;
      $('#map').removeClass('big').removeClass('fullScreen').css('zIndex',1).addClass('mapSmall').text(mapText);
      $('#map').find('.div').remove();
      $('#pano').removeClass('big').removeClass('fullScreen').css('zIndex',1).addClass('panoSmall').text(panoText).css('background','rgba(0,150,180,0.7)');
      $('#pano').find('.div').remove();
    }

    Information.prototype.click = function(){
      var self = this;

  $('#map').click(function() {
      // $('#pano').text('收起 ↑');
      if (self.mapType) {
        if (!self.mapBol) {
          $('#map').removeClass('mapSmall').addClass('fullScreen').css('zIndex', 100000).text('');
          self.maps();
          var inputH = $('#map').height() * 0.1;
          var cancelBotton = this.cancelBotton =
            $('<div></div>')
            .css('position', 'absolute')
            .css('zIndex', 100)
            .css("top", '0%')
            .css("left", '75%')
            .css('height', inputH + 'px')
            .css('lineHeight', inputH + 'px')
            .css('width', '25%')
            .css('background', 'rgba(250,0,0,1)')
            .css('fontSize', '40pt')
            .css('fontWeight', 'bold')
            .css('float', 'left')
            .css('color', '#fff')
            .text('<-退出');
        self.mapBol = true;
        self.panoTpye = false;  
          $('#map').append(cancelBotton);
          cancelBotton.click(function() {
            setTimeout(function(){
 self.shrink();
            },200)
           
          });
      }

      } else {
        self.shrink();
      }
        // self.mapBol = !self.mapBol;
      });

  $('#pano').click(function() {
    if (self.panoTpye) {
      self.mapType = false;
      $('#pano').removeClass('panoSmall').addClass('big').css('zIndex', 100000).text('');
      $('#map').text('收起 ↑');
      var inputH = $('#pano').height() * 0.1;
      var cancelBotton = this.cancelBotton =
        $('<div></div>')
        .css('position', 'absolute')
        .css('zIndex', 100)
        .css("top", '0%')
        .css("left", '80%')
        .css('height', inputH + 'px')
        .css('lineHeight', inputH + 'px')
        .css('width', '20%')
        .css('background', 'rgba(250,0,0,1)')
        .css('fontSize', '40pt')
        .css('fontWeight', 'bold')
        .css('float', 'left')
        .css('color', '#fff')
        .text('<-退出');
      $('#pano').append(cancelBotton);
      cancelBotton.click(function() {
        self.shrink();
      });

      self.pano();
    } else {
      self.shrink();
    }
  });




    }



