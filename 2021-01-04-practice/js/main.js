const mainField = document.querySelector('.main');
const redLight = document.querySelector('.light-red');
const yellowLight = document.querySelector('.light-yellow');
const greenLight = document.querySelector('.light-green');
const redBtn = document.querySelector('.btn-red');
const yellowBtn = document.querySelector('.btn-yellow');
const greenBtn = document.querySelector('.btn-green');

redBtn.addEventListener('click', () => {
    redLight.classList.add('red');
    yellowLight.classList.remove('yellow');
    greenLight.classList.remove('green');
})

yellowBtn.addEventListener('click', () => {
    yellowLight.classList.add('yellow');
    greenLight.classList.remove('green');
    redLight.classList.remove('red');
})

greenBtn.addEventListener('click', () => {
    greenLight.classList.add('green');
    yellowLight.classList.remove('yellow');
    redLight.classList.remove('red');
})