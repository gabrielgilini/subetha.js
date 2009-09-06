(function(global){
    var s = global.subetha = {};
    var _modules = {};

    //= require "main.js"

    //= require "event.js"

    for(var m in _modules){
        for(var f in _modules[m]['prototype']){
            s[m] = {}; s[m][f] = function(){ s[m] = s.getModule(m); return (s[m][f])();  };
        }
    }

})(this);