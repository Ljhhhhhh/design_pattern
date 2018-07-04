// 原型式继承

function inheritObject(o) {
  function F() {};
  F.prototype = o;
  return new F();
}

// 寄生式继承

function inheritPrototype(subClass, superClass) {
  var p = inheritObject(superClass.prototype);
  p.constructor = subClass;
  subClass.prototype = p;
}

var News = function () {
  this.children = [];
  this.element = null;
}

News.prototype = {
  init: function () {
    throw new Error('请重写方法');
  },
  add: function () {
    throw new Error('请重写方法');
  },
  getElement: function () {
    throw new Error('请重写方法');
  }
}

// 组合模式，首先需要容器类

var Container = function (id, parent) {
  News.call(this);
  this.id = id;
  this.parent = parent;
  this.init();
}

//寄生式继承父类原型方法

inheritPrototype(Container, News);

//构建方法

Container.prototype.init = function () {
  this.element = document.createElement('ul');
  this.element.id = this.id;
  this.element.className = 'new-container';
};

Container.prototype.add = function (child) {
  this.children.push(child);
  this.element.appendChild(child.getElement());
  return this;
};

Container.prototype.getElement = function () {
  return this.element;
}

Container.prototype.show = function () {
  this.parent.appendChild(this.element);
}

// 下一层

var Item = function (classname) {
  News.call(this);
  this.classname = classname || '';
  this.init();
}
inheritPrototype(Item, News);

Item.prototype.init = function () {
  this.element = document.createElement('li');
  this.element.className = this.classname;
}

Item.prototype.add = function (child) {
  this.children.push(child);
  this.element.appendChild(child.getElement());
  return this;
};

Item.prototype.getElement = function () {
  return this.element;
}

//底层

var ImageNews = function (url, href, classname) {
  News.call(this);
  this.url = url || '';
  this.href = href || '';
  this.classname = classname || 'normal';
  this.init();
}

inheritPrototype(ImageNews, News);

ImageNews.prototype.init = function () {
  this.element = document.createElement('a');
  var img = new Image();
  img.src = this.url;
  this.element.appendChild(img);
  this.element.className = 'image-news ' + this.classname;
  this.element.href = this.href;
}

ImageNews.prototype.add = function () {};

ImageNews.prototype.getElement = function () {
  return this.element;
}

//创建模块

var news = new Container('news', document.body);
news.add(
  new Item('normal').add(
    new ImageNews('./1.png','#','small')
  )
)