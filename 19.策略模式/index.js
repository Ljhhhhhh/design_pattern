//策略模式思想
// var strategies = {
//   "S": function(salary) {
//     return salary * 4
//   },
//   "A": function (salary) {
//     return salary * 3
//   },
//   "B": function (salary) {
//     return salary * 2
//   },
// };

// var calculateBonus = function(level, salary) {
//   return strategies[level](salary);
// };

// console.log(calculateBonus('S', 200));
// console.log(calculateBonus('A', 300));


//策略对象
var strategies = {
  isNonEmpty: function (value, errorMsg) {
    if (value === '') {
      return errorMsg;
    }
  },
  minLength: function (value, length, errorMsg) {
    if (value.length < length) {
      return errorMsg;
    }
  },
  isMobile: function (value, errorMsg) {
    if (!/^1[3|5|8][0-9]{9}$/.test(value)) {
      return errorMsg;
    }
  }
};

//validator类
var Validator = function () {
  this.cache = [];
};

Validator.prototype.add = function (dom, rules) {
  var self = this;

  for (var i = 0, rule; rule = rules[i++];) {
    (function (rule) {
      var strategyAry = rule.strategy.split(':');
      var errorMsg = rule.errorMsg;

      self.cache.push(function () {
        var strategy = strategyAry.shift();
        strategyAry.unshift(dom.value);
        strategyAry.push(errorMsg);
        return strategies[strategy].apply(dom, strategyAry)
      });
    })(rule)
  }
};

Validator.prototype.start = function () {
  for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
    var errorMsg = validatorFunc();
    if (errorMsg) {
      return errorMsg;
    }
  }
}

//客户调用代码
var registerForm = document.getElementById('registerForm');

var validatorFunc = function () {
  var validator = new Validator();

  validator.add(registerForm.username, [{
    strategy: 'isNonEmpty',
    errorMsg: '用户名不能为空'
  }, {
    strategy: 'minLength:10',
    errorMsg: '用户名长度不能小于10位'
  }]);
  validator.add(registerForm.password, [{
    strategy: 'minLength:6',
    errorMsg: '密码长度不能小于6位'
  }]);
  validator.add(registerForm.phonenumber, [{
    strategy: 'isMobile',
    errorMsg: '手机号码格式不正确'
  }]);

  var errorMsg = validator.start();
  return errorMsg;
}

registerForm.onsubmit = function () {
  var errorMsg = validatorFunc();

  if (errorMsg) {
    alert(errorMsg);
    return false;
  }
};