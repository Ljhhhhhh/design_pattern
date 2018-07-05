// 代理模式实现预加载图片

var myImage = (function () {
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);

  return {
    setSrc: function (src) {
      imgNode.src = src;
    }
  }
})();

var proxyImage = (function () {
  var img = new Image;
  img.onload = function () {
    myImage.setSrc(this.src);
  }
  return {
    setSrc: function (src) {
      myImage.setSrc('./1.png');
      img.src = src;
    }
  }
})();

proxyImage.setSrc('./2.png');

// 代理模式合并HTTP请求

var synchronoousFile = function (id) {
  console.log('开始同步文件，id为：' + id);
};

var proxySynchronousFile = (function () {
  var cache = [],
    timer;

  return function (id) {
    cache.push(id);
    if (timer) {
      return;
    }

    timer = setTimeout(function () {
      synchronoousFile(cache.join(','));
      clearTimeout(timer);
      timer = null;
      cache.length = 0;
    }, 2000)
  }
})();

var checkbox = document.getElementsByTagName('input');
for (var i = 0, c; c = checkbox[i++];) {
  c.onclick = function () {
    if (this.checked === true) {
      proxySynchronousFile(this.id)
    }
  }
}

// 缓存代理

var mult = function () {
  var a = 1;
  for (var i = 0, l = arguments.length; i < l, i++) {
    a = a * arguments[i];
  }
  return a;
}

// 创建缓存代理的工厂

var createProxyFactory = function (fn) {
  var cache = {};
  return function () {
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      return cache[args];
    }
    return cache[args] = fn.apply(this, arguments);
  }
};

var proxyMult = createProxyFactory(mult);
alert(proxyMult(1, 2, 3, 4));