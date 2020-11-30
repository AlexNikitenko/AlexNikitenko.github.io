// ближайшие два простые числа к числу 9991999

// let what = checkForSimpleNumber(5);
// what ? console.log('Простое число!') : console.log('Число не простое');


let startValue = 14;
let desiredValues = '';
let desiredValue1 = null;
let desiredValue2 = null;
let quantity = 0;

const checkForSimpleNumber = (num) => {
    for (let i = 2; i < num; i++) {
        if (num % i === 0)
            return false;
    };
    return true;
}

const iteration = (checkedValue) => {
    while (quantity <= 2) {
        for (let n = 1; n < checkedValue; n++) {
            desiredValue1 = checkedValue - n;
            desiredValue2 = checkedValue + n;
            if (checkForSimpleNumber(desiredValue1)) {
                quantity = quantity + 1;
                return desiredValue1;
            }
            if (checkForSimpleNumber(desiredValue2)) {
                quantity = quantity + 1;
                return desiredValue2;
            }
        }
    }
    return desiredValues = `${desiredValue1} ${desiredValue2}`;
}


console.log(iteration(startValue));