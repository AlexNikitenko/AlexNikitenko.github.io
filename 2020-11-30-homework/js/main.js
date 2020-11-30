// 1) В массиве 9 чисел. Проверить что каждое из чисел в индексах 2, 5, 7 является суммой соседних чисел. Если нет, то заменить на правильное.

let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
(arr[2] === arr[1] + arr[3]) ? true: arr[2] = arr[1] + arr[3];
(arr[5] === arr[4] + arr[6]) ? true: arr[5] = arr[4] + arr[6];
(arr[7] === arr[6] + arr[8]) ? true: arr[7] = arr[6] + arr[8];

console.log(arr);

// 2) Задать массив со случайными числами. Найти самое меньшее число, его отнять от первого и последнего числа.

let arr1 = [104, 69, 11, 56, 94];
let min = Math.min.apply(null, arr1);

let result1 = min - arr1[0];
let result2 = min - arr1[4];

console.log(result1, result2);

// 3) Задать массив со случайными числами. Каждый элемент массива умножить на 3 и от произведения отнять 5. Записать в новый массив,
//  вывести в консоль оба массива для сравнения.

let arr2 = [104, 69, 11, 56, 94];
let arr3 = [];

for (let i = 0; i < arr2.length; i++) {
    arr3[i] = arr2[i] * 3 - 5;
}

console.log(arr2, arr3);

// 4) Используя рекурсивные вычисления, найти максимальное число ряда Фибоначчи, которое меньше 9991999, вывести его; вывести число итераций, 
// необходимое для поиска этого числа.

let iteration = 0;
let num = 0;
let arr4 = [];

let fibonachi = (n) => n <= 1 ? n : fibonachi(n - 1) + fibonachi(n - 2);

for (let i = 0; fibonachi(i) < 9991999; i++) {
    arr4[i] = fibonachi(i);
    iteration = iteration + 1;
}

let max = Math.max.apply(null, arr4);

console.log(iteration, max);