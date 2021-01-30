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

const arrCells = [];

const generateCells = () => {
  for (let i = 0; i < WIDTH; i++) {
    for (let j = 0; j < HEIGHT; j++) {
      arrCells.push({
          id: `${j}${i}`,
          empty: true,
          // name: '',
          // top: false,
          // right: false,
          // bottom: false,
          // left: false,
      });
     
       
    };
  };
  return arrCells;
};

generateCells();

const renderGameField = () => {
  fieldEl.innerHTML = arrCells.reduce((str, el) => {
    return `${ str }
      <div id="${ el.id }" class="cell">
      </div>
      `;
  }, '');
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
  if ((x > 0) || (arrCells[x][y].left !== arrCells[x - 1][y].right)) { //Проверка ячейки слева
    return false;
  }
  if ((y > 0) || (arrCells[x][y].top !== arrCells[x][y - 1].bottom)) { //Проверка ячейки сверху
    return false;
  }
  if ((x < WIDTH - 1) || (arrCells[x][y].right !== arrCells[x + 1][y].left)) { //Проверка ячейки справа
    return false;
  }
  if ((y < HEIGHT - 1) || (arrCells[x][y].bottom !== arrCells[x][y + 1].top)) { //Проверка ячейки снизу
    return false;
  }
  if (arrCells[x - 1][y].empty && arrCells[x][y - 1].empty && arrCells[x + 1][y].empty && arrCells[x][y + 1].empty) {
    return true;
  }
  return true;
};

// const compareFieldsAround = (x, y) => {
//   if (((x === 0) && (y === 0)) && (arrCells[x + 1][y].empty)) {  //Проверяем на пустоту ячейки справа при положении 0,0
//     return;
//   }
//   if (((x === 0) && (y === 0)) && (arrCells[x][y + 1].empty)) { //Проверяем на пустоту ячейки снизу при положении 0,0
//     return;
//   }
//   if (((x === 0) && (y === 0)) && (!arrCells[x + 1][y].empty)) {  //Проверяем на заполненность ячейки справа при положении 0,0
//     if (arrCells[x][y].right !== arrCells[x + 1][y].left) {
//       return false;
//     }
//   }
//   if (((x === 0) && (y === 0)) && (!arrCells[x][y + 1].empty)) { //Проверяем на заполненность ячейки снизу при положении 0,0
//     if (arrCells[x][y].bottom !== arrCells[x][y + 1].top) {
//       return false;
//     }
//   }
//   ///
//   // if ((x > 0) || (arrCells[x][y].left !== arrCells[x - 1][y].right)) { //Проверка ячейки слева
//   //   return false;
//   // }
//   // if ((y > 0) || (arrCells[x][y].top !== arrCells[x][y - 1].bottom)) { //Проверка ячейки сверху
//   //   return false;
//   // }
//   // if ((x < WIDTH - 1) || (arrCells[x][y].right !== arrCells[x + 1][y].left)) { //Проверка ячейки справа
//   //   return false;
//   // }
//   // if ((y < HEIGHT - 1) || (arrCells[x][y].bottom !== arrCells[x][y + 1].top)) { //Проверка ячейки снизу
//   //   return false;
//   // }
//   return true;
// };

fieldEl.addEventListener('click', (ev) => {

    if (ev.target.id !== '' && !ev.target.classList.contains('busy')) {
        // let str = '';
        let topCardIndex = shuffledCardDeck.length - 1;
        for (let i = 0; i < shuffledCardDeck.length; i++) {
            let topCardArr = shuffledCardDeck[topCardIndex]; //Массив объекта верхней карты
            const tempId = ev.target.id;
            const CurrCardCoord = tempId.split('');   //получаем массив координат y,x элемента на который положили карту
          
            arrCells[Number(CurrCardCoord[1])][Number(CurrCardCoord[0])] = topCardArr[0];  //передаем объект положенной карты в массив поля x,y
            console.log(arrCells);
            console.log(CurrCardCoord[0], CurrCardCoord[1]);
            
            let compareResult = compareFieldsAround(Number(CurrCardCoord[0]), Number(CurrCardCoord[1]));
            console.log(compareResult);
            if (compareResult) {
              console.log('Ok');
            } else {
              ev.target.classList.add('red-border');
            }
        
            ev.target.classList.add(`${topCardArr[0].name}`);
            ev.target.classList.add('busy');
            shuffledCardDeck.splice(topCardIndex, 1);   //убираем из колоды вытянутую карту
            renderDeck();
            leftCards();
              return;
        }
    }
    

});
