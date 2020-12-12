const randomInt = (min, max) => {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const getArray = (rows, columns, min, max) => {
    let arr = []; // []
    for (let i = 0; i < rows; i++) {
        arr[i] = []; // [[], [], [], [], []]
        for (let j = 0; j < columns; j++) {
            arr[i][j] = {};
            arr[i][j].id = `col${j}row${i}`;
            arr[i][j].value = randomInt(min, max);
        };
    };
    return arr;
};

const copy2DArr = (arrIn) => {
    let arr = [];
    for (let i = 0; i < arrIn.length; i++) {
        arr[i] = [];
        for (let j = 0; j < arrIn[i].length; j++) {
            arr[i][j] = arrIn[i][j];
        };
    };
    return arr;
};

console.table(getArray(5, 5, 0, 12));