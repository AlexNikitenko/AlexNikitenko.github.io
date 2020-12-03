// 1) В массиве 9 чисел. Проверить что каждое из чисел в индексах 2, 5, 7 является суммой соседних чисел. Если нет, то заменить на правильное.
const genArr = () => {
    return [1, 4, 6, 3, 7, 2, 8, 0, 2];
}

const fixArr = (index, array) => {
    (arr[index] === arr[index - 1] + arr[index + 1]) ? true: arr[index] = arr[index - 1] + arr[index + 1];
    return array;
};

let arr = genArr();
fixArr(2, arr);
fixArr(5, arr);
fixArr(7, arr);

console.log(arr);

// 2) Задать массив со случайными числами. Найти самое меньшее число, его отнять от первого и последнего числа.

const randomInt = (min, max) => {
    //случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const genNewArr = (len, min1, max1) => {
    let arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(randomInt(min1, max1));
    }
    return arr;
}

const minValue = (arr) => {
    let min = arr[0];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    };
    return min;
};

const decrElem = (index, array, diff) => {
    array[index] = array[index] - diff;
    console.log('decr:', array);
}

let arr2 = genNewArr(6, 1, 12);
console.log('1: ', arr2);
let min1 = minValue(arr2);
decrElem(0, arr2, min1);
let lastEl = arr2.length - 1;
decrElem(lastEl, arr2, min1);
console.log('2: ', arr2);

// 3) Задать массив со случайными числами. Каждый элемент массива умножить на 3 и от произведения отнять 5. Записать в новый массив,
//  вывести в консоль оба массива для сравнения.

const randomInt2 = (min, max) => {
    //случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const genNewArr2 = (len, min1, max1) => {
    let arr = [];
    for (let i = 0; i < len; i++) {
        arr.push(randomInt2(min1, max1));
    }
    return arr;
}

const fixElem = (array) => {
    let arr4 = [];
    for (let i = 0; i < array.length; i++) {
        arr4[i] = array[i] * 3 - 5;
    }
    return arr4;
};

let arr3 = genNewArr2(6, 1, 12);
let arr4 = fixElem(arr3);

console.log('1: ', arr3, '2: ', arr4);

// 4) Используя рекурсивные вычисления, найти максимальное число ряда Фибоначчи, которое меньше 9991999, вывести его; вывести число итераций, 
// необходимое для поиска этого числа.

// let startNum = 9991999;
let iteration = 0;
let arr5 = [];

const fibonachi = (n) => n <= 1 ? n : fibonachi(n - 1) + fibonachi(n - 2);

const findMaxNum = (startNum) => {
    let maxNum = 0;
    for (let i = 0; fibonachi(i) < startNum; i++) {
        arr5[i] = fibonachi(i);
        iteration = iteration + 1;
        maxNum = Math.max.apply(null, arr5);
    };
    return `Nums of iterations: ${iteration}, Max Number: ${maxNum}`;
}

console.log(findMaxNum(9991999));