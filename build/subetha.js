(function(global){
    var s = global.subetha = {};
    var _modules = {};

    s.getFunctionName = getFunctionName;
    function getFunctionName(fun){
        var nameReg = new RegExp('\\s([_\\w\\d]+)\\s?\\(');
        if(typeof fun == 'function')
        {
            if(typeof fun.name == 'string'){
                return (getFunctionName = function(){return fun.name;})();
            }
            return (getFunctionName = function(){
                return fun.toString().match(nameReg)[1];
            })();
        }
        return false;
    }

    s.getModule = getModule;
    function getModule(modName){
        if(_modules[modName].__instance__ == null){
            _modules[modName].__instance__ = new (_modules[modName])();
        }
        return _modules[modName].__instance__;
    }

    (function(){
        var ATTACH_EVENT = !(typeof global['attachEvent'] == 'undefined'),
            ADD_EVENT_LISTENER = !(typeof global['addEventListener'] == 'undefined');
        function Event(){
            this.instanciado = true;
        }
        function addEvent(name, target, cb, opts){
                opts = opts || {};

                if(ADD_EVENT_LISTENER){
                    (addEvent = function(name, target, cb, opts){
                        target.addEventListener(name, cb, false);
                    })(name, target, cb, opts);
                }
                else if(ATTACH_EVENT){
                    (addEvent = function(name, target, cb, opts){
                        target.attachEvent('on' + name, cb);
                    })(name, target, cb, opts);
                }
            }
            Event.prototype = {addEvent: addEvent};
        Event.__instance__ = null;
        _modules['event'] = Event;
    })();

    for(var m in _modules){
        for(var f in _modules[m]['prototype']){
            s[m] = {}; s[m][f] = function(){ s[m] = s.getModule(m); return (s[m][f])();  };
        }
    }

})(this);
