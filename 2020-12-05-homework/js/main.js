// 1) Программа поиска загаданного числа = 501. Первоначальный диапазон поиска: (-2147483647; 2147483647). 
// При сравнении числа с загаданным, выдавать ответ наподобие "больше/меньше". Весь лог поиска, с указанием номера итерации вывести на страницу.

let conceivedNum = 501;
let mainEl = document.querySelector('.main');

const randomInt = (min, max) => {
    //случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

const findNum = (min, max) => {
    let bottomLimit = 0;
    let topLimit = 0;
    let num = 0;
    let iteration = 0;
    bottomLimit = bottomLimit + min;
    topLimit = topLimit + max;
    num = num + randomInt(bottomLimit, topLimit);
    while (num !== conceivedNum) {
        let str = '';
        num = randomInt(bottomLimit, topLimit);
        if (num < conceivedNum) {
            iteration = iteration + 1;
            str = str + ` Итерация №${iteration}, Не угадали, загаданное число больше`;
            bottomLimit = num + 1; //добавляем 1, что бы повторно не сгенерировало число из нижней границы
            mainEl.innerHTML = mainEl.innerHTML + `${num}, ${str} <br>`;

            console.log(num, str);
        } else if (num > conceivedNum) {
            iteration = iteration + 1;
            str = str + `Итерация №${iteration}, Не угадали, загаданное число меньше`;
            topLimit = num - 1; //убираем 1, что бы повторно не сгенерировало число из верхней границы
            mainEl.innerHTML = mainEl.innerHTML + `${num}, ${str} <br>`;

            console.log(num, str);
        } else {
            str = str + 'Ура, число угадано!'
        };
    }
    return mainEl.innerHTML = mainEl.innerHTML + `Победа! Вы загадали число - ${num}, найдено с помощью ${iteration} итераций`;
};

console.log(findNum(-2147483647, 2147483647));