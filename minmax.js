var MinMax = function(){
  this.maxDepth = 12;
  this.depth = 0;
};

MinMax.prototype.turnMove = function (map, alpha, beta) {
  if (this.depth == this.maxDepth) {
    return map.staticValue();
  }
  this.depth++;
  var directions = ["left", "down", "right", "up"];
  var max = 0;
  var anymove = false;
  for (var i = 0, len = directions.length; i < len; i++){
    var _map = map.clone();
    var moved = _map['move'+directions[i]]();
    if (moved) {
      var val = this.turnPut(_map, alpha, beta);
      anymove = true;
    } else {
      var val = 0;
    }
    if (val > alpha) {
      alpha = val;
    }
    if (alpha >= beta) {
      return beta;
    }
    if (i == len - 2 && anymove){
      break;
    }
  }
  this.depth--;
  return alpha;
};

MinMax.prototype.turnPut = function (map, alpha, beta) {
  if (this.depth == this.maxDepth) return map.staticValue();
  this.depth++;
  var size = map.size;
  // var beta = map.maxValue();
  for (var i = 0; i < size; i++){
    for (var j = 0; j < size; j++){
      if (map[i][j] == null){
        var _map = map.clone();
        _map.putTile(j, i);
        var val = this.turnMove(_map);
        if (val < beta) {
          beta = val;
        }
        if (beta <= alpha){
          return alpha;
        }
      }
    }
  }
  this.depth--;
  return beta;
};

MinMax.prototype.predicate = function(map){
  var directions = ["left", "down", "right", "up"];
  var max = 0;
  var maxindex = 0;
  var alpha = map.minValue();
  var beta  = map.maxValue();

  this.depth = 0;
  for (var i = 0, len = directions.length; i < len; i++){
    var _map = map.clone();
    var moved = _map['move'+directions[i]]();
    var val = 0;
    if (moved){
      val = this.turnMove(_map, alpha, beta);
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

