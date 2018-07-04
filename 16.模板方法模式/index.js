// 模板方法模式（JavaScript）

// 模板父类
var Beverage = function (param) {
  var boilWater = function () {
    console.log('把水煮沸');
  };

  var brew = param.brew || function () {
    throw new Error('必须传递brew方法');
  };

  var pourInCup = param.pourInCup || function () {
    throw new Error('必须传递pourInCup方法');
  };

  var addCondiments = param.addCondiments || function () {
    throw new Error('必须传递addCondiments方法');
  };

  var F = function () {};

  F.prototype.init = function () {
    boilWater();
    brew();
    pourInCup();
    addCondiments();
  };
  
  return F;
};

// 模板实例

var Coffee = Beverage({
  brew: function () {
    console.log('用沸水冲泡咖啡');
  },
  pourInCup: function () {
    console.log('用沸水冲泡咖啡');
  },
  addCondiments: function () {
    console.log('用沸水冲泡咖啡');
  },
});

var coffee = new Coffee();
coffee.init();


// 格式化字符串方法

function formateString(str, data) {
  return str.replace(/\{#(\w+)#\}/g, function (match, key) {
    return typeof data[key] === undefined ? '' : data[key];
  })
}

// 模板方法类
var Nav = function (data) {
  this.item = '<a href="{#href#}" title="{#title#">{#name#}</a>';
  this.html = '';
  for (var i = 0, len = data.length; i < len; i++) {
    this.html += formateString(this.item, data[i]);
  }
  return this.html;
}

var NumNav = function (data) {
  var tpl = '<b>{#num#}</b>';
  for (var i = data.length - 1; i >= 0; i--) {
    data[i].name += data[i].name + formateString(tpl, data[i]);
  };
  return Nav.call(this, data);
}

var LinkNav = function (data) {
  var tpl = '<span>{#link#}</span>';
  for (var i = data.length - 1; i >= 0; i--) {
    data[i].name += data[i].name + formateString(tpl, data[i]);
  };
  return Nav.call(this, data);
}

// 使用

var nav = document.getElementById('content');

nav.innerHTML = NumNav([{
    href: 'http://www.baidu.com',
    title: '百度一下',
    name: '百度',
    num: '10'
  },
  {
    href: 'http://www.taobao.com',
    title: '淘宝商城',
    name: '淘宝',
    num: '2'
  }
])