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
