var MinMax = function(){
  this.maxDepth = 4;
  this.depth = 0;
};

MinMax.prototype.turnMove = function (map) {
  if (this.depth == this.maxDepth) {
    return map.staticValue();
  }
  this.depth--;
  var directions = ["up", "left", "down", "right"];
  var max = 0;
  for (var i = 0, len = directions.length; i < len; i++){
    var _map = map.clone();
    _map['move'+directions[i]]();
    var val = this.turnPut(_map);
    if (val > max) {
      max = val;
    }
  }
  this.depth++;
  return max;
};

MinMax.prototype.turnPut = function (map) {
  if (this.depth == this.maxDepth) return map.staticValue();
  var size = map.size;
  var min = map.maxValue();
  for (var i = 0; i < size; i++){
    for (var j = 0; j < size; j++){
      if (this[i][j] == null){
        var _map = map.clone();
        _map.putTile(j, i);
        var val = turnMove(_map);
        if (val < min) {
          min = val;
        }
      }
    }
  }
  return min;
};

MinMax.prototype.predicate = function(){
  var max = 0;
  var maxindex = 0;
  var directions = ["up", "left", "down", "right"];
  var max = 0;
  var maxindex = 0;
  for (var i = 0, len = directions.length; i < len; i++){
    var _map = map.clone();
    _map['move'+directions[i]]();
    var val = this.turnPut(_map);
    if (val > max) {
      max = val;
      maxindex = i;
    }
  }
  return directions[maxindex];
};