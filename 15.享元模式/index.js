// 享元模式

var Flyweight = function () {
  var created = [];

  function created() {
    var dom = document.getElementById('div');
    document.getElementById('container').appendChild('dom');
    created.push(dom);
    return dom;
  }
  return {
    getDiv: function () {
      if (created.length < 5) {
        return created();
      } else {
        var div = created.shift();
        created.push(div);
        return div;
      }
    }
  }
}

// 享元模式的使用

var paper = 0,
  num = 5,
  length = article.length;
for (var i = 0; i < 5; i++) {
  if (article[i]) {
    Flyweight.getDiv().innerHTML = article[i]
  }
}

document.getElementById('next_page').onclick = function () {
  if (article.length < 5) {
    return;
  }
  var n = ++paper * num % len,
    j = 0;
  for (; j < 5; j++) {
    if (article[n + j]) {
      Flyweight.getDiv().innerHTML = article[n + j];
    } else if (article[n + j - len]) {
      Flyweight.getDiv().innerHTML = article[n + j - len];
    } else {
      Flyweight.getDiv.innerHTML = ''
    }
  }
}