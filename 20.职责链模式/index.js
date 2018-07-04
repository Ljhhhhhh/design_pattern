// 构建节点

var order500 = function (orderType, pay, stock) {
  if (orderType === 1 && pay === true) {
    console.log('500元定金预购，得到100元优惠券');
  } else {
    return 'nextSuccessor';
  }
};

var order200 = function (orderType, pay, stock) {
  if (orderType === 2 && pay === true) {
    console.log('200元定金预购，得到100元优惠券');
  } else {
    return 'nextSuccessor';
  }
};

var orderNormal = function (orderType, pay, stock) {
  if (stock > 0) {
    console.log('普通购买，无优惠券');
  } else {
    return '手机库存不足';
  }
};

// AOP实现职责链

Function.prototype.after = function (fn) {
  var self = this;
  return function () {
    var ret = self.apply(this, arguments);
    if (ret === 'nextSuccessor') {
      return fn.apply(this, arguments);
    }
    return ret;
  }
};

var order = order500.after(order200).after(orderNormal);

order(1, true, 500);
order(2, true, 500);
order(1, false, 500);
order(1, false, 0);

// -----------------------------------------------------------


// 职责链模式

// 职责链原型

var Chain = function (fn) {
  this.fn = fn;
  this.successor = null;
};

Chain.prototype.setNextSuccessor = function (successor) { /* 指定在链中的下一个节点 */
  return this.successor = successor;
};

Chain.prototype.passRequest = function () {
  var ret = this.fn.apply(this, arguments);

  if (ret === 'nextSuccessor') {
    return this.successor && this.successor.passRequest.apply(this.successor, arguments);
  }

  return ret;
};

// 包装成职责链节点

var chainOrder500 = new Chain(order500);
var chainOrder200 = new Chain(order200);
var chainOrderNormal = new Chain(orderNormal);

// 指定节点在职责链中的顺序

chainOrder500.setNextSuccessor(chainOrder200);
chainOrder200.setNextSuccessor(chainOrderNormal);

// 开始使用

chainOrder500.passRequest(1, true, 500);
chainOrder500.passRequest(2, true, 500);
chainOrder500.passRequest(3, true, 500);
chainOrder500.passRequest(1, true, 0);