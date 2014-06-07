
    var timeList = [1989,1993,2007,2013,2014,2014];
    var Animation = function() {
      this.interval = 5000;
      this.index = 0;
      this.N = 6;
      this.stay = 3000;

      this.loop();
    };

    Animation.prototype.scene = function (index) {
      if(this.index < 4) {
        $('#male').css('backgroundImage', getURL(index, 0));
        $('#female').css('backgroundImage', getURL(index, 1));
      } else {
        $('#male').removeClass('people').addClass('people2')
        .css('backgroundImage',getURL(index,0));
        $('#female').removeClass('people').addClass('people0')
        .css('background','rgba(0,0,0,0)');
      }
      $('#text').text(timeList[this.index]);
      this.in();
      this.out();
    };

    Animation.prototype.out = function () {
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

    Animation.prototype.in = function () {
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

    Animation.prototype.next = function () {
      this.scene(this.index);
      this.index = this.index+1;
    };

    Animation.prototype.loop = function () {
      this.next();
      var self = this;
      this.timer = setTimeout(function () {
        self.loop();
      }, self.interval);
      this.action();
    };

    Animation.prototype.action = function () {
      if (this.index >= this.N) {
        this.clear();
      }
    };

    Animation.prototype.clear = function () {
       this.stop();
        this.outs();
    }
    Animation.prototype.clearSpeed = function () {
       this.stop();
        this.outSpeed();
    }
    Animation.prototype.stop = function () {
      window.clearTimeout(this.timer);
    }

    Animation.prototype.outs = function () {
      $('#broadcast').addClass('broadcastOut');
      $('#add').addClass('addOut');
    }

    Animation.prototype.outSpeed = function () {
      $('#broadcast').addClass('broadcastOutSpeed');
      $('#add').addClass('addOutSpeed');
    }
    function getURL(n, index) {
      var fileName = n + '.' + index + '.jpg';
      var url = QINIU_DOMAIN + '/' + fileName;
      return 'url(' + url + ')';
    };
