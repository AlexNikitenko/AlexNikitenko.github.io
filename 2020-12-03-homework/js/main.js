// 1) Задано 2 массива одинаковой длины n. Получить 3й массив, который есть копия первого, но в индексах 1, n-1,
//  n/2 значения со второго массива.

let n = 6;
let arr3 = [];

const randomInt = (min, max) => {
    //случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const genNewArr = (n, min1, max1) => {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(randomInt(min1, max1));
    }
    return arr;
}

const fixArr = (arrayFirst, arraySecond, index) => {
    let arrayNew = [];
    for (let i = 0; i < n; i++) {
        arrayNew[i] = arrayFirst[i];
    }
    arrayNew[index] = arraySecond[index];

    return arrayNew;
};

let arr = genNewArr(n, 1, 10);
let arr2 = genNewArr(n, 1, 25);
arr3 = fixArr(arr, arr2, 1);
arr3 = fixArr(arr3, arr2, (n - 1));
arr3 = fixArr(arr3, arr2, (n / 2));

console.log('1: ', arr, '2: ', arr2, '3: ', arr3);


// 2) Задано целое число. Определить количество разрядов. 

const randomInt2 = (min, max) => {
    //случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const countRank = (num) => {
    let rank = 0;
    while (num !== 0) {
        rank = rank + 1;
        num = Math.trunc(num / 10);
    }
    return rank;
};

let num = randomInt2(1, 9991287);
let ranks = countRank(num);


console.log('Заданое число:', num, 'Количество разрядов: ', ranks);

// 3) Задана квадратная матрица. Получить сумму элементов побочной диагонали.