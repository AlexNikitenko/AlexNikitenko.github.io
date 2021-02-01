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

// const arrCells = [];

// const generateCells = () => {
//   for (let i = 0; i < WIDTH; i++) {
//     for (let j = 0; j < HEIGHT; j++) {
//       arrCells.push({
//           id: `${j}${i}`,
//           empty: true,
//           // name: '',
//           // top: false,
//           // right: false,
//           // bottom: false,
//           // left: false,
//       });
     
       
//     };
//   };
//   return arrCells;
// };

const generateCells = () => {
  let newArr = [];
  for (let i = 0; i < WIDTH; i++) {
    newArr[i] = [];
    for (let j = 0; j < HEIGHT; j++) {
      newArr[i][j] = {
          id: `${j}${i}`,
          empty: true,
          // name: '',
          // top: false,
          // right: false,
          // bottom: false,
          // left: false,
      };
     
       
    };
  };
  return newArr;
};

let arrCells = generateCells();
console.log(arrCells);
console.log(arrCells.length);

// const renderGameField = () => {
//   fieldEl.innerHTML = arrCells.reduce((str, el) => {
//     return `${ str }
//       <div id="${ el[0].id }" class="cell">
//       </div>
//       `;
//   }, '');
//     fieldEl.style.gridTemplateColumns = `repeat(${WIDTH}, 1fr)`;
//     fieldEl.style.gridTemplateRows = `repeat(${HEIGHT}, 1fr)`;
// };

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


const compareLeftField = (x, y) => {
  if (Number(x) > 0) {
    if (!arrCells[Number(x) - 1][Number(y)].empty) {   //Проверка объекта левой ячейки
      if (arrCells[Number(x)][Number(y)].left === arrCells[Number(x) - 1][Number(y)].right) {
        return true;
      } else return false;
    } else return;
  }
};

const compareRightField = (x, y) => {
  if (Number(x) < WIDTH - 1) {
    if (!arrCells[Number(x) + 1][Number(y)].empty) {   //Проверка объекта правой ячейки
      if (arrCells[Number(x)][Number(y)].right === arrCells[Number(x) + 1][Number(y)].left) {
        return true;
      } else return false;
    }
  }
};

const compareTopField = (x, y) => {
  if (Number(y) > 0) {
    if (!arrCells[Number(x)][Number(y) - 1].empty) {   //Проверка объекта верхней ячейки
      if (arrCells[Number(x)][Number(y)].top === arrCells[Number(x)][Number(y) - 1].bottom) {
        return true;
      } else return false;
    } else return;
  }
};

const compareBottomField = (x, y) => {
  if (Number(y) < HEIGHT - 1) { 
    if (!arrCells[Number(x)][Number(y) + 1].empty) {  //Проверка объекта нижней ячейки
      if (arrCells[Number(x)][Number(y)].bottom === arrCells[Number(x)][Number(y) + 1].top) {
        return true;
      } else return false;
    } else return;
  }
};

const compareFieldsAround = (x, y) => {

  // if (Number(x) > 0) {   //Проверка объекта левой ячейки
  //   if (!arrCells[Number(x) - 1][Number(y)].empty) {
  //     if (arrCells[Number(x)][Number(y)].left === arrCells[Number(x) - 1][Number(y)].right) {
  //       return true;
  //     } else return;
  //   }
  // }

  // if (Number(x) < WIDTH - 1) {    //Проверка объекта правой ячейки
  //   if (!arrCells[Number(x) + 1][Number(y)].empty) {
  //     if (arrCells[Number(x)][Number(y)].right === arrCells[Number(x) + 1][Number(y)].left) {
  //       return true;
  //     } else return; 
  //   }
  // }

  // if (Number(y) > 0) {    //Проверка объекта верхней ячейки
  //   if (!arrCells[Number(x)][Number(y) - 1].empty) {
  //     if (arrCells[Number(x)][Number(y)].top === arrCells[Number(x)][Number(y) - 1].bottom) {
  //       return true;
  //     } else return; 
  //   }
  // }

  // if (Number(y) < HEIGHT - 1) {    //Проверка объекта нижней ячейки
  //   if (!arrCells[Number(x)][Number(y) + 1].empty) {
  //     if (arrCells[Number(x)][Number(y)].bottom === arrCells[Number(x)][Number(y) + 1].top) {
  //       return true;
  //     } else return; 
  //   }
  // }

  

  // return true;

/////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  if ((Number(x) === 0) && (Number(y) === 0)) {         //Проверка в положении 0, 0
    if (!arrCells[Number(x)][Number(y) + 1].empty) {  //Проверка объекта нижней ячейки
      if (arrCells[Number(x)][Number(y)].bottom === arrCells[Number(x)][Number(y) + 1].top) {
        return true;
      } 
      return false;
    }
    if (!arrCells[Number(x) + 1][Number(y)].empty) {   //Проверка объекта правой ячейки
      if (arrCells[Number(x)][Number(y)].right === arrCells[Number(x) + 1][Number(y)].left) {
        return true;
      } 
      return false;
    }
    if ((arrCells[Number(x)][Number(y) + 1].empty) && (arrCells[Number(x) + 1][Number(y)].empty)) {
      return true;
    }
  }

  if ((Number(x) === 0) && (Number(y) === HEIGHT - 1)) {  //Проверка в положении 0, H - 1
    if (!arrCells[Number(x)][Number(y) - 1].empty) {   //Проверка объекта верхней ячейки
      if (arrCells[Number(x)][Number(y)].top === arrCells[Number(x)][Number(y) - 1].bottom) {
        return true;
      } 
      return false;
    }
    if (!arrCells[Number(x) + 1][Number(y)].empty) {   //Проверка объекта правой ячейки
      if (arrCells[Number(x)][Number(y)].right === arrCells[Number(x) + 1][Number(y)].left) {
        return true;
      } 
      return false;
    }
    if ((arrCells[Number(x)][Number(y) - 1].empty) && (arrCells[Number(x) + 1][Number(y)].empty)) {
      return true;
    }
  }

  if ((Number(x) === WIDTH - 1) && (Number(y) === 0)) {  //Проверка в положении W - 1, 0
    if (!arrCells[Number(x) - 1][Number(y)].empty) {   //Проверка объекта левой ячейки
      if (arrCells[Number(x)][Number(y)].left === arrCells[Number(x) - 1][Number(y)].right) {
        return true;
      }
      return false;
    }
    if (!arrCells[Number(x)][Number(y) + 1].empty) {  //Проверка объекта нижней ячейки
      if (arrCells[Number(x)][Number(y)].bottom === arrCells[Number(x)][Number(y) + 1].top) {
        return true;
      } 
      return false;
    }
    if ((arrCells[Number(x) - 1][Number(y)].empty) && (arrCells[Number(x)][Number(y) + 1].empty)) {
      return true;
    }
  }

  if ((Number(x) === WIDTH - 1) && (Number(y) === HEIGHT - 1)) {  //Проверка в положении W - 1, H - 1
    if (!arrCells[Number(x) - 1][Number(y)].empty) {   //Проверка объекта левой ячейки
      if (arrCells[Number(x)][Number(y)].left === arrCells[Number(x) - 1][Number(y)].right) {
        return true;
      }
      return false;
    }
    if (!arrCells[Number(x)][Number(y) - 1].empty) {   //Проверка объекта верхней ячейки
      if (arrCells[Number(x)][Number(y)].top === arrCells[Number(x)][Number(y) - 1].bottom) {
        return true;
      }
      return false;
    }
    if ((arrCells[Number(x) - 1][Number(y)].empty) && (arrCells[Number(x)][Number(y) - 1].empty)) {
      return true;
    }
  }

  if ((Number(x) === 0) && (Number(y) > 0) && (Number(y) < HEIGHT - 1)) {  //Проверка крайнего левого ряда при y = (0; H - 1)
    if (!arrCells[Number(x) + 1][Number(y)].empty) {   //Проверка объекта правой ячейки
      if (arrCells[Number(x)][Number(y)].right === arrCells[Number(x) + 1][Number(y)].left) {
        return true;
      } 
      return false;
    }
    if (!arrCells[Number(x)][Number(y) - 1].empty) {   //Проверка объекта верхней ячейки
      if (arrCells[Number(x)][Number(y)].top === arrCells[Number(x)][Number(y) - 1].bottom) {
        return true;
      }
      return false;
    }
    if (!arrCells[Number(x)][Number(y) + 1].empty) {  //Проверка объекта нижней ячейки
      if (arrCells[Number(x)][Number(y)].bottom === arrCells[Number(x)][Number(y) + 1].top) {
        return true;
      } 
      return false;
    }
    if ((arrCells[Number(x) + 1][Number(y)].empty) && (arrCells[Number(x)][Number(y) - 1].empty) && (arrCells[Number(x)][Number(y) + 1].empty)) {
      return true;
    }
  }

  if ((Number(x) === WIDTH - 1) && (Number(y) > 0) && (Number(y) < HEIGHT - 1)) {  //Проверка крайнего правого ряда при y = (0; H - 1)
    if (!arrCells[Number(x) - 1][Number(y)].empty) {   //Проверка объекта левой ячейки
      if (arrCells[Number(x)][Number(y)].left === arrCells[Number(x) - 1][Number(y)].right) {
        return true;
      }
      return false;
    }
    if (!arrCells[Number(x)][Number(y) - 1].empty) {   //Проверка объекта верхней ячейки
      if (arrCells[Number(x)][Number(y)].top === arrCells[Number(x)][Number(y) - 1].bottom) {
        return true;
      }
      return false;
    }
    if (!arrCells[Number(x)][Number(y) + 1].empty) {  //Проверка объекта нижней ячейки
      if (arrCells[Number(x)][Number(y)].bottom === arrCells[Number(x)][Number(y) + 1].top) {
        return true;
      } 
      return false;
    }
    if ((arrCells[Number(x) - 1][Number(y)].empty) && (arrCells[Number(x)][Number(y) - 1].empty) && (arrCells[Number(x)][Number(y) + 1].empty)) {
      return true;
    }
  }

  if ((Number(y) === 0) && (Number(x) > 0) && (Number(x) < WIDTH - 1)) {  //Проверка крайнего верхнего ряда при x = (0; W - 1)
    if (!arrCells[Number(x)][Number(y) + 1].empty) {  //Проверка объекта нижней ячейки
      if (arrCells[Number(x)][Number(y)].bottom === arrCells[Number(x)][Number(y) + 1].top) {
        return true;
      } 
      return false;
    }
    if (!arrCells[Number(x) - 1][Number(y)].empty) {   //Проверка объекта левой ячейки
      if (arrCells[Number(x)][Number(y)].left === arrCells[Number(x) - 1][Number(y)].right) {
        return true;
      }
      return false;
    }
    if (!arrCells[Number(x) + 1][Number(y)].empty) {   //Проверка объекта правой ячейки
      if (arrCells[Number(x)][Number(y)].right === arrCells[Number(x) + 1][Number(y)].left) {
        return true;
      } 
      return false;
    }
    if ((arrCells[Number(x)][Number(y) + 1].empty) && (arrCells[Number(x) - 1][Number(y)].empty) && (arrCells[Number(x) + 1][Number(y)].empty)) {
      return true;
    }
  }

  if ((Number(y) === HEIGHT - 1) && (Number(x) > 0) && (Number(x) < WIDTH - 1)) {  //Проверка крайнего нижнего ряда при x = (0; W - 1)
    if (!arrCells[Number(x)][Number(y) - 1].empty) {   //Проверка объекта верхней ячейки
      if (arrCells[Number(x)][Number(y)].top === arrCells[Number(x)][Number(y) - 1].bottom) {
        return true;
      }
      return false;
    }
    if (!arrCells[Number(x) - 1][Number(y)].empty) {   //Проверка объекта левой ячейки
      if (arrCells[Number(x)][Number(y)].left === arrCells[Number(x) - 1][Number(y)].right) {
        return true;
      }
      return false;
    }
    if (!arrCells[Number(x) + 1][Number(y)].empty) {   //Проверка объекта правой ячейки
      if (arrCells[Number(x)][Number(y)].right === arrCells[Number(x) + 1][Number(y)].left) {
        return true;
      } 
      return false;
    }
    if ((arrCells[Number(x)][Number(y) - 1].empty) && (arrCells[Number(x) - 1][Number(y)].empty) && (arrCells[Number(x) + 1][Number(y)].empty)) {
      return true;
    }
  }

  if ((Number(x) > 0) && (Number(x) < WIDTH - 1) && (Number(y) > 0) && (Number(y) < HEIGHT - 1)) {  //Проверка всей центральной части поля(все кроме крайних рядов)
    if (!arrCells[Number(x)][Number(y) - 1].empty) {   //Проверка объекта верхней ячейки
      if (arrCells[Number(x)][Number(y)].top === arrCells[Number(x)][Number(y) - 1].bottom) {
        return true;
      }
    }
    if (!arrCells[Number(x) - 1][Number(y)].empty) {   //Проверка объекта левой ячейки
      if (arrCells[Number(x)][Number(y)].left === arrCells[Number(x) - 1][Number(y)].right) {
        return true;
      }
    }
    if (!arrCells[Number(x) + 1][Number(y)].empty) {   //Проверка объекта правой ячейки
      if (arrCells[Number(x)][Number(y)].right === arrCells[Number(x) + 1][Number(y)].left) {
        return true;
      }
    }
    if (!arrCells[Number(x)][Number(y) + 1].empty) {  //Проверка объекта нижней ячейки
      if (arrCells[Number(x)][Number(y)].bottom === arrCells[Number(x)][Number(y) + 1].top) {
        return true;
      }
    }
    if ((arrCells[Number(x)][Number(y) - 1].empty) && (arrCells[Number(x) - 1][Number(y)].empty) && 
    (arrCells[Number(x) + 1][Number(y)].empty) && (arrCells[Number(x)][Number(y) + 1].empty)) {
      return true;
    }
    return false;
  }

  // return false;

};

const refreshArr = (x, y, obj) => {
  return arrCells[x][y] = obj;
}

fieldEl.addEventListener('click', (ev) => {
  const tempId = ev.target.id;
  const CurrCardArr = tempId.split('');   //получаем массив координат y,x элемента на который положили карту
  console.log("Curr Card Coord: ", CurrCardArr);
    if (ev.target.id !== '' && !ev.target.classList.contains('busy')) {
        // let topCardArr = '';
        let topCardIndex = shuffledCardDeck.length - 1;
        for (let i = 0; i < shuffledCardDeck.length; i++) {
            let topCardArr = shuffledCardDeck[topCardIndex]; //Массив объекта верхней карты
          
            
            refreshArr(Number(CurrCardArr[0]), Number(CurrCardArr[1]), topCardArr[0]);   //передаем объект положенной карты в массив поля x,y
            // arrCells[Number(CurrCardArr[1])][Number(CurrCardArr[0])] = topCardArr[0];  //передаем объект положенной карты в массив поля x,y
            console.log(arrCells);
            // const currCoord = [Number(CurrCardArr[0]), Number(CurrCardArr[1])];
            // const leftCoord = [Number(CurrCardArr[0]) - 1, Number(CurrCardArr[1])];
            // const rightCoord = [Number(CurrCardArr[0]) + 1, Number(CurrCardArr[1])];
            // const topCoord = [Number(CurrCardArr[0]), Number(CurrCardArr[1]) - 1];
            // const bottomCoord = [Number(CurrCardArr[0]), Number(CurrCardArr[1]) + 1];

            // console.log('Curr Coord:', currCoord);
            // console.log('Left Coord:', leftCoord);
            // console.log('Right Coord:', rightCoord);
            // console.log('Top Coord:', topCoord);
            // console.log('Bottom Coord:', bottomCoord);

            // const currObj = arrCells[currCoord[0]][currCoord[1]];
            // const leftObj = arrCells[leftCoord[0]][leftCoord[1]];
            // const rightObj = arrCells[rightCoord[0]][rightCoord[1]];
            // const topObj = arrCells[topCoord[0]][topCoord[1]];
            // const bottomObj = arrCells[bottomCoord[0]][bottomCoord[1]];

            // const currObj = arrCells[Number(CurrCardArr[0])][Number(CurrCardArr[1])];
            // const leftObj = arrCells[Number(CurrCardArr[0]) - 1][Number(CurrCardArr[1])];
            // const rightObj = arrCells[Number(CurrCardArr[0]) + 1][Number(CurrCardArr[1])];
            // const topObj = arrCells[Number(CurrCardArr[0])][Number(CurrCardArr[1]) - 1];
            // const bottomObj = arrCells[Number(CurrCardArr[0])][Number(CurrCardArr[1]) + 1];

            // console.log('Curr Obj:', currObj);
            // console.log('Left Obj:', leftObj);
            // console.log('Right Obj:', rightObj);
            // console.log('Top Obj:', topObj);
            // console.log('Bottom Obj:', bottomObj);

            // if (CurrCardArr[0] == 0 && arrCells[Number(CurrCardArr[0])][Number(CurrCardArr[1]).left === true) {
            //   ev.target.classList.add('red-border');
            // }

            // if (Number(CurrCardArr[0]) > 0) {

            //   if (!arrCells[Number(CurrCardArr[0]) - 1][Number(CurrCardArr[1])].empty) {
            //     if (arrCells[Number(CurrCardArr[0])][Number(CurrCardArr[1])].left === arrCells[Number(CurrCardArr[0]) - 1][Number(CurrCardArr[1])].right) {
            //       console.log('Ok');
            //     } else {
            //       ev.target.classList.add('red-border');
            //     }
            //   }
            // }

            // if (Number(CurrCardArr[0]) < WIDTH - 1) {
            //   if (!arrCells[Number(CurrCardArr[0]) + 1][Number(CurrCardArr[1])].empty) {
            //     if (arrCells[Number(CurrCardArr[0])][Number(CurrCardArr[1])].right === arrCells[Number(CurrCardArr[0]) + 1][Number(CurrCardArr[1])].left) {
            //       console.log('Ok');
            //     } else {
            //       ev.target.classList.add('red-border');
            //     }
            //   }
            // }

            // if (Number(CurrCardArr[1]) > 0) {
            //   if (!arrCells[Number(CurrCardArr[0])][Number(CurrCardArr[1]) - 1].empty) {
            //     if (arrCells[Number(CurrCardArr[0])][Number(CurrCardArr[1])].top === arrCells[Number(CurrCardArr[0])][Number(CurrCardArr[1]) - 1].bottom) {
            //       console.log('Ok');
            //     } else {
            //       ev.target.classList.add('red-border');
            //     }
            //   }
            // }

            // if (Number(CurrCardArr[1]) < HEIGHT - 1) {

            //   if (!arrCells[Number(CurrCardArr[0])][Number(CurrCardArr[1]) + 1].empty) {
            //     if (arrCells[Number(CurrCardArr[0])][Number(CurrCardArr[1])].bottom === arrCells[Number(CurrCardArr[0])][Number(CurrCardArr[1]) + 1].top) {
            //       console.log('Ok');
            //     } else {
            //       ev.target.classList.add('red-border');
            //     }
            //   }
            // }


            const compareResult = compareFieldsAround(CurrCardArr[0], CurrCardArr[1]);
            if (!compareResult) {
              ev.target.classList.add('red-border');
            } else {
              console.log('Ok');
            }

            // console.log('Curr Coord:', Number(CurrCardArr[0]), Number(CurrCardArr[1]));
            // console.log('Left Coord:', Number(CurrCardArr[0]) - 1, Number(CurrCardArr[1]));
            // console.log('Right Coord:', Number(CurrCardArr[0]) + 1, Number(CurrCardArr[1]));
            // console.log('Top Coord:', Number(CurrCardArr[0]), Number(CurrCardArr[1]) - 1));
            // console.log('Bottom Coord:', Number(CurrCardArr[0]), Number(CurrCardArr[1]) + 1));

        
            ev.target.classList.add(`${topCardArr[0].name}`);
            ev.target.classList.add('busy');
            shuffledCardDeck.splice(topCardIndex, 1);   //убираем из колоды вытянутую карту
            renderDeck();
            leftCards();
              return;
        }
    }
    

});
