function() {
  var imgUrl = 'http://open-wedding.qiniudn.com/pngbgtitle.jpg';
  var lineLink = 'http://wedding2.keydiary.net/pages/invit';
  var descContent = "6.21中午11点在交大闵行校区等待你们的见证";
  var shareTitle = '周宁奕 ❤ 余晓瑞';
  var appid = '';

  function shareFriend() {
    WeixinJSBridge.invoke('sendAppMessage', {
      "appid": appid,
      "img_url": imgUrl,
      "img_width": "200",
      "img_height": "200",
      "link": lineLink,
      "desc": descContent,
      "title": shareTitle
    }, function(res) {
      _report('send_msg', res.err_msg);
    })
  }

  function shareTimeline() {
    WeixinJSBridge.invoke('shareTimeline', {
      "img_url": imgUrl,
      "img_width": "200",
      "img_height": "200",
      "link": lineLink,
      "desc": descContent,
      "title": shareTitle
    }, function(res) {
      //_report('timeline', res.err_msg);
    });
  }

  function shareWeibo() {
    WeixinJSBridge.invoke('shareWeibo', {
      "content": descContent,
      "url": lineLink,
    }, function(res) {
      //_report('weibo', res.err_msg);
    });
  }
  document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
    // 发送给好友
    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
      shareFriend();
    });
    // 分享到朋友圈
    WeixinJSBridge.on('menu:share:timeline', function(argv) {
      shareTimeline();
    });
    // 分享到微博
    WeixinJSBridge.on('menu:share:weibo', function(argv) {
      shareWeibo();
    });
  }, false);
}

var QINIU_DOMAIN = 'http://yeshou.qiniudn.com';