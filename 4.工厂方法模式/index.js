//  安全的工厂方法

var Factory = function (type, content) {
  if (this instanceof Factory) {
    var s = new this[type](content);
    return s;
  } else {
    return new Factory(type, content);
  }
}

// 工厂原型中设置创建所有类型数据对象的基类

Factory.prototype = {
  Java: function (content) {

  },
  UI: function (content) {

  },
  PHP: function (content) {

  },
  JavaScript: function (content) {
    this.content = content;
    (function (content) {
      var div = document.createElement('div');
      div.innerHTML = content;
      div.style.border = '1px solid red';
      document.getElementById('container').appendChild(div);
    })(content);
  },
}

// 使用实例

var data = [
  {type: 'JavaScript',content: 'JavaScript哪家强'},
  {type: 'Java',content: 'Java哪家强'},
  {type: 'UI',content: 'UI哪家强'},
  {type: 'PHP',content: 'PHP哪家强'}
];
console.log(data);
for (var i = 3; i >= 0; i--) {
  Factory(data[i].type, data[i].content);
}