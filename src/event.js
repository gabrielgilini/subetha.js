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