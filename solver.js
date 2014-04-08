/* ============================= *
 * solver.js
 * ============================= */

var Solver = function () {
  this.counter = 0;
  this.toStop = true;
  this.controller = new Controller();
};

Solver.prototype.start = function() {
  var self = this;
  self.toStop = false;
  var loop = function () {
    self.update();
    if (self.toStop) return;
    setTimeout(loop, 500);
  };
  loop();
};

Solver.prototype.update = function () {
  switch (this.counter % 4) {
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
  this.counter++;
};

var s = new Solver();
