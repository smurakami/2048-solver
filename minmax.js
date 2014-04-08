var MinMax = function(){
  this.maxDepth = 4;
  this.depth = 0;
};

MinMax.prototype.turnMove = function (map) {
  if (this.depth == this.maxDepth) {
    return map.staticValue();
  }

};

MinMax.prototype.turnPut = function (map) {

};