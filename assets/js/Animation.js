    var timeList = ['1989','1994','2007','2008','2014.1','2014.2','2014.4'];
    var Animation = function(container){
      this.container = $(container);

      this.firstBol = false; 
      if(this.firstBol){
        //
      }else{
        this.animate();
      }

      this.loadingIndex = 0;
      this.animationImgs = {};
      // this.loop();
    };

    Animation.prototype.check = function(){
      var checkText = '周宁奕和余晓瑞欢迎您首次登陆，为更好地接待，我们想了解：'
      var comes = ['我不能来现场','我会来捧场'];
      var sites = '输入地址，遥寄喜糖：'
      // var traffic = '我开车/搭车','我坐公交','我想搭车'
      //验证码 婚礼时间：box
    }

    Animation.prototype.checkDivs = function(){

    }

  Animation.prototype.checkDiv = function(container){
   //  var input = 
   //  $('<input></input>')
   //  .css('zIndex',100)
   //  .css('position','absolute')
   //  .css("width",'80%')
   //  .css("top",'0%')
   //  .css("left",'0%')
   //  .css('height','10%')
   //  .css('background','#fff')
   //  .attr('type','textbox')
   //  .css('fontSize','30px')
   //  .attr('value','上海交通大学闵行校区');
   //  container.append(input);

   // var inputH = input.height()+4;
   // var searchBotton = this.searchBotton =
   // $('<div></div>')
   // .css('position','absolute')
   // .css('zIndex',100) 
   // .css("top",'0%')
   // .css("left",'80%')
   // .css('height',inputH+'px')
   // .css('lineHeight',inputH+'px')
   // .css('width','20%')
   // .css('background','#099')
   // .css('fontSize','30px')
   // .text('搜路线')
   // ;
   // this.container.append(searchBotton);
 } 

    Animation.prototype.animate = function(){
      var self = this;
      this.interval = 5000;
      this.index = 0;
      this.N = timeList.length;
      this.stay = 3000;
      this.loadGifs();
      this.loading(this.loop.bind(this),2*4);

      ///loading结束后开始动画
      // setTimeout(function(){
      //   // self.clearLoading();
      //   self.loop();
      // }.bind(this)
      // ,4000);
    } 

    Animation.prototype.loadGifs = function (){
      $('#add').addClass('addAnimation');

      var gifURL = 'http://open-wedding.qiniudn.com/pngloading.gif';
      var w = this.container.width();
      var h = this.container.height();
      var gifSize = parseInt(w*0.4);
      var left = parseInt(w/2- gifSize/2)+'px';
      var top = parseInt(h*0.2- gifSize/2)+'px';

      var loadingGif = this.loadingGif 
      = $('<img></img>')
      .css('position','absolute')
      .css('top',top)
      .css('left',left)
      .css('zIndex','1')
      .css('verticalAlign','middle')
      .css('height',gifSize*1.1+'px')
      .css('width',gifSize+'px')
      .attr('src',gifURL)
      .css('backgroundSize','100% 100%')
      .fadeIn();

      this.container.append(loadingGif);
    }

    Animation.prototype.loading = function(callback, imageN) {
      var self = this;
      var w = $('#broadcast').width();
      var h = $('#broadcast').height();
      for (var k in timeList) {
        var time = timeList[k];
        if (k < imageN/2) {
          var image1 = new Image();
          image1.width = w/2;
          image1.height = h;
          image1.src = getURL(time, 1);
          image1.onload = function() {
            self.animationImgs[this.src]=$(this);
            self.loadingIndex += 1;
            if (self.loadingIndex === imageN) {
              callback();
            }
          };
        }
        var image0 = new Image();
        image0.width = (k < imageN/2)?w/2:w;
        image0.height = h;
        image0.src = getURL(time, 0);
        image0.onload = function() {
          self.animationImgs[this.src]=$(this);
          self.loadingIndex += 1;
          if (self.loadingIndex === imageN) {
            callback();
          }
        };
      }
     $('#Infomation').css('backgroundImage',"url('http://open-wedding.qiniudn.com/pngbg.jpg')");
    }
    Animation.prototype.clearLoading = function (){
      this.loadingGif.fadeOut();
    }

    Animation.prototype.scene = function (index){
      var time = timeList[index];
      if(index<4){
        var imageMale = this.animationImgs[getURL(time,0)];
        var imageFemale = this.animationImgs[getURL(time,1)];
        $('#male').find('img').remove();
        $('#male').append(imageMale);
        $('#female').find('img').remove();
        $('#female').append(imageFemale);
      }else{
        $('#male').removeClass('people').addClass('people2')
        $('#male').find('img').remove();
        $('#male').append(this.animationImgs[getURL(time,0)]);
        $('#female').find('img').remove();
        $('#female').removeClass('people').addClass('people0')
        .css('background','rgba(0,0,0,0)');  
      }
      setTimeout(function(){
        $('#text').text(time);
      },1000);
      
      this.in();
      this.out();
    };

    Animation.prototype.out = function (){
      var stay = this.stay;
      var stay1 = (1+Math.random()*0.2)*stay;
      var stay2 = (1+Math.random()*0.2)*stay;
      setTimeout(function(){
      $('#male')
      .removeClass('in')
      .addClass('out');},stay1);
      setTimeout(function(){
      $('#female')
      .removeClass('in')
      .addClass('out');},stay2);
    };

    Animation.prototype.in = function (){
      var stay = this.stay;
      setTimeout(function(){
      $('#male')
      .removeClass('out')
      .addClass('in');},(Math.random()*0.2)*stay);
      setTimeout(function(){
      $('#female')
      .removeClass('out')
      .addClass('in');},(Math.random()*0.2)*stay);
    };

    Animation.prototype.next = function(){
      this.scene(this.index);
      this.index = this.index+1;
    };

    Animation.prototype.loop = function(){
      this.next();
      var animationImgs = this.animationImgs;
      var self = this;
      this.timer = setTimeout(function(){
        self.loop();
      },self.interval);
      this.action();
    };

    Animation.prototype.action = function(){
      if(this.index>=this.N){
        this.clear();
      }
    };

    Animation.prototype.clear = function(){
      var self = this;
      setTimeout(function(){       
        self.stop();
        self.outs();
      },1000);
    }

    Animation.prototype.clearSpeed = function(){
       this.stop();
        this.outSpeed();
    }
    Animation.prototype.stop = function(){
      window.clearTimeout(this.timer);
    }

    Animation.prototype.outs = function(){
      $('#broadcast').addClass('broadcastOut');
      $('#add').addClass('addOut');
    }

    Animation.prototype.outSpeed = function(){
      $('#broadcast').addClass('broadcastOutSpeed');
      $('#add').addClass('addOutSpeed');
    }
     function getURL(n, index) {
      var fileName = n + '.' + index + '.jpg';
      var url = 'http://open-wedding.qiniudn.com/png' + fileName;
      return url;
    };
