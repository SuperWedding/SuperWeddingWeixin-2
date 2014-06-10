


    var timeText = '公元2013年6月21日中午11点整'
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
      var pano = new qq.maps.Panorama($('#pano')[0], {
        pano: '10021016120726133355000',
        disableMove: false,
        disableFullScreen: false,
        zoom:1,
        pov:{
            heading:355,
            pitch:-2
        }
    });
    };

    Information.prototype.shrink = function(){
      this.clearMap();
      this.mapType = true;
      this.panoTpye = true;
      this.mapBol = false;
      $('#map').removeClass('big').removeClass('fullScreen').css('zIndex',1).addClass('mapSmall').text(mapText);
      $('#pano').removeClass('big').removeClass('fullScreen').css('zIndex',1).addClass('panoSmall').text(panoText).css('background','rgba(0,150,180,0.7)');
    }

    Information.prototype.click = function(){
      var self = this;

      $('#map').click(function(){
        if(self.mapType){
          $('#pano').text('收起 ↑');
          self.panoTpye = false;
          if(!self.mapBol){
            $('#map').removeClass('mapSmall').addClass('big').css('zIndex',100000).text('');
            self.maps();
          }
          self.mapBol = true;
        }else{
           self.shrink();
        }
      });

      $('#pano').click(function(){
        if(self.panoTpye){
          self.mapType = false;
          $('#pano').removeClass('panoSmall').addClass('big').css('zIndex',100000).text('');
          $('#map').text('收起 ↑');
          self.pano();
        }else{
          self.shrink();
        }
        });
    }