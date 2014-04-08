var MinMax = function(){
  this.maxDepth = 6;
  this.depth = 0;
};

MinMax.prototype.turnMove = function (map) {
  if (this.depth == this.maxDepth) {
    return map.staticValue();
  }
  this.depth++;
  var directions = ["left", "down", "right", "up"];
  var max = 0;
  for (var i = 0, len = directions.length; i < len; i++){
    var _map = map.clone();
    var moved = _map['move'+directions[i]]();
    if (moved) {
      var val = this.turnPut(_map);
    } else {
      var val = 0;
    }
    if (val > max) {
      max = val;
    }
    if (i == len - 2 && max != 0){
      break;
    }
  }
  this.depth--;
  return max;
};

MinMax.prototype.turnPut = function (map) {
  if (this.depth == this.maxDepth) return map.staticValue();
  this.depth++;
  var size = map.size;
  var min = map.maxValue();
  for (var i = 0; i < size; i++){
    for (var j = 0; j < size; j++){
      if (map[i][j] == null){
        var _map = map.clone();
        _map.putTile(j, i);
        var val = this.turnMove(_map);
        if (val < min) {
          min = val;
        }
      }
    }
  }
  this.depth--;
  return min;
};

MinMax.prototype.predicate = function(map){
  var max = 0;
  var maxindex = 0;
  var directions = ["left", "down", "right", "up"];
  var max = 0;
  var maxindex = 0;
  this.depth = 0;
  for (var i = 0, len = directions.length; i < len; i++){
    var _map = map.clone();
    var moved = _map['move'+directions[i]]();
    var val = 0;
    if (moved){
      val = this.turnMove(_map);
    } else {
      val = 0;
    }
    if (val > max) {
      max = val;
      maxindex = i;
    }
    if (i == len - 2 && max != 0) break;
  }
  return directions[maxindex];
};

