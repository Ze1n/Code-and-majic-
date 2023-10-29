'use strict';

(function () {
    let setupForm = document.querySelector('.setup-wizard-form');
    let setupSubmit = setupForm.querySelector('.setup-submit');
    let similarListElement = document.querySelector('.setup-similar-list');
    let similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item'); 
    let wizardsData = [];
    let count = 0;

    setupForm.addEventListener('submit', function(evt){
        evt.preventDefault();
        window.upload(new FormData(setupForm), function (response){
            document.querySelector('.setup').classList.add('hidden');
        }, errorHandler);
    });

    setupSubmit.addEventListener('click', function(){
        setupForm.submit();
    });

    window.setup = {
        updateWizards: function() {
            render(wizardsData.slice().sort(function(left, right){
                let rankDiff = window.colorize.getRank(right) - window.colorize.getRank(left);
    
                if (rankDiff === 0) {
                    rankDiff = namesComparator(left.name, right.name);
                }
    
                return rankDiff;
            }));
        }
    };

    function RenderWizard(wizard){
        let wizardElement = similarWizardTemplate.cloneNode(true);
        wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
        wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
        wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

        return wizardElement;
    };

    function render(wizards){
        let fragment = document.createDocumentFragment();
        
        if (count){
            for (let i = 0; i < 4; i++){
                document.querySelector('.setup-similar-list').removeChild(document.querySelector('.setup-similar-item'));
            } 
        }

        for (let i = 0; i < 4; i++){
            fragment.appendChild(RenderWizard(wizards[i]));
        }

        similarListElement.appendChild(fragment);
        count++;
    };

    function namesComparator(left, right) {
        if (left > right) {
            return 1;
        }
        else if (left < right) {
            return -1;
        }

        return 0;
    };

    function successHandler(wizards){
        wizardsData = wizards;

        window.setup.updateWizards(wizardsData);

        document.querySelector('.setup-similar').classList.remove('hidden');
    };

    function errorHandler(errorMessage){
        alert(errorMessage);
    };

    window.load(successHandler, errorHandler);
})();