'use strict';

(function () {
    let userDialog = document.querySelector('.setup');
    let setupOpen = document.querySelector('.setup-open');
    let setupClose = userDialog.querySelector('.setup-close');
    let dialogHandler = userDialog.querySelector('input[name=avatar]');
    let setupForm = document.querySelector('.setup-wizard-form');
    let pressElement = null;

    userDialog.querySelector('.setup-similar').classList.remove('hidden');

    //Обработка событий открытия и закрытия диалогового окна
    function onPopupEscPress(evt){
        if (window.utils.isEscKeycode){
            pressElement = evt.target;
            if (pressElement !== document.querySelector('.setup-user-name')){
                closePopup();
            }
        }
    };
    
    function onPopupEnterPress(){
        if (window.utils.isEnterKeycode){
            setupForm.submit();
        }
    };

    function openPopup(){
        userDialog.classList.remove('hidden');

        document.addEventListener('keydown', onPopupEscPress);
        document.addEventListener('keydown', onPopupEnterPress);
    };
    
    function closePopup(){
        userDialog.classList.add('hidden');

        document.removeEventListener('keydown', onPopupEscPress); 
        document.removeEventListener('keydown', onPopupEnterPress); 
        
        userDialog.style.top = '80px';
        userDialog.style.left = '50%';
    };

    setupOpen.addEventListener('click', function() {
        openPopup();
    });
    
    setupOpen.addEventListener('keydown', function(evt){
        if (window.utils.isEnterKeycode){
            openPopup();
        }
    });
    
    setupClose.addEventListener('click', function() {
        closePopup();
    });
    
    setupClose.addEventListener('keydown', function(evt){
        if (window.utils.isEnterKeycode){
            closePopup();
        }
    });

    //Перемещение диалогового окна
    dialogHandler.addEventListener('mousedown', function(evt){
        evt.preventDefault();
    
        let startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };
    
        let dragged = false;
    
        function onMouseMove(moveEvt){
            moveEvt.preventDefault();
            dragged = true;
        
            let shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };
        
            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };
        
            userDialog.style.top = (userDialog.offsetTop - shift.y) + 'px';
            userDialog.style.left = (userDialog.offsetLeft - shift.x) + 'px';
        };
    
        function onMouseUp(upEvt){
            upEvt.preventDefault();
    
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
    
            if (dragged){
                function onClickPreventDefault(evt){
                    evt.preventDefault();
                    dialogHandler.removeEventListener('click', onClickPreventDefault);
                };
                dialogHandler.addEventListener('click', onClickPreventDefault);
            }
        };
    
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    });  
})();