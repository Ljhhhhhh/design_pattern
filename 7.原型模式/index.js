// 原型模式实现图片轮播类

var LoopImages = function (imgArr, container) {
  this.imagesArray = imgArr;
  this.container = container;
}
LoopImages.prototype = {
  createImage: function () {
    console.log('LoopImages createImages function');
  },
  changeImage: function () {
    console.log('LoopImages changeImages function');
  }
}

var SlideLoopImg = function (imgArr, container) {
  LoopImages.call(this, imgArr, container);
}
SlideLoopImg.prototype = new LoopImages();

SlideLoopImg.prototype.changeImage = function () {
  console.log('SlideLoopImg changeImage function');
}

var FadeLoopImg = function (imgArr, container, arrow) {
  LoopImages.call(this, imgArr, container);
  this.arrow = arrow;
}
FadeLoopImg.prototype = new LoopImages();
FadeLoopImg.prototype.changeImage = function () {
  console.log('FadeLoopImg changeImage function');
}

//图片轮播类的使用
var fadeImg = new FadeLoopImg([
  '01.jpg',
  '02.jpg',
  '03.jpg',
  '04.jpg',
], 'slide', [
  'left.jpg',
  'right.jpg'
])

console.log(fadeImg.container);
fadeImg.changeImage();

// 原型继承

function prototypeExtend() {
  var F = function () {},
    args = arguments,
    i = 0,
    len = args.length;
  for (; i < len; i++) {
    // 遍历每个模板对象中的属性
    for (var j in args[i]) {
      F.prototype[j] = args[i][j];
    }
  }
  return new F();
}

// 原型继承的使用方式

var penguin = prototypeExtend({
  speed: 20,
  swim: function () {
    console.log('游泳速度' + this.speed);
  }
}, {
  run: function (speed) {
    console.log('奔跑速度' + speed);
  }
}, {
  jump: function () {
    console.log('跳跃');
  }
})

penguin.swim();
penguin.run(10);
penguin.jump();