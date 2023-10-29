'use strict';

(function () {
    let colors = ["rgb(101, 137, 164)", "rgb(241, 43, 107)", "rgb(146, 100, 161)", "rgb(56, 159, 117)", "rgb(215, 210, 55)", "rgb(0, 0, 0)"];
    let eyesColors = ["black", "red", "blue", "yellow", "green"]; 
    let fireBallColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

    let wizardCoat = document.querySelector('.wizard-coat');
    let wizardEyes = document.querySelector('.wizard-eyes');
    let wizardFireBall = document.querySelector('.setup-fireball-wrap');

    let newCoatColor = 'rgb(101, 137, 164)';
    let newEyesColor = 'black';
    let newFireballColor = '#ee4830';

    window.colorize = {
        getRank: function(wizard) {
            let rank = 0;

        if (wizard.colorCoat === newCoatColor) {
            rank += 3;
        }
        if (wizard.colorEyes === newEyesColor) {
            rank += 2;
        }
        if (wizard.colorFireball === newFireballColor) {
            rank += 1;
        }

        return rank;
        }
    };

    function changeCoatColor(){
        let color = window.utils.getRandomElementFromArray(colors);
        wizardCoat.style.fill = color;
        document.querySelector('input[name=coat-color]').value = color;
        newCoatColor = color;
        window.debounce(window.setup.updateWizards());
    };

    function changeFireBallColor(){
        let color = window.utils.getRandomElementFromArray(fireBallColors);
        wizardFireBall.style.backgroundColor = color;
        document.querySelector('input[name=fireball-color]').value = color;
        newFireballColor = color;
        window.debounce(window.setup.updateWizards());
    };

    function changeEyesColor(){
        let color = window.utils.getRandomElementFromArray(eyesColors);
        wizardEyes.style.fill = color;
        document.querySelector('input[name=eyes-color]').value = color;
        newEyesColor = color;
        window.setup.updateWizards();
    };

    wizardCoat.addEventListener('click', changeCoatColor);
    wizardEyes.addEventListener('click', changeEyesColor);
    wizardFireBall.addEventListener('click', changeFireBallColor);
})();