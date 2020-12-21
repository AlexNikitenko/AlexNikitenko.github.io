// 1) Паровозик, ездит влево-вправо. Делаем 2 кнопки: влево и вправо, работает от мышки и от клавиш на клавиатуре влево-вправо.
// 2) +кнопка вкл/вкл ( на клавиатуре F ) фонарик на паровозе, на кнопке отображения состояние.

const mainEl = document.querySelector('.train');
const buttonLeft = document.querySelector('.btn-left');
const buttonRight = document.querySelector('.btn-right');
const buttonLight = document.querySelector('.btn-light');
const trainLight = document.querySelector('.light');

buttonLight.addEventListener('click', () => {
    trainLight.classList.toggle('light-on');
    if (buttonLight.innerText === 'Light Off') {
        buttonLight.innerText = 'Light On';
    } else {
        buttonLight.innerText = 'Light Off';
    }

})

document.addEventListener('keydown', (event) => {
    if (event.code == 'KeyF') {
        trainLight.classList.toggle('light-on');
        if (buttonLight.innerText === 'Light Off') {
            buttonLight.innerText = 'Light On';
        } else {
            buttonLight.innerText = 'Light Off';
        }
    }

})

buttonLeft.addEventListener('click', () => {
    mainEl.classList.toggle('drive-forward');
    if (mainEl.getElementsByClassName.animationPlayState === 'paused') {
        mainEl.getElementsByClassName.animationPlayState = 'running';
    } else {
        mainEl.getElementsByClassName.animationPlayState = 'paused';
    }
})

document.addEventListener('keydown', (event) => {
    if (event.code == 'ArrowLeft') {
        mainEl.classList.toggle('drive-forward');
        if (mainEl.getElementsByClassName.animationPlayState === 'paused') {
            mainEl.getElementsByClassName.animationPlayState = 'running';
        } else {
            mainEl.getElementsByClassName.animationPlayState = 'paused';
        }
    }
})

buttonRight.addEventListener('click', () => {
    mainEl.classList.toggle('drive-backward');
    if (mainEl.getElementsByClassName.animationPlayState === 'paused') {
        mainEl.getElementsByClassName.animationPlayState = 'running';
    } else {
        mainEl.getElementsByClassName.animationPlayState = 'paused';
    }
})

document.addEventListener('keydown', (event) => {
    if (event.code == 'ArrowRight') {
        mainEl.classList.toggle('drive-backward');
        if (mainEl.getElementsByClassName.animationPlayState === 'paused') {
            mainEl.getElementsByClassName.animationPlayState = 'running';
        } else {
            mainEl.getElementsByClassName.animationPlayState = 'paused';
        }
    }
})