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
            revFunc();
            break;
        case 'ArrowRight':
            if (mainEl.style.animationPlayState === 'paused' || getComputedStyle(mainEl).animationPlayState === 'paused') {
                mainEl.style.animationPlayState = 'running';

            } else {
                mainEl.style.animationPlayState = 'paused';
            }
            mainEl.classList.add('drive-forward');
            mainEl.classList.remove('drive-reverse');
            let distance = 630 - parseInt(getComputedStyle(mainEl).left, 1);
            let time = `${distance / 315}s`;
            mainEl.style.animationDuration = time;
            break;
    }
});

// const side = 5;
// // const arr = [];


const genArr = (side) => {
    let arr = [];
    for (let i = 0; i < side; i++) {
        let arrIn = [];
        for (let j = 0; j < side; j++) {
            arrIn[j] = 0;
            arr[i] = arrIn;
        }
    }
    return arr;
};

let arr1 = genArr(5);

const clearArr = (array) => {
    array.forEach((item, index, array) => {
        for (let i = 0; i < array.length; i++) {
            item[index] = null;
            array[i] = item;
        }
    })
    return array;
};

console.log(clearArr(arr1));

let arr2 = [
    [12, 3, 41],
    [1, null, 3],
    [0, null, 2]
];


const countFilledCells = (array) => {
    let count = 0;
    array.forEach((item, index, array) => {
        for (let i = 0; i < array.length; i++) {
            item[i] ? count = (count + 1) : false;
        }
    })
    return count;
}

// const countFilledCells = (array) => {
//     let count = 0;
//     array.forEach((item, index) => item[index] ? count = (count + 1) : false);
//     // return count;
//     console.log(array.forEach((item, index) => item[index] ? count = (count + 1) : false))
// }



console.log(countFilledCells(arr2));