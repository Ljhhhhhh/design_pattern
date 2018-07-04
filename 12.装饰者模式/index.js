// 装饰者

var decorator = function (input, fn, when) {
  var input = document.getElementById(input);

  if (typeof input.onclick === 'function') {
    var oldClickFn = input.onclick;
    input.onclick = function () {
      if (when === 'before') {
        fn();
        oldClickFn();
      } else {
        oldClickFn();
        fn();
      }
    }
  } else {
    input.onclick = fn;
  }
}

//装饰者的使用
document.getElementById('tel_input').onclick = function () {
  console.log('原有函数');
}
decorator('tel_input', function () {
  console.log('新增功能');
}, 'before')

// 用AOP装饰函数

Function.prototype.before = function (beforefn) {
  var __self = this;
  return function () {
    beforefn.apply(this, arguments);
    return __self.apply(this, arguments);
  }
};

Function.prototype.after = function (afterfn) {
  var __self = this;
  return function () {
    var ret = __self.apply(this, arguments);
    afterfn.apply(this, arguments);
    return ret;
  }
}

// 应用

window.onload = function () {
  alert(1);
}

window.onload = (window.onload || function () {}).before(function () {
  alert(2);
})

// 用AOP装饰函数（如果before函数不通过，不再继续执行） 

Function.prototype.before = function (beforefn) {
  var __self = this;
  return function () {
    if (beforefn.apply(this, arguments) === false) {
      // beforefn返回fanlse的情况直接return，不再执行原函数
      return;
    }
    return __self.apply(this, arguments);
  }
};

var validata = function () {
  if (username.value === '') {
    alert('用户名不能为空');
    return false;
  }
  if (password.value === '') {
    alert('密码不能为空');
    return false;
  }
}

var formSubmit = function () {
  var param = {
    username: username.value,
    password: password.value
  }
  ajax('address', param);
}

formSubmit = formSubmit.before(validata);

submitBtn.onclick = function () {
  formSubmit();
}