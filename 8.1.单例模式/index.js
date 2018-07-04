//通用单例模式（惰性单例）
var getSingle = function(fn) {
  var result;
  return function(){  //返回出去的函数执行时的arguments
    return result || (result = fn.apply(this, arguments));
  }
}

//创建div
var createLoginLayer = function(msg) {
  var div = document.createElement('div');
  // div.innerHTML = 'i\'m login diaolg';
  div.innerHTML = msg;
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
}

//使用单例模式
var createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById('loginBtn').onclick = function() {
  var loginLayer = createSingleLoginLayer('i\'m login diaolg');
  loginLayer.style.display = 'block';
}