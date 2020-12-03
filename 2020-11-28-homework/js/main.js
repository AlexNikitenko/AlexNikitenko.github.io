// ближайшие два простые числа к числу 9991999

let startValue = 9991999;
let maxNums = 2;

const checkForSimpleNum = (num) => {
    for (let i = 2; i < num; i++) {
        if (num % i === 0)
            return false;
    };
    return true;
}

const findSimpleNum = (startValue) => {
    let radius = 0;
    let foundNums = 0;
    let str = '';
    while (foundNums < maxNums) {
        if (checkForSimpleNum(startValue + radius)) {
            str = `${str} ${startValue + radius}`;
            foundNums = foundNums + 1;
        };
        if (checkForSimpleNum(startValue - radius)) {
            str = `${str} ${startValue - radius}`;
            foundNums = foundNums + 1;
        };
        radius = radius + 1;
    };
    return str;
}


console.log(findSimpleNum(startValue));