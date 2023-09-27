var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var userDialog = document.querySelector('.setup');
var fragment = document.createDocumentFragment();
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var setupForm = document.querySelector('.setup-wizard-form');
var setupSubmit = setupForm.querySelector('.setup-submit'); 
var wizardCoat = document.querySelector('.wizard-coat');
var wizardEyes = document.querySelector('.wizard-eyes');
var wizardFireBall = document.querySelector('.setup-fireball-wrap');
var pressElement = null;

function onPopupEscPress(evt){
    if (evt.keyCode === ESC_KEYCODE){
        pressElement = evt.target;
        if (pressElement !== document.querySelector('.setup-user-name')){
            closePopup();
        }
    }
}

function onPopupEnterPress(evt){
    if (evt.keyCode === ENTER_KEYCODE){
        setupForm.submit();
    }
}

function changeCoatColor(){
    var color = getRandomElementFromArray(colors);
    wizardCoat.style.fill = color;
    document.querySelector('input[name=coat-color]').value = color;
}

function changeFireBallColor(){
    var color = getRandomElementFromArray(colors);
    wizardFireBall.style.backgroundColor = color;
    document.querySelector('input[name=fireball-color]').value = color;
}

function changeEyesColor(){
    var color = getRandomElementFromArray(colors);
    wizardEyes.style.fill = color;
    document.querySelector('input[name=eyes-color]').value = color;
}

function openPopup(){
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    document.addEventListener('keydown', onPopupEnterPress);
}

function closePopup(){
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress); 
    document.removeEventListener('keydown', onPopupEnterPress); 
}

setupOpen.addEventListener('click', function() {
    openPopup();
});

setupOpen.addEventListener('keydown', function(evt){
    if (evt.keyCode === ENTER_KEYCODE){
        openPopup();
    }
});

setupClose.addEventListener('click', function() {
    closePopup();
});

setupClose.addEventListener('keydown', function(evt){
    if (evt.keyCode === ENTER_KEYCODE){
        closePopup();
    }
});

// setupSubmit.addEventListener('click', function(){
//     setupForm.submit();
// });


wizardCoat.addEventListener('click', changeCoatColor);
wizardEyes.addEventListener('click', changeEyesColor);
wizardFireBall.addEventListener('click', changeFireBallColor);

var names = ["Иван", "Хуан Себастьян", "Мария", "Крифстоф", "Виктор", "Юлия", "Люпита", "Вашингтон"];
var surnames = ["да Марья", "Верон", "Мирабелла", "Вальц", "Онопко", "Топольницкая", "Нионго", "Ирвин"];
var colors = ["rgb(101, 137, 164)", "rgb(241, 43, 107)", "rgb(146, 100, 161)", "rgb(56, 159, 117)", "rgb(215, 210, 55)", "rgb(0, 0, 0)"];
var eyesColors = ["black", "red", "blue", "yellow", "green"]; 
var fireBallColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

function getRandomElementFromArray(array){
    var index = Math.floor(Math.random() * array.length);

    return array[index];
}

function ArrGenerate(n){

    var arr = [n];

    for (var i = 0; i < n; i++){
        arr[i] = {
            name: getRandomElementFromArray(names) + ' ' + getRandomElementFromArray(surnames),
            coatColor: getRandomElementFromArray(colors),
            eyesColor: getRandomElementFromArray(eyesColors)
        };
    }

    return arr;
}

function RenderWizard(wizard){
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
}

function FillIn(wizards){
    for (var i = 0; i < wizards.length; i++){
        fragment.appendChild(RenderWizard(wizards[i]));
        similarListElement.appendChild(fragment);
    }
}

var wizards = ArrGenerate(4);
FillIn(wizards);
// userDialog.classList.remove('hidden');
userDialog.querySelector('.setup-similar').classList.remove('hidden');



