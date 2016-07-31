/**
 * Created by boot on 7/31/16.
 */
function Scope() {

}

Scope.GLOBAL = new Scope();
Scope.GLOBAL.toString = function() { return 'GLOBAL'};
Scope.ELIGIBLE = new Scope();
Scope.ELIGIBLE.toString = function() { return 'ELIGIBLE'}
Scope.CAN_BUY = new Scope();
Scope.CAN_BUY.toString = function(){ return 'CAN_BUY'};
Scope.NONE = new Scope();
Scope.NONE.toString = function() { return 'NONE'};

Scope.parse = function(name) { return Scope[name];}

module.exports = Scope;