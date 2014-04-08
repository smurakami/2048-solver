/* ============================= *
 * solver.js
 * ============================= */

var Solver = function () {
  this.counter = 0;
  this.toStop = true;
  this.controller = new Controller();
  this.interval = 100;
};

Solver.prototype.start = function() {
  var self = this;
  self.toStop = false;
  var loop = function () {
    self.update();
    if (self.toStop) return;
    setTimeout(loop, self.interval);
  };
  loop();
};

Solver.prototype.update = function () {
  var prevMap = Map.read();

  var dir = Math.floor(Math.random() * 4);
  switch (dir) {
    case 0:
      this.controller.up();
      break;
    case 1:
      this.controller.down();
      break;
    case 2:
      this.controller.left();
      break;
    case 3:
      this.controller.right();
      break;
    default: break;
  }

  var currentMap = Map.read();

  if (!prevMap.eq(currentMap)){
    console.log("map error!");
  }

  this.counter++;
};

var s = new Solver();
