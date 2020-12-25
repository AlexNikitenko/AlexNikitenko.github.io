// 1) Паровозик, ездит влево-вправо. Делаем 2 кнопки: влево и вправо, работает от мышки и от клавиш на клавиатуре влево-вправо.
// 2) +кнопка вкл/вкл ( на клавиатуре F ) фонарик на паровозе, на кнопке отображения состояние.

const mainEl = document.querySelector('.train');
const buttonLeft = document.querySelector('.btn-left');
const buttonRight = document.querySelector('.btn-right');
const buttonLight = document.querySelector('.btn-light');
const trainLight = document.querySelector('.light-off');

mainEl.style.left = getComputedStyle(mainEl).left;


const changeColor = () => {
    trainLight.classList.toggle('light-off');
    trainLight.classList.toggle('light-on');
    if (buttonLight.innerText === 'Light Off') {
        buttonLight.innerText = 'Light On';
    } else {
        buttonLight.innerText = 'Light Off';
    }
};

buttonLight.addEventListener('click', changeColor);

buttonRight.addEventListener('click', () => {
    if (mainEl.style.animationPlayState === 'paused' || getComputedStyle(mainEl).animationPlayState === 'paused') {
        mainEl.style.animationPlayState = 'running';
    } else {
        mainEl.style.animationPlayState = 'paused';
    }
    let distance = 630 - parseInt(getComputedStyle(mainEl).left, 10);
    let time = `${distance / 126}s`;
    mainEl.style.animationDuration = time;
    console.log(distance);
    mainEl.classList.add('drive-forward');
    mainEl.classList.remove('drive-reverse');
    mainEl.style.left = getComputedStyle(mainEl).left;

});

buttonLeft.addEventListener('click', () => {
    if (mainEl.style.animationPlayState === 'paused' || getComputedStyle(mainEl).animationPlayState === 'paused') {
        mainEl.style.animationPlayState = 'running';
    } else {
        mainEl.style.animationPlayState = 'paused';
    }
    let distance = parseInt(getComputedStyle(mainEl).left, 10);
    let time = `${distance / 126}s`;
    mainEl.style.animationDuration = time;
    mainEl.classList.remove('drive-forward');
    mainEl.classList.add('drive-reverse');
    mainEl.style.left = getComputedStyle(mainEl).left;

});


document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyF':
            console.log('FFF');
            changeColor();
            break;
        case 'ArrowLeft':
            mainEl.style.left = getComputedStyle(mainEl).left;
            let distance1 = parseInt(getComputedStyle(mainEl).left, 10);
            let time1 = `${distance1 / 126}s`;
            mainEl.style.animationDuration = time1;
            if (mainEl.style.animationPlayState === 'paused' || getComputedStyle(mainEl).animationPlayState === 'paused') {
                mainEl.style.animationPlayState = 'running';
            } else {
                mainEl.style.animationPlayState = 'paused';
            }
            mainEl.classList.remove('drive-forward');
            mainEl.classList.add('drive-reverse');
            break;
        case 'ArrowRight':
            mainEl.style.left = getComputedStyle(mainEl).left;
            if (mainEl.style.animationPlayState === 'paused' || getComputedStyle(mainEl).animationPlayState === 'paused') {
                mainEl.style.animationPlayState = 'running';
            } else {
                mainEl.style.animationPlayState = 'paused';
            }
            let distance2 = 630 - parseInt(getComputedStyle(mainEl).left, 10);
            let time2 = `${distance2 / 126}s`;
            mainEl.style.animationDuration = time2;
            console.log(distance2);
            mainEl.classList.add('drive-forward');
            mainEl.classList.remove('drive-reverse');
            break;
    }
});