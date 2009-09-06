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