// 通用观察者模式

var event = {
  clientList: [],
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn); /* 订阅的消息添加进缓存列表 */
  },
  trigger: function () {
    var key = Array.prototype.shift.call(arguments),
      fns = this.clientList[key];
    if (!fns || fns.length === 0) {
      return false;
    }

    for (var i = 0, fn; fn = fns[i++];) {
      fn.apply(this.arguments);
    }
  }
};

// 取消订阅

event.remove = function (key, fn) {
  var fns = this.clientList[key];
  if (!fns) {
    return false;
  }
  if (!fn) {
    fns && (fns.length = 0);
  } else {
    for (var l = fns.length - 1; l >= 0; l--) {
      var _fn = fns[l];
      if (_fn === fn) {
        fns.splice(l, 1);
      }
    }
  }
};

// 可以给对象安装观察者模式的函数

var installEvent = function (obj) {
  for (var i in event) {
    obj[i] = event[i];
  }
}

// 使用观察者模式完成售楼的例子

var saleOffices = {};
installEvent(saleOffices);

saleOffices.listen('M88', fn1 = function (price) {
  console.log('价格=' + price);
});

saleOffices.listen('M110', function (price) {
  console.log('价格=' + price);
});

saleOffices.remove('M88', fn1);
saleOffices.trigger('M110', 3000);

// 观察者模式实现售楼的例子

// var saleOffices = {}; /* 定义售楼处 */
// saleOffices.clientList = {}; /* 缓存列表，存放订阅者的回调函数 */

// saleOffices.listen = function (key, fn) { /* 定义观察 */
//   if (!this.clientList[key]) { /* 如果还没有订阅此类消息，给该类消息创建一个缓存列表 */
//     this.clientList[key] = [];
//   }
//   this.clientList[key].push(fn);
//   console.log(this.clientList);
// };

// saleOffices.trigger = function () {
//   var key = Array.prototype.shift.call(arguments),
//     fns = this.clientList[key];

//   if (!fns || fns.length === 0) {
//     return false;
//   }
//   for (var i = 0, fn; fn = fns[i++];) {
//     console.log(fn);
//     fn.apply(this, arguments);
//   }
// };

// saleOffices.listen('M88', function (price) {
//   console.log('价格=' + price);
// });

// saleOffices.listen('M110', function (price) {
//   console.log('价格=' + price);
// });

// saleOffices.trigger('M88', 2000);
// saleOffices.trigger('M110', 3000);