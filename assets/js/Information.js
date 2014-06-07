



    var mapText = '上海交大闵行校区（东川路）'
    var panoText = '留园餐厅2楼'
    function Warper (div){
      this.div = div;

      this.add();
      this.click();
    }

    Warper.prototype.click = function(){
      
    }
    Warper.prototype.add = function(){
      var self = this;
      setTimeout(function(){
      var child = $('<div></<div>');
      child
      .css('background','rgba(255,0,0,0.6)')
      .css('width','100%')
      .css('height','100%')
      .css('zIndex',900000000);
      self.div.append(child);
      self.child = child;        
    },4000)
    };

    Warper.prototype.clear = function(){
      this.child.fadeout();
    }


    var Information = function(){
      this.mapTpye = true;
      this.panoTpye = true;
      // this.map();
      // this.pano();
      // this.wraper();
      this.click();
    };

    Information.prototype.wraper = function(){
      this.wraperMap = new Warper($('#map'));
      this.wraperPano = new Warper($('#pano'));
    }

    Information.prototype.maps = function(){
      var mapDiv = $('<div></div>')
      .css('width','100%')
      .css('height','100%')
      .attr('id','mapDiv');
      $('#map').append(mapDiv);

      this.map = new Map(mapDiv);
    // $('#mapDiv').find('.amap-logo').remove();
    // $('#mapDiv').find('.amap-copyright').remove();
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
      $('#map').removeClass('big').removeClass('fullScreen').css('zIndex',1).addClass('mapSmall').text(mapText);
      $('#pano').removeClass('big').removeClass('fullScreen').css('zIndex',1).addClass('panoSmall').text(panoText).css('background','rgba(200,50,150,0.7)');
    }

    Information.prototype.click = function(){
      var self = this;

      $('#map').click(function(){
        if(self.mapTpye){
          $('#map').removeClass('mapSmall').addClass('big').css('zIndex',100000).text('');
          $('#pano').text('收起↑');
          self.panoTpye = false;
          self.maps();
        }else{
          self.shrink();
          $('#map').removeClass('big').removeClass('fullScreen').css('zIndex',1).addClass('mapSmall').text(mapText)
        }
        self.mapTpye = !self.mapTpye;
      });

      $('#pano').click(function(){
        if(self.panoTpye){
          self.mapTpye = false;
          $('#pano').removeClass('panoSmall').addClass('big').css('zIndex',100000).text('');
          $('#map').text('收起');
          self.pano();
        }else{
          self.shrink();
          $('#pano').removeClass('big').addClass('panoSmall');
        }
        self.panoTpye = !self.panoTpye;
        });
    }