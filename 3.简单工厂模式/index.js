// 简单工厂模式

function createdPop(type, text) {
  var o = new Object();
  o.content = text; // 共同的属性
  o.show = function () {
    // 共同的方法
    console.log('this is common show');
  };

  // 差异部分
  if (type === 'alert') {
    console.log('this is alert');
  }
  if (type === 'prompt') {
    console.log('this is prompt');
  }
  if (type === 'confirm') {
    console.log('this is confirm');
  }
},

// 调用函数

var userNameAlert = createdPop('alert', '用户名只能是26个字母和数字');