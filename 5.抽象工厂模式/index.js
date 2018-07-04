// 抽象工厂方法

var VehicleFactory = function(subType, superType) {
  if(typeof VehicleFactory[superType] === 'function') {
    function F() {};
    F.prototype = new VehicleFactory[superType]();
    subType.constructor = subType;
    subType.prototype = new F();
  }else{
    throw new Error('未创建该抽象类');
  }
}

// 小汽车抽象类

VehicleFactory.Car = function() {
  this.type = 'Car';
};
VehicleFactory.Car.prototype = {
  getPrice: function() {
    return new Error('抽象方法不能调用');
  },
  getSpeed: function() {
    return new Error('抽象方法不能调用');    
  }
};

// 抽象类的使用

var BMW = function(price, speed) {
  this.price = price;
  this.speed =speed;
}

VehicleFactory(BMW, 'Car');
BMW.prototype.getPrice = function(){
  return this.price;
}
BMW.prototype.getSpeed = function () {
  return this.speed;
}

var mycar = new BMW(2.5, 38);
console.log(mycar.getPrice());
console.log(mycar.getSpeed());