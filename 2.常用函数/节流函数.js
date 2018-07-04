//  节流函数
var throttle = function(fn, interval) {
  var __self = fn,
      timer,
      firstTime = true;

  return function() {
    var args = arguments,
        __me = this;

    if(firstTime) {
      __self.apply(__me, args);
      return firstTime = false;
    }

    if(timer) {
      return false;
    }

    timer = setTimeout(function() {
      clearTimeout(timer);
      timer = null;
      __self.apply(__me, args);
    }, interval || 500);

  };

};

window.onresize = throttle(function() {
  console.log('window resize');
}, 500);