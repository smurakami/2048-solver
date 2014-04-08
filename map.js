/* ============================= *
 * map.js
 * ============================= */

var Map = function(){
  var SIZE = 4;
  for (var i = 0; i < SIZE; i++) {
    this[i] = [null, null, null, null];
  }
  this.tiles = [];
  this.size = SIZE;
};

Map.prototype = new Array();

Map.prototype.clone = function () {
  var _map = new Map();
  for (var i = 0, len = this.tiles.length; i < len; i++){
    var tile = this.tiles[i].clone;
    _map.tiles.push(tile);
    _map[tile.y][tile.x] = tile;
  }
  return _map;
};

Map.prototype.moveup = function(){ this.move(0, -1); }
Map.prototype.movedown = function(){ this.move(0, 1); }
Map.prototype.moveleft = function(){ this.move(-1, 0); }
Map.prototype.moveright = function(){ this.move(1, 0); }

Map.prototype.move = function (dir_x, dir_y) {
  if (dir_x != 0) {
    if (dir_x > 0) {
      this.tiles.sort(function(a, b){ return b.x - a.x; });
    } else {
      this.tiles.sort(function(a, b){ return a.x - b.x; });
    }
  } else {
    if (dir_y > 0){
      this.tiles.sort(function(a, b){ return b.y - a.y; });
    } else if (dir_y < 0) {
      this.tiles.sort(function(a, b){ return a.y - b.y; });
    } else {
      console.log("Map.prototype.move: invalid direction")
    }
  }

  var moved = false;

  for (var i = 0; i < this.tiles.length; i++){
    var tile = this.tiles[i];
    var next_x = tile.x + dir_x;
    var next_y = tile.y + dir_y;
    var current_x = tile.x;
    var current_y = tile.y;
    var toRemove = false;
    while (this.inRange(next_x, next_y) && this[next_y][next_x] == null){
      current_x = next_x;
      current_y = next_y;
      next_x += dir_x;
      next_y += dir_y;
    }
    // merge
    if (this.inRange(next_x, next_y) && this[next_y][next_x].num == tile.num){
      this[next_y][next_x].num += tile.num;
      current_x = next_x;
      current_y = next_y;
      toRemove = true;
      // i--;
    }
    // move
    if (current_x != tile.x || current_y != tile.y) {
      this[tile.y][tile.x] = null;
      if (toRemove) {
        this.tiles.splice(i, 1);
        i--;
      } else {
        tile.x = current_x;
        tile.y = current_y;
        this[current_x][current_y] = tile;
      }
    }
  }
};

Map.prototype.inRange = function(x, y){
  var size = this.size;
  return (x >= 0 && x < size && y >= 0 && y < size);
};

var MapTile = function(map){
  this.map = map;
};

MapTile.prototype.clone = function() {
  _tile = new MapTile(this);
  _tile.x = this.x;
  _tile.y = this.y;
  _tile.merged = this.merged;
  _tile.isNew = this.isNew;
  return _tile;
};

Map.read = function () {
  // Initialize
  var map = new Map();
  // Get tiles from DOM tree
  var tileContainer = document.querySelector('.tile-container');
  for (var i = 0, l = tileContainer.childNodes.length; i < l; i++){
    var tile = new MapTile(this);
    var tileDom = tileContainer.childNodes[i];
    var classes = tileDom.className.split(" ");
    tile.num = Number(classes[1].slice(5));
    var a_pos = classes[2].slice(14).split("-");
    tile.x = a_pos[0] - 1;
    tile.y = a_pos[1] - 1;
    tile.merged = classes.length >= 4 && classes[3] == "tile-merged";
    tile.isNew  = classes.length >= 4 && classes[3] == "tile-new";
    map.tiles.push(tile);
  }
  // filter merged tiles
  for (var i = 0; i < map.tiles.length; i++){
    var tile = map.tiles[i];
    if (tile.merged) {
      for (var j = 0; j < map.tiles.length; j++){
        tile_ = map.tiles[j];
        if (tile.x == tile_.x && tile.y == tile_.y && !tile_.merged){
          map.tiles.splice(j, 1);
          j--;
        }
      }
    }
  }
  // Put tiles on the map
  for (var i = 0, l = map.tiles.length; i < l; i++){
    var tile = map.tiles[i];
    map[tile.y][tile.x] = tile;
  }

  return map;
};

Map.prototype.print = function() {
  for (var i = 0; i < 4; i++){
    s = ""
    for (var j = 0; j < 4; j++){
      var tile = this[i][j];
      if (tile) {
        s += tile.num;
        if (this[i][j].isNew) s += "new"
        else s += "   "
      } else {
        s += "0   "
      }
      s += ", ";
    }
    console.log(s);
  }
};

