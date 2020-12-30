// 1) Паровозик, ездит влево-вправо. Делаем 2 кнопки: влево и вправо, работает от мышки и от клавиш на клавиатуре влево-вправо.
// 2) +кнопка вкл/вкл ( на клавиатуре F ) фонарик на паровозе, на кнопке отображения состояние.

const mainEl = document.querySelector('.train');
const buttonLeft = document.querySelector('.btn-left');
const buttonRight = document.querySelector('.btn-right');
const buttonLight = document.querySelector('.btn-light');
const trainLight = document.querySelector('.light-off');

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

const revFunc = () => {
    mainEl.style.left = getComputedStyle(mainEl).left;
    mainEl.classList.add('drive-reverse');
    mainEl.classList.remove('drive-forward');
    mainEl.style.animationPlayState = 'running';
    let distance = parseInt(getComputedStyle(mainEl).left, 10);
    let time = `${distance*2/475}s`;
    mainEl.style.animationDuration = time;
    console.log(time);
};

const forwFunc = () => {
    mainEl.style.left = getComputedStyle(mainEl).left;
    mainEl.classList.remove('drive-reverse');
    mainEl.classList.add('drive-forward');
    mainEl.style.animationPlayState = 'running';
    let distance = 475 - parseInt(getComputedStyle(mainEl).left, 10);
    let time = `${distance*2/475}s`;
    mainEl.style.animationDuration = time;
    console.log(time);
};

buttonRight.addEventListener('click', () => {
    if (mainEl.classList.contains('drive-forward')) {
        if (mainEl.style.animationPlayState === 'paused' || getComputedStyle(mainEl).animationPlayState === 'paused') {
            mainEl.style.animationPlayState = 'running';
        } else {
            mainEl.style.animationPlayState = 'paused';
        }
    } else if (mainEl.classList.contains('drive-reverse')) {
        forwFunc();
    }
});

buttonLeft.addEventListener('click', () => {
    if (mainEl.classList.contains('drive-forward')) {
        revFunc();
    } else if (mainEl.classList.contains('drive-reverse')) {
        if (mainEl.style.animationPlayState === 'paused' || getComputedStyle(mainEl).animationPlayState === 'paused') {
            mainEl.style.animationPlayState = 'running';
        } else {
            mainEl.style.animationPlayState = 'paused';
        }
    }
});

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'KeyF':
            console.log('FFF');
            changeColor();
            break;
        case 'ArrowLeft':
            if (mainEl.classList.contains('drive-forward')) {
                revFunc();
            } else if (mainEl.classList.contains('drive-reverse')) {
                if (mainEl.style.animationPlayState === 'paused' || getComputedStyle(mainEl).animationPlayState === 'paused') {
                    mainEl.style.animationPlayState = 'running';
                } else {
                    mainEl.style.animationPlayState = 'paused';
                }
            }
            break;
        case 'ArrowRight':
            if (mainEl.classList.contains('drive-forward')) {
                if (mainEl.style.animationPlayState === 'paused' || getComputedStyle(mainEl).animationPlayState === 'paused') {
                    mainEl.style.animationPlayState = 'running';
                } else {
                    mainEl.style.animationPlayState = 'paused';
                }
            } else if (mainEl.classList.contains('drive-reverse')) {
                forwFunc();
            }
            break;
    }
});