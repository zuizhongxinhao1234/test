/*
 * timeout服务
 *
 * */
app.factory('timer', ['$timeout',
    function($timeout) {
        var tObjs = {};

        var timer = function(code, millisec, name) {
            if (!angular.isDefined(name)) return false;
            tObjs[name] = setTimeout(code, millisec);
            return tObjs[name];
        };

        timer.kill = function(name) {
            if (!angular.isDefined(tObjs[name])) return false;
            clearTimeout(tObjs[name]);
            delete tObjs[name];
            return true;
        };

        timer.killAll = function() {
            for (var i in tObjs) {
                clearTimeout(tObjs[i]);
                delete tObjs[i];
            }
        };
        return timer;
    }

]);