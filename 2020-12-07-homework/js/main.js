let arr = [
    [20, 2, 7, 19, 4],
    [16, 14, 12, 17, 15],
    [15, 19, 2, 14, 6],
    [7, 3, 15, 7, 14],
    [9, 0, 20, 1, 12],
];

for (let i = 0; i < arr.length; i++) {
    arr[i][arr.length - 1 - i] = arr[i][arr.length - 1 - i] * 3;
};

console.table(arr);