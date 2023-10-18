'use strict';

(function () {
    let setupForm = document.querySelector('.setup-wizard-form');
    let setupSubmit = setupForm.querySelector('.setup-submit');
    let similarListElement = document.querySelector('.setup-similar-list');
    let similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'); 

    setupForm.addEventListener('submit', function(evt){
        evt.preventDefault();
        window.upload(new FormData(setupForm), function (response){
            document.querySelector('.setup').classList.add('hidden');
        }, errorHandler);
    });

    setupSubmit.addEventListener('click', function(){
        setupForm.submit();
    });

    function RenderWizard(wizard){
        let wizardElement = similarWizardTemplate.cloneNode(true);
        wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
        wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
        wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

        return wizardElement;
    };

    function successHandler(wizards){
        let fragment = document.createDocumentFragment();

        for (let i = 0; i < 4; i++){
            fragment.appendChild(RenderWizard(wizards[i]));
        }
        similarListElement.appendChild(fragment);

        document.querySelector('.setup-similar').classList.remove('hidden');
    };

    function errorHandler(errorMessage){
        alert(errorMessage);
    };

    load(successHandler, errorHandler);
})();