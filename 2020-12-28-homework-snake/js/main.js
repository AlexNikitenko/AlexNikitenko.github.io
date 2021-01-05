const mainField = document.querySelector('.main');
const statusField = document.querySelector('.status');
const buttonUp = document.querySelector('.btn-up');
const buttonLeft = document.querySelector('.btn-left');
const buttonRight = document.querySelector('.btn-right');
const buttonDown = document.querySelector('.btn-down');
const mainTimer = document.querySelector('.timer');

let timerID;
let gameOverFlag = true;

// 1) cгенерируй 2м массив, константа сторона поля, например, равна 5.
const genArr = (side) => {
    let newArr = [];
    for (let i = 0; i < side; i++) {
        newArr[i] = [];
        for (let j = 0; j < side; j++) {
            newArr[i][j] = 1;
        }
    }
    return newArr;
}

let arr = genArr(5);

console.log(arr);

// 2) напиши функцию очистки массива, заполнить null

const arrFillZero = (array) => {
    array.forEach((el) => {
        el.fill(0);
    })
    return array;
}

console.log(arrFillZero(arr));

// 3) напиши функцию подсчета ненулевых(непустых) клеток во всём массиве

const countFilledCells = (array) => {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            count += array[i][j] ? 1 : 0;
        }
    }
    return count;
}

console.log('Count of not-null cells:', countFilledCells(arr));

// 4) отобрази на странице игровое поле(клетки массива) и строку статуса, 
// в которой будет написано количество ненулевых клеток. Нулевые клетки закрашены 
// белым цветом. (render)

// 7) на игровом поле сделать отображение следа на клетках после курсора оранжевым 
// цветом. В соответствующих ячейках массива где след писать "2". След весь от
// начала игры.

const render = (array) => {
    let str = '';
    array.forEach(el1 => {
        el1.forEach(el2 => {
            if (el2 === 1) {
                str = `${str}<div class="cell blue"></div>`;
            } else if (el2 === 2) {
                str = `${str}<div class="cell orange"></div>`;
            } else {
                str = `${str}<div class="cell"></div>`;
            }
        })
    })
    mainField.innerHTML = str;
    statusField.innerHTML = 'Moves done: ' + countFilledCells(array);
};


let posOne = [0, 0];
arr[posOne[0]][posOne[1]] = 1;
buttonLeft.disabled = true;
buttonUp.disabled = true;
render(arr);
// 5) покажи на странице 4 html кнопки-стрелки: "вверх", "вниз", "влево", "вправо"
// 6) сделай управление мышкой и клавиатурой, там где находится курсор (курсор- это 
//   любая клетка поля), закрашиваем клетку синим цветом. Первоначальное положение 
//   курсора в левом верхнем углу. В массиве, в соответствующую ячейку писать "1". 
//   Уход с клетки возвращает значение null;

const shift = (x, y, array) => {
    if (gameOverFlag === true) {
        array[posOne[0]][posOne[1]] = 2;
        posOne = [posOne[0] + x, posOne[1] + y];
        array[posOne[0]][posOne[1]] = 1;
        countFilledCells(array);
        render(array);
        getOffButtons(array);
        gameOver(array);
        runTimer(10);
    }
};

const shiftDown = () => {
    shift(1, 0, arr);
}

const shiftUp = () => {
    shift(-1, 0, arr);
}

const shiftLeft = () => {
    shift(0, -1, arr);
}

const shiftRight = () => {
    shift(0, 1, arr);
}

buttonUp.addEventListener('click', shiftUp);
buttonLeft.addEventListener('click', shiftLeft);
buttonRight.addEventListener('click', shiftRight);
buttonDown.addEventListener('click', shiftDown);

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowLeft':
            if (buttonLeft.disabled == false) {
                shiftLeft();
            }
            break;
        case 'ArrowRight':
            if (buttonRight.disabled == false) {
                shiftRight();
            }
            break;
        case 'ArrowDown':
            if (buttonDown.disabled == false) {
                shiftDown();
            }
            break;
        case 'ArrowUp':
            if (buttonUp.disabled == false) {
                shiftUp();
            }
            break;
    }
});

// 8) сделай отключение соответствующих кнопок управления, если курсор с краю поля 
// или наступает на свой след.

const getOffButtons = (array) => {
    if (((posOne[0] === 0) && (posOne[1] === 0)) || //Отключаем кнопку Left в позиции 0,0
        ((posOne[0] === array.length - 1) && (posOne[1] === 0)) || //Отключаем кнопку Left в позиции 4,0
        ((posOne[0] !== 0) && (posOne[0] !== array.length - 1) && (posOne[1] === 0)) || //Отключаем кнопку Left в позиции 1,0; 2,0; 3,0
        (array[posOne[0]][posOne[1] - 1] === 2) || (gameOverFlag === false)) { //Отключаем кнопку Left когда в позиции слева ячейку закрашено оранжевым
        buttonLeft.disabled = true;
    } else {
        buttonLeft.disabled = false;
    }
    if (((posOne[0] === 0) && (posOne[1] === 0)) || //Отключаем кнопку Up в позиции 0,0
        ((posOne[0] === 0) && (posOne[1] === array.length - 1)) || //Отключаем кнопку Up в позиции 0,4
        ((posOne[0] === 0) && (posOne[1] !== 0) && (posOne[1] !== array.length - 1)) || //Отключаем кнопку Up в позиции 0,1; 0,2; 0,3
        (array[posOne[0] - 1][posOne[1]] === 2) || (gameOverFlag === false)) { //Отключаем кнопку Up когда в позиции сверху ячейку закрашено оранжевым
        buttonUp.disabled = true;
    } else {
        buttonUp.disabled = false;
    }
    if (((posOne[0] === 0) && (posOne[1] === array.length - 1)) || //Отключаем кнопку Right в позиции 0,4
        ((posOne[0] === array.length - 1) && (posOne[1] === array.length - 1)) || //Отключаем кнопку Right в позиции 4,4
        ((posOne[0] !== 0) && (posOne[0] !== array.length - 1) && (posOne[1] === array.length - 1)) || //Отключаем кнопку Right в позиции 1,4; 2,4; 3,4
        (array[posOne[0]][posOne[1] + 1] === 2) || (gameOverFlag === false)) { //Отключаем кнопку Right когда в позиции справа ячейку закрашено оранжевым
        buttonRight.disabled = true;
    } else {
        buttonRight.disabled = false;
    }
    if (((posOne[0] === array.length - 1) && (posOne[1] === 0)) || //Отключаем кнопку Down в позиции 4,0
        ((posOne[0] === array.length - 1) && (posOne[1] === array.length - 1)) || //Отключаем кнопку Down в позиции 4,4
        ((posOne[0] === array.length - 1) && (posOne[1] !== 0) && (posOne[1] !== array.length - 1)) || //Отключаем кнопку Down в позиции 4,1; 4,2; 4,3
        (array[posOne[0] + 1][posOne[1]] === 2) || (gameOverFlag === false)) { //Отключаем кнопку Down когда в позиции снизу ячейку закрашено оранжевым
        buttonDown.disabled = true;

    } else {
        buttonDown.disabled = false;
    }
}

// 9) сделай обработку ситуации GAME OVER, когда нет куда ходить, отобразить на 
// странице надпись GAME OVER

const gameOver = (array) => {
    let cellsLeft = (array.length * array.length) - countFilledCells(array);
    if ((cellsLeft > 0) && (buttonUp.disabled === true) &&
        (buttonLeft.disabled === true) && (buttonRight.disabled === true) &&
        (buttonDown.disabled === true)) {
        statusField.innerHTML = `GAME OVER, ${cellsLeft} cell(s) Left`;
        statusField.style.background = "red";
        statusField.style.color = "white";
        gameOverFlag = false;
    } else if (cellsLeft === 0) {
        statusField.innerHTML = 'Congratulations, you won';
        statusField.style.background = "green";
        statusField.style.color = "white";
        gameOverFlag = false;
    }
}

// 10) добавь таймер на 10 секунд, если не сделал ход, GAME OVER.

const runTimer = (gameTime) => {
    stopTimer();
    if (gameOverFlag) {
        let maxTime = moment(`${gameTime}`, "ss");
        timerID = setInterval(() => {
            maxTime.subtract(100, 'ms');
            mainTimer.innerHTML = maxTime.format('ss');
            if (maxTime.format('ss') === '00') {
                clearInterval(timerID);
                statusField.innerHTML = `GAME OVER, your time is left`;
                statusField.style.background = "red";
                statusField.style.color = "white";
                gameOverFlag = false;
            }
        }, 100)
    }
}

const stopTimer = () => {
    clearInterval(timerID);
}