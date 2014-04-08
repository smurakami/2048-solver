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

Solver.prototype.stop = function(){
  this.toStop = true;
};

Solver.prototype.update = function () {
  var self = this;
  var prevMap = Map.read();
  prevMap.setOld();
  var predicatedMap = prevMap.clone();

  var dir = Math.floor(Math.random() * 4);
  switch (dir) {
    case 0:
      this.controller.up();
      predicatedMap.moveup();
      break;
    case 1:
      this.controller.down();
      predicatedMap.movedown();
      break;
    case 2:
      this.controller.left();
      predicatedMap.moveleft();
      break;
    case 3:
      this.controller.right();
      predicatedMap.moveright();
      break;
    default: break;
  }

  setTimeout(function(){
    var currentMap = Map.read();
    // currentMap.print();
    currentMap.removeNewTile();

    if (!predicatedMap.eq(currentMap)){
      console.log("map error!");
      console.log("prev: ");
      prevMap.print();
      console.log("predicated:")
      predicatedMap.print();
      console.log("current: ");
      currentMap.print();
      self.stop();
    }
  }, 50);

  this.counter++;
};

var s = new Solver();
