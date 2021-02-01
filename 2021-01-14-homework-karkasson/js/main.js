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


const arrEls = document.querySelectorAll('.arr');
const fieldEl = document.querySelector('.field');
const shuffledCardsEl = document.querySelector('.shuffled-cards');
const leftCardsEl = document.querySelector('.cards-left');

const typeLeft = 10;
const arrCardTypes = [
  {
    name: 'corner',
    top: false,
    right: true,
    bottom: true,
    left: false,
    empty: false,
  }, 
  {
    name: 'imprasse',
    top: false,
    right: true,
    bottom: false,
    left: false,
    empty: false,
  }, 
  {
    name: 'stick',
    top: false,
    right: true,
    bottom: false,
    left: true,
    empty: false,
  }
];


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

const WIDTH = 8;
const HEIGHT = 8;

const generateCells = () => {
  let newArr = [];
  for (let i = 0; i < WIDTH; i++) {
    newArr[i] = [];
    for (let j = 0; j < HEIGHT; j++) {
      newArr[i][j] = {
          id: `${j}${i}`,
          empty: true,
      };
    };
  };
  return newArr;
};

let arrCells = generateCells();
console.log(arrCells);
console.log(arrCells.length);

const renderGameField = () => {
  let str = '';
  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {
      str = `${ str }<div id="${j}${i}" class="cell"></div>`;
    };
  };

  fieldEl.innerHTML = str;
  fieldEl.style.gridTemplateColumns = `repeat(${WIDTH}, 1fr)`;
  fieldEl.style.gridTemplateRows = `repeat(${HEIGHT}, 1fr)`;
};

renderGameField();

const renderDeck = () => {
    let tempArr = shuffledCardDeck;
    let str = '';
    for (let i = 0; i < tempArr.length; i++) {
        str = `${str}<div class="cards ${tempArr[i][0].name}" id="card${i}" style="z-index: ${i}; position: absolute;"></div>`;
    }
    shuffledCardsEl.innerHTML = str;
    return tempArr;
};

renderDeck();

const leftCards = () => {
    return leftCardsEl.innerHTML = `Cards Left: ${shuffledCardDeck.length}`;
};

const compareFieldsAround = (x, y) => {

  if (Number(x) > 0) {   //Проверка объекта левой ячейки
    if (!arrCells[Number(x) - 1][Number(y)].empty) {
      if (arrCells[Number(x)][Number(y)].left !== arrCells[Number(x) - 1][Number(y)].right) {
        return false;
      }
    }
  }

  if (Number(x) < WIDTH - 1) {    //Проверка объекта правой ячейки
    if (!arrCells[Number(x) + 1][Number(y)].empty) {
      if (arrCells[Number(x)][Number(y)].right !== arrCells[Number(x) + 1][Number(y)].left) {
        return false;
      }
    }
  }

  if (Number(y) > 0) {    //Проверка объекта верхней ячейки
    if (!arrCells[Number(x)][Number(y) - 1].empty) {
      if (arrCells[Number(x)][Number(y)].top !== arrCells[Number(x)][Number(y) - 1].bottom) {
        return false;
      }
    }
  }

  if (Number(y) < HEIGHT - 1) {    //Проверка объекта нижней ячейки
    if (!arrCells[Number(x)][Number(y) + 1].empty) {
      if (arrCells[Number(x)][Number(y)].bottom !== arrCells[Number(x)][Number(y) + 1].top) {
        return false;
      }
    }
  }

  return true;

};

const refreshArr = (x, y, obj) => {
  return arrCells[x][y] = obj;
};

fieldEl.addEventListener('click', (ev) => {
  const tempId = ev.target.id;
  const CurrCardArr = tempId.split('');   //получаем массив координат y,x элемента на который положили карту
  console.log("Curr Card Coord: ", CurrCardArr);
    if (ev.target.id !== '' && !ev.target.classList.contains('busy')) {
        let topCardIndex = shuffledCardDeck.length - 1;
        for (let i = 0; i < shuffledCardDeck.length; i++) {
            let topCardArr = shuffledCardDeck[topCardIndex]; //Массив объекта верхней карты
            
            refreshArr(Number(CurrCardArr[0]), Number(CurrCardArr[1]), topCardArr[0]);   //передаем объект положенной карты в массив поля x,y
            console.log(arrCells);

            const compareResult = compareFieldsAround(CurrCardArr[0], CurrCardArr[1]);
            if (!compareResult) {
              ev.target.classList.add('red-border');
            } else {
              console.log('Ok');
            }
        
            ev.target.classList.add(`${topCardArr[0].name}`);
            ev.target.classList.add('busy');
            shuffledCardDeck.splice(topCardIndex, 1);   //убираем из колоды вытянутую карту
            renderDeck();
            leftCards();
        }
    }
});
