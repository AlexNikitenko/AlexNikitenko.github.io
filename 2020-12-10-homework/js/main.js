// 1) Сгенерировать двумерный массив 5х5 случайных чисел (0..12); 
// 2) посчитать сумму чисел основной диагонали;
// 3) посчитать сумму чисел побочной диагонали;
// 4) переставить местами столбцы 1 и 2;
// 5) высчитать столбец с максимальной суммой чисел, её оставить, остальные колонки заполнить нулями.


// 1) Сгенерировать двумерный массив 5х5 случайных чисел (0..12); 

const randomInt = (min, max) => {
    //случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};

let arr = [];

const genArr = (rows, columns) => { //Генерируем двумерный массив, где rows = кол-во рядов, columns - кол-во столбцов
    for (let i = 0; i < rows; i++) {
        let arrIn = [];
        for (let j = 0; j < columns; j++) {
            arrIn[j] = randomInt(0, 12);
            arr[i] = arrIn;
        }
    }
    return arr;
};


// 2) посчитать сумму чисел основной диагонали;

const sumMainDiag = (columns) => { // Функция, которая считает сумму чисел основной диагонали массива, где columns - количество рядов
    let sum = 0;
    for (let i = 0; i < columns; i++) {
        sum = sum + arr[i][i];
    }
    return sum;
};

// 3) посчитать сумму чисел побочной диагонали;

const sumOppositeDiag = (columns) => { // Функция, которая считает сумму чисел побочной диагонали массива, где columns - количество рядов 
    let sum = 0;
    for (let i = 0; i < columns; i++) {
        sum = sum + arr[i][arr.length - 1 - i];
    }
    return sum;
};

// 4) переставить местами столбцы 1 и 2;

const replaceColumns = (firstIndexColumn, secondIndexColumn) => { // Функция, которая меняет местами колонки массива с индексами firstIndexColumn, secondIndexColumn
    let tempArr1 = [];
    let tempArr2 = [];
    for (let i = 0; i < arr.length; i++) {
        tempArr1[i] = arr[i][firstIndexColumn];
        tempArr2[i] = arr[i][secondIndexColumn];
        arr[i][secondIndexColumn] = tempArr1[i];
        arr[i][firstIndexColumn] = tempArr2[i];
    }
    return arr;
};

// 5) высчитать столбец с максимальной суммой чисел, её оставить, остальные колонки заполнить нулями.

const arr1 = genArr(5, 5); // Генерируем новый рабочий массив 5х5 с рандомными числами (из п.1)

const arr2 = [];

const genArrNull = (rows, columns) => { //Генерируем двумерный массив с нулевыми значениями, где rows = кол-во рядов, columns - кол-во столбцов
    for (let i = 0; i < rows; i++) {
        let arrIn = [];
        for (let j = 0; j < columns; j++) {
            arrIn[j] = 0;
            arr2[i] = arrIn;
        }
    }
    return arr2;
};

const findMaxSumColumn = (rows, columns) => { //Вспомогательная функция, которая перебирает столбцы, суммируя значения чисел и возвращает сумму каждого столбца как элемент нового массива
    let sumOneColumn = [];
    for (let i = 0; i < columns; i++) {
        let sum = 0;
        for (let j = 0; j < rows; j++) {
            sum = sum + arr1[j][i];
            sumOneColumn[i] = sum;
        }
    }
    return sumOneColumn;
};

const changeArr = (rows, columns) => { //Функция, которая меняет значения на 0 во всех столбцах, кроме того, в котором сумма элементов максимальная
    let fixArr = genArrNull(5, 5); //Генерируем массив 5х5 с нулевыми значениями
    console.table("fixarr=", fixArr);
    let sumOneColumn = findMaxSumColumn(rows, columns); //Сгенерируем массив с суммами столбцов из предыдущей функции
    console.log("sumOneColumn=", sumOneColumn)
    let maxNum = sumOneColumn[0];
    for (let z = 1; z < sumOneColumn.length; z++) { //Перебираем массив с суммами столбцов для нахождения максимального числа
        if (maxNum < sumOneColumn[z]) {
            maxNum = sumOneColumn[z];
        }
    }
    let maxColumnIndex = sumOneColumn.indexOf(maxNum); //Ищем индекс максимальной суммы в массиве
    console.log("MaxNum1:", maxNum);
    console.log("Index of Max Column:", maxColumnIndex); //Добавляем значения из первоначального значения в столбец с максимальной суммой
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            fixArr[j][maxColumnIndex] = arr1[j][maxColumnIndex];
        }
    }
    return fixArr;
};

console.table(genArr(5, 5));
console.log("Sum of main diagonal = ", sumMainDiag(5));
console.log("Sum of opposite diagonal = ", sumOppositeDiag(5));
console.table(replaceColumns(0, 1));
console.table("arr1:", arr1);
console.table(changeArr(5, 5));