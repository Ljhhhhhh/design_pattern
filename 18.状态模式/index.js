// JavaScript版本的状态机

var Light = function() {
  this.currState = FSM.off;
  this.button = null;
};

Light.prototype.init = function() {
  var button = document.createElement('button'),
      self = this;
  button.innerHTML = '已关灯';
  this.button = document.body.appendChild(button);

  this.button.onclick = function() {
    self.currState.buttonWasPressed.call(self);
  }
};

var FSM ={
  off: {
    buttonWasPressed: function() {
      console.log('关灯');
      this.button.innerHTML = '下一次按我是开灯';
      this.currState = FSM.on;
    }
  },
  on: {
    buttonWasPressed: function () {
      console.log('开灯');
      this.button.innerHTML = '下一次按我是关灯';
      this.currState = FSM.off;
    }
  },
};

var light = new Light();
light.init();


// 传统语言的状态机

var Light = function () {
  this.offLightState = new OffLightState(this);
  this.weakLightState = new WeakLightState(this);
  this.strongLightState = new StrongLightState(this);
  this.superLightState = new SuperLightState(this);
  this.button = null;
};

Light.prototype.init = function () {
  var button = document.createElement('div'),
      self = this;

  this.button = document.body.appendChild(button);
  this.button.innerHTML = '开关';
  this.currState = this.OffLightState;

  this.button.onclick = function () {
    self.currState.buttonWasPressed();
  }
};

var offLightState = function (light) {
  this.light = light;
};

OffLightState.prototype.buttonWasPressed = function () {
  console.log('弱光');
  this.light.setState(this.light.weakLightState);
}