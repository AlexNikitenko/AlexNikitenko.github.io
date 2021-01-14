// Задание: сделать игру наподобие Каркассона. На игровом поле отображается 
// колода карточек, игровое поле, а также написано, сколько карточек осталось в колоде.
// В колоде, вначале игры, лежат в случайном порядке типовкарточекколичествокаждоготипа
// карточек. Размер игрового поля ширинаполявысота_поля. При клике на игровое поле, 
// в ячейке появляется верхняя карта из колоды. На её месте, в колоде, появляется
// следующая случайная карта. При следующих кликах на ячейке поля с картой, карта
// вращается.

// По-умолчанию: 
// типов карточек: 3
// штук каждого типа: 10
// высота игрового поля: 8
// ширина игрового поля: 8

// А) Проверить, есть ли возможность так уложить карточку на игровое поле. 
// Если такой возможности нет, ячейка на поле подсвечивается красным контуром. 
// Б) ЛКМ перетягивать карточку между полями, ПКМ вращать её. Проверка из задания
//  "А)" актуальна.
// В) Пока карточку не уложить правильно вращением, другую карточку с колоды взять
//  нельзя
// Г) Игра начинается при первом клике на поле. Предоставляется 1 минута, отсчет 
// вести под игровым полем. По истечению этого времени вывести окно по центру, написать
//  "Время вышло! Использовано карт: <кол-во карт на поле>".

const arrEls = document.querySelectorAll('.arr');
const fieldEl = document.querySelector('.field');
const shuffledCardsEl = document.querySelector('.shuffled-cards');
const leftCardsEl = document.querySelector('.cards-left');

const typeLeft = 10;
const arrCardTypes = ['corner', 'imprasse', 'stick'];

let startCardDeck = [];
let shuffledCardDeck = [];

const randomInt = (min, max) => {
    //случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};

const createCardDeck = () => {
    let arrTemp = [];
    for (let i = 0; i < arrCardTypes.length; i++) {
        for (let j = 0; j < typeLeft; j++) {
            arrTemp.push(arrCardTypes[i]);
        };
    };
    return arrTemp;
};

startCardDeck = createCardDeck();
// arrEls[0].innerHTML = startCardDeck.join(',');

const shuffleCardDeck = (arr) => {
    const arrTemp = [];
    let randomIndex = null;
    let randomElem = null;
    const count = arr.length;

    for (let i = 0; i < count; i++) {
        randomIndex = randomInt(0, startCardDeck.length - 1);
        randomElem = startCardDeck.splice(randomIndex, 1);
        arrTemp.push(randomElem);
    }
    return arrTemp;
}

shuffledCardDeck = shuffleCardDeck(startCardDeck);
console.log(shuffledCardDeck);
// arrEls[1].innerHTML = startCardDeck.join(',');
// arrEls[2].innerHTML = shuffledCardDeck.join(',');

//Field

const WIDTH = 8;
const HEIGHT = 8;

const genField = () => {
    let str = '';
    let newArr = [];
    for (let i = 0; i < WIDTH; i++) {
        newArr[i] = [];
        for (let j = 0; j < HEIGHT; j++) {
            newArr[i][j] = null;
            str = `${str}<div class="cell" id="${i}${j+1}"></div>`;
        };
    };
    fieldEl.innerHTML = str;
    fieldEl.style.gridTemplateColumns = `repeat(${WIDTH}, 1fr)`;
    fieldEl.style.gridTemplateRows = `repeat(${HEIGHT}, 1fr)`;
    return newArr;
};

genField();

console.log(genField());

const renderDeck = () => {
    let tempArr = shuffledCardDeck;
    let str = '';
    for (let i = 0; i < tempArr.length; i++) {
        str = `${str}<div class="cards ${tempArr[i]}" id="card${i}" style="z-index: ${i}; position: absolute;"></div>`;
    }
    shuffledCardsEl.innerHTML = str;
    return tempArr;
};
renderDeck();

const leftCards = () => {
    return leftCardsEl.innerHTML = `Cards Left: ${shuffledCardDeck.length}`;
}

fieldEl.addEventListener('click', (ev) => {
    if (ev.target.id !== '') {
        let item = Number(ev.target.id);
        let str = '';
        let index = shuffledCardDeck.length - 1;
        for (let i = 0; i < shuffledCardDeck.length; i++) {
            const tempCard = document.querySelector(`#card${index}`)
            str = shuffledCardDeck[index];
            console.log(str);
            ev.target.classList.add(`${str[0]}`);
            shuffledCardDeck.splice(index, 1);
            console.log(shuffledCardDeck);
            renderDeck();
            leftCards();
        }
    } else console.log('We have 1 card');
});