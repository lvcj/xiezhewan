//let something
(function (something) {
    something.foo = 123;
})(something || (something = {}));
//console.log(something)
var Utils;
(function (Utils) {
    function log(msg) {
        console.log(msg);
    }
    Utils.log = log;
    function error(msg) {
        console.error(msg);
    }
    Utils.error = error;
})(Utils || (Utils = {}));
Utils.log('call me');
Utils.error('maybe');
