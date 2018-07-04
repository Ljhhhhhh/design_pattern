//惰性函数

var addEvent = function (elem, type, handler) {
  if (window.addEventListener) {
    addEvent = function (elem, type, handler) {  //重写函数，下一次调用时无需再次判断
      elem.addEventListener(type, handler, false);
    }
  } else if (window.attachEvent) {
    addEvent = function (elem, type, handler) {  //重写函数，下一次调用时无需再次判断
      elem.attachEvent('on' + type, handler);
    }
  }

  addEvent(elem, type, handler);
};

//惰性函数调用

var div = document.getElementById('div');

addEvent(div, 'click',function(){
  alert(1);
});

addEvent(div, 'click', function () {
  alert(2);
});