// 1) Паровозик, ездит влево-вправо. Делаем 2 кнопки: влево и вправо, работает от мышки и от клавиш на клавиатуре влево-вправо.
// 2) +кнопка вкл/вкл ( на клавиатуре F ) фонарик на паровозе, на кнопке отображения состояние.

const mainEl = document.querySelector('.train');
const buttonLeft = document.querySelector('.btn-left');
const buttonRight = document.querySelector('.btn-right');
const buttonLight = document.querySelector('.btn-light');
const trainLight = document.querySelector('.light-off');

let clickLeftCount = 0;

const changeColor = () => {
    trainLight.classList.toggle('light-off');
    trainLight.classList.toggle('light-on');
    if (buttonLight.innerText === 'Light Off') {
        buttonLight.innerText = 'Light On';
    } else {
        buttonLight.innerText = 'Light Off';
    }
};

const revFunc = () => {
    mainEl.style.left = getComputedStyle(mainEl).left;
    mainEl.classList.remove('drive-forward');
    mainEl.classList.add('drive-reverse');
    mainEl.style.animationPlayState = 'running';

    let distance = parseInt(getComputedStyle(mainEl).left, 1);
    let time = `${distance / 315}s`;
    mainEl.style.animationDuration = time;

};

buttonLight.addEventListener('click', changeColor);

buttonRight.addEventListener('click', () => {
    // mainEl.style.left = 0;


    if (mainEl.style.animationPlayState === 'paused' || getComputedStyle(mainEl).animationPlayState === 'paused') {
        mainEl.style.animationPlayState = 'running';
        // mainEl.style.left = getComputedStyle(mainEl).left
        mainEl.classList.add('drive-forward');
        mainEl.classList.remove('drive-reverse');

    } else {
        mainEl.style.animationPlayState = 'paused';
    }
    let distance = 630 - parseInt(getComputedStyle(mainEl).left, 1);
    let time = `${distance / 315}s`;
    mainEl.style.animationDuration = time;
});

// buttonLeft.addEventListener('click', () => {
//     mainEl.style.left = getComputedStyle(mainEl).left;
//     mainEl.classList.remove('drive-forward');
//     mainEl.classList.add('drive-reverse');
//     // mainEl.style.animationPlayState = 'running';
//     clickCount = clickCount + 1;
//     if (clickCount > 1) {
//         mainEl.style.animationPlayState = 'paused';
//         clickCount = 0;
//     }

//     let distance = parseInt(getComputedStyle(mainEl).left, 1);
//     let time = `${distance / 315}s`;
//     mainEl.style.animationDuration = time;

// });

buttonLeft.addEventListener('click', () => {

    if (clickLeftCount >= 1) {
        mainEl.style.animationPlayState = 'paused';
        clickLeftCount = 0;

    } else {
        mainEl.style.left = getComputedStyle(mainEl).left;
        mainEl.classList.remove('drive-forward');
        mainEl.classList.add('drive-reverse');
        mainEl.style.animationPlayState = 'running';
        clickLeftCount = clickLeftCount + 1;
        let distance = parseInt(getComputedStyle(mainEl).left, 1);
        let time = `${distance / 315}s`;
        mainEl.style.animationDuration = time;
    }



});


// buttonLeft.addEventListener('click', revFunc);




document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyF':
            console.log('FFF');
            changeColor();
            break;
        case 'ArrowLeft':
            if (clickLeftCount >= 1) {
                mainEl.style.animationPlayState = 'paused';
                clickLeftCount = 0;

            } else {
                mainEl.style.left = getComputedStyle(mainEl).left;
                mainEl.classList.remove('drive-forward');
                mainEl.classList.add('drive-reverse');
                mainEl.style.animationPlayState = 'running';
                clickLeftCount = clickLeftCount + 1;
                let distance = parseInt(getComputedStyle(mainEl).left, 1);
                let time = `${distance / 315}s`;
                mainEl.style.animationDuration = time;
            }
            break;
        case 'ArrowRight':
            if (mainEl.style.animationPlayState === 'paused' || getComputedStyle(mainEl).animationPlayState === 'paused') {
                mainEl.style.animationPlayState = 'running';
                mainEl.classList.add('drive-forward');
                mainEl.classList.remove('drive-reverse');

            } else {
                mainEl.style.animationPlayState = 'paused';
            }
            let distance = 630 - parseInt(getComputedStyle(mainEl).left, 1);
            let time = `${distance / 315}s`;
            mainEl.style.animationDuration = time;
            break;
    }
});