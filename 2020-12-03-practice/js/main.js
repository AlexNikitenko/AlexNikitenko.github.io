// 1) Игроки кидают один кубик по очереди. У обоих вначале игры 100 очков. Ходят по очереди. 
// Сколько выпало, столько и отнимается от остатка. У проигравшего 0 или меньше очков.  Лог игры вывести на страницу.

let gamerPoints1 = 100;
let gamerPoints2 = 100;

const randomInt = (min, max) => {
    //случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}


const diceRoll = () => {
    while ((gamerPoints1 > 0) && (gamerPoints2 > 0)) {
        let throw1 = randomInt(1, 6);
        let throw2 = randomInt(1, 6);
        gamerPoints1 = gamerPoints1 - throw1;
        gamerPoints2 = gamerPoints2 - throw2;
        console.log('Первый бросает: ', throw1, 'Очков у первого: ', gamerPoints1, 'Второй бросает: ', throw2, 'Очков у Второго: ', gamerPoints2);
    }
    return (gamerPoints1 === 0) ? 'Второй игрок победил' : 'Первый игрок победил'
};

console.log(diceRoll());

// 2) Вывести на страницу все знаки зодиака, HTML спецсимволы

// let aries = '&#9800';
// let taurus = '&#9801';
// let gemini = '&#9802';
// let cancer = '&#9803';
// let lion = '&#9804';
// let maid = '&#9805';
// let libra = '&#9806';
// let scorpions = '&#9807'
// let sagittarius = '&#9808'
// let ibex = '&#9809';
// let aquarius = '&#9810';
// let fish = '&#9811';


let mainEl = document.querySelector('.main');

const addZodiac = () => {
    let start = 9800;
    let str = '';
    for (let i = 0; i < 12; i++) {
        str = str + `&#${start + i}`;
    }
    return str;
};

mainEl.innerHTML = addZodiac();