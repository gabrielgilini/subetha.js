(function(global){
    var s = global.subetha = {};

    function getFunctionName(fun){
        var nameReg = new RegExp('\\s([_\\w\\d]+)\\s?\\(');
        if(typeof fun.name == 'string'){
            return (getFunctionName = function(){return fun.name;})();
        }
        return (getFunctionName = function(){
            return fun.toString().match(nameReg)[1];
        })();
    }

    s.getFunctionName = getFunctionName;
})(this);
