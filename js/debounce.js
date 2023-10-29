'use strict';

(function () {
    const DEBOUNCE_INTERVAL = 300;

    window.debounce = function (fun){
        let lastTimeout = null;

        return function(){
            let args = arguments;
            if (lastTimeout) {
                clearTimeout(lastTimeout);
            }
            lastTimeout = setTimeout(function(){
                fun.apply(null, args);
            }, DEBOUNCE_INTERVAL);
        };
    };
})();