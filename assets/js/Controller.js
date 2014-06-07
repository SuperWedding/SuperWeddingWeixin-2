////////提示图层
!(function(root) {
  var Controller = function() {
    this.clicks();
  };

  Controller.prototype.clicks = function() {
    var self = this;
    //开始按钮
    $('#pass').click(
      function() {
        window.animation.clearSpeed();
      }
    );
  }
  
  function clearDiv(div) { ///////////////////
    $(div).find('div').remove();
  }

  root.Controller = Controller;
})(window);