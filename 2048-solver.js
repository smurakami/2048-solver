
var Map = function(){
  for (var i = 0; i < 4; i++) {
    this[i] = [0, 0, 0, 0];
  }
};

Map.prototype = new Array();

var getTileMap = function () {
  // Initialize
  var map = new Map();
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

  printMap(map);

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
