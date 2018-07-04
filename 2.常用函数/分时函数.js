//  分时函数

var timeChunk = function (ary, fn, count) {
  var obj,
      t;

  var len = ary.length;

  var start = function () {
    for (var i = 0; i < Math.min(count || 1, ary.length); i++) {
      var obj = ary.shift();
      fn(obj);
    }
  };

  return function () {
    t = setInterval(function () {
      if (ary.length === 0) {
        return clearInterval(t);
      }
      start();
    }, 200);

  };
}

//  分时函数的使用

var ary = [];

for (var i = 1; i <= 1000; i++) {
  ary.push(i);
}

var renderFriendList = timeChunk(ary, function (n) {
  var div = document.createElement('div');
  div.innerHTML = n;
  document.body.appendChild(div);
}, 8);

renderFriendList();