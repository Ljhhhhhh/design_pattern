var mult = (function () {
  var cache = {};
  var calculate = function () {
    var a = 1;
    for (var i = 0, l = arguments.length; i < l; i++) {
      a = a * arguments[i];
    }
    return a;
  };

  return function () {
    var args = Array.prototype.join.call(arguments, ',');
    if (args in cache) {
      console.log('cache[args]=', cache[args]);
      return cache[args];
    }
    return cache[args] = calculate.apply(null, arguments);
  }
})();

console.log(mult(1, 2, 3, 4, 5));
console.log(mult(1, 2, 3, 4, 5,6));