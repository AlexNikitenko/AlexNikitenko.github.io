// 7) на игровом поле сделать отображение следа на клетках после курсора оранжевым 
// цветом. В соответствующих ячейках массива где след писать "2". След весь от
// начала игры.
// 8) сделай отключение соответствующих кнопок управления, если курсор с краю поля 
// или наступает на свой след.
// 9) сделай обработку ситуации GAME OVER, когда нет куда ходить, отобразить на 
// странице надпись GAME OVER
// 10) добавь таймер на 10 секунд, если не сделал ход, GAME OVER.

const mainField = document.querySelector('.main');
const statusField = document.querySelector('.status');
const buttonUp = document.querySelector('.btn-up');
const buttonLeft = document.querySelector('.btn-left');
const buttonRight = document.querySelector('.btn-right');
const buttonDown = document.querySelector('.btn-down');




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
let arr2 = [
    [12, 3, 41],
    [1, 2, 3],
    [0, 0, 2]
];

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

const render = (array) => {
    let str = '';
    array.forEach(el1 => {
        el1.forEach(el2 => {
            // (el2) ? str = `${str}<div class="cell blue"></div>}`: str = `${str}<div class="cell"></div>`;
            if (el2 === 1) {
                str = `${str}<div class="cell blue"></div>`;
            } else if (el2 === 2) {
                str = `${str}<div class="cell orange"></div>`;
            } else str = `${str}<div class="cell"></div>`;
        })
    })
    mainField.innerHTML = str;
    statusField.innerHTML = countFilledCells(array);
};


let posOne = [0, 0];
arr[posOne[0]][posOne[1]] = 1;
render(arr);
console.log(arr);

// 6) сделай управление мышкой и клавиатурой, там где находится курсор (курсор- это 
//   любая клетка поля), закрашиваем клетку синим цветом. Первоначальное положение 
//   курсора в левом верхнем углу. В массиве, в соответствующую ячейку писать "1". 
//   Уход с клетки возвращает значение null;

const shift = (x, y, array) => {
    arrFillZero(array);
    // arr[posOne[0]][posOne[1]] = 2;
    posOne = [posOne[0] + x][posOne[1] + y];
    array[posOne[0]][posOne[1]] = posOne;
    countFilledCells(array);
    render(array);
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
            shiftLeft();
            break;
        case 'ArrowRight':
            shiftRight();
            break;
        case 'ArrowDown':
            shiftDown();
            break;
        case 'ArrowUp':
            shiftUp();
            break;
    }
});

// 8) сделай отключение соответствующих кнопок управления, если курсор с краю поля 
// или наступает на свой след.

const getStrButtons = () => {
    str = '';
    if (posOne[0] === 0) {
        str = `${str}<button disabled><-</button>`;
    } else {}
}