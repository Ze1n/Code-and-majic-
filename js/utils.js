'use strict';

(function () {
    const ENTER_KEYCODE = 13;
    const ESC_KEYCODE = 27;

    window.utils = {
        isEnterKeycode: function(evt){
            return evt.keyCode === ENTER_KEYCODE;
        },

        isEscKeycode: function(evt){
            return evt.keyCode === ESC_KEYCODE;
        },

        getRandomElementFromArray: function(array){
            let index = Math.floor(Math.random() * array.length);
            return array[index];
        }
    };
})();