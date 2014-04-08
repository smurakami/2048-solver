/* ============================= *
 * solver.js
 * ============================= */


/* ============================= *
 * readmap.js
 * ============================= */

var readMap = function () {
  // Initialize
  var MAP_SIZE = 4;
  var map = new Array(MAP_SIZE);
  for (var i = 0; i < MAP_SIZE; i++) {
    map[i] = Array(4);
    for (var j = 0; j < MAP_SIZE; j++){
      map[i][j] = 0;
    }
  }
  // Get tiles from DOM tree
  var tiles = [];
  var tileContainer = document.querySelector('.tile-container');
  for (var i = 0, l = tileContainer.childNodes.length; i < l; i++){
    var tile = {};
    var tileDom = tileContainer.childNodes[i];
    var classes = tileDom.className.split(" ");
    tile.num = Number(classes[1].slice(5));
    var a_pos = classes[2].slice(14).split("-");
    tile.x = a_pos[0] - 1;
    tile.y = a_pos[1] - 1;
    tile.merged = classes.length >= 4 && classes[3] == "tile-merged";
    tiles.push(tile);
  }
  // filter merged tiles
  for (var i = 0; i < tiles.length; i++){
    var tile = tiles[i];
    if (tile.merged) {
      for (var j = 0; j < tiles.length; j++){
        tile_ = tiles[j];
        if (tile.x == tile_.x && tile.y == tile_.y && !tile_.merged){
          tiles.splice(j, 1);
          j--;
        }
      }
    }
  }
  // Put tiles on the map
  for (var i = 0, l = tiles.length; i < l; i++){
    var tile = tiles[i];
    map[tile.y][tile.x] = tile.num;
  }

  return map;
};

var printMap = function(map) {
  for (var i = 0; i < 4; i++){
    s = ""
    for (var j = 0; j < 4; j++){
      s += map[i][j] + ", "
    }
    console.log(s);
  }
};


/* ============================= *
 * controller.js
 * ============================= */

var Controller = function(){};
Controller.prototype.keydown = function(k) {
  var body = document.querySelector('body');
  var oEvent = document.createEvent('KeyboardEvent');
  // Chromium Hack
  Object.defineProperty(oEvent, 'keyCode', {
              get : function() {return this.keyCodeVal; }
  });
  Object.defineProperty(oEvent, 'which', {
              get : function() {return this.keyCodeVal; }
  });
  modkeys = ['shiftKey', 'metaKey', 'ctrlKey', 'altKey'];
  for (var i = 0, l = modkeys.length; i < l; i++){
    Object.defineProperty(oEvent, modkeys[i], {
      get : function() {return false; }
    });
  }
  if (oEvent.initKeyboardEvent) {
      oEvent.initKeyboardEvent("keydown", true, true, document.defaultView, false, false, false, false, k, k);
  } else {
      oEvent.initKeyEvent("keydown", true, true, document.defaultView, false, false, false, false, k, 0);
  }
  oEvent.keyCodeVal = k;
  if (oEvent.keyCode !== k) {
      alert("keyCode mismatch " + oEvent.keyCode + "(" + oEvent.which + ")");
  }
  body.dispatchEvent(oEvent);
}

Controller.prototype.up = function(){
  this.keydown(38);
};
Controller.prototype.right = function(){
  this.keydown(39);
};
Controller.prototype.down = function(){
  this.keydown(40);
}
Controller.prototype.left = function(){
  this.keydown(37);
};
