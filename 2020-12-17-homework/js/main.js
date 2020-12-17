// 1) Сгенерировать шахматную доску, расставить фигуры. 
// 2) При нажатии на клетку в консоль пишется на какую клетку нажал и в какое время.

const chestField = document.querySelector('.chest-board');
const getCoordinateNums = document.querySelector('.coordinates--left');
const getCoordinateVerbs = document.querySelector('.coordinates--bottom');

const whiteKing = "&#9812"; //Белый король
const whiteQueen = "&#9813"; //Белый ферзь
const whiteRook = "&#9814"; //Бёлая ладья (тура)
const whiteOfficer = "&#9815"; //Белый офицер (слон)
const whiteHorse = "&#9816"; //Белый конь
const whitePawn = "&#9817"; //Белая пешка

const blackKing = "&#9818"; //Чёрный король
const blackQueen = "&#9819"; //Чёрный ферзь
const blackRook = "&#9820"; //Чёрный ладья (тура)
const blackOfficer = "&#9821"; //Чёрный офицер (слон)
const blackHorse = "&#9822"; //Чёрный конь
const blackPawn = "&#9823"; //Чёрный пешка

let fieldId = null;


const createBoard = () => {
    let arrVerb = ["a", "b", "c", "d", "e", "f", "g", "h"];
    let arrNum = [8, 7, 6, 5, 4, 3, 2, 1];
    for (let i = 0; i < arrVerb.length; i++) {
        getCoordinateNums.innerHTML = getCoordinateNums.innerHTML + `<div class="coordinate">${arrNum[i]}</div>`; //Заполняем блоки с координатами доски
        getCoordinateVerbs.innerHTML = getCoordinateVerbs.innerHTML + `<div class="coordinate">${arrVerb[i]}</div>`;

        for (let j = 0; j < arrNum.length; j++) {
            let cellId = arrVerb[j] + arrNum[i];
            fieldId = fieldId + cellId;
            let addWhiteColor = 'cell-white';
            let addBlackColor = 'cell-black';
            let addClass = '';

            let addChestPiece = '';
            if ((i % 2 === 0) & (j % 2 === 0)) { //Добавляем класс с цветом ячейки: в случае, если строка четная, то каждая четная в ней ячейка - черная, если строка нечетная, то каждая нечетная-черная
                addClass = addClass + addWhiteColor;
            } else if ((i % 2 === 0) & (j % 2 !== 0)) {
                addClass = addClass + addBlackColor;
            } else if ((i % 2 !== 0) & (j % 2 === 0)) {
                addClass = addClass + addBlackColor;
            } else if ((i % 2 !== 0) & (j % 2 !== 0)) {
                addClass = addClass + addWhiteColor;
            }

            if (i === 1) { //Добавляем белые и черные пешки
                addChestPiece = addChestPiece + blackPawn;
            } else if (i === 6) {
                addChestPiece = addChestPiece + whitePawn;
            }

            if ((cellId == "a8") || (cellId == "h8")) { //Расставляем главные ряды шахмат
                addChestPiece = addChestPiece + blackRook;
            }
            if ((cellId == "b8") || (cellId == "g8")) {
                addChestPiece = addChestPiece + blackHorse;
            }
            if ((cellId == "c8") || (cellId == "f8")) {
                addChestPiece = addChestPiece + blackOfficer;
            }
            if (cellId == "d8") {
                addChestPiece = addChestPiece + blackQueen;
            }
            if (cellId == "e8") {
                addChestPiece = addChestPiece + blackKing;
            }


            if ((cellId == "a1") || (cellId == "h1")) {
                addChestPiece = addChestPiece + whiteRook;
            }
            if ((cellId == "b1") || (cellId == "g1")) {
                addChestPiece = addChestPiece + whiteHorse;
            }
            if ((cellId == "c1") || (cellId == "f1")) {
                addChestPiece = addChestPiece + whiteOfficer;
            }
            if (cellId == "d1") {
                addChestPiece = addChestPiece + whiteQueen;
            }
            if (cellId == "e1") {
                addChestPiece = addChestPiece + whiteKing;
            }

            ((addChestPiece === whiteRook) || (addChestPiece === whiteHorse) || (addChestPiece === whiteQueen) || (addChestPiece === whiteOfficer) || (addChestPiece === whiteKing) || (addChestPiece === whitePawn)) ? chestField.innerHTML = chestField.innerHTML + `<div class="cell ${addClass} white-team" id="${cellId}">${addChestPiece}</div>`: chestField.innerHTML = chestField.innerHTML + `<div class="cell ${addClass} black-team" id="${cellId}">${addChestPiece}</div>`;;
            // chestField.innerHTML = chestField.innerHTML + `<div class="cell ${addClass}" id="${cellId}">${addChestPiece}</div>`;

        }
    }
};

createBoard();

const chestLog = (cellQuantity) => { //Функция логирования координаты клика и времени
    let cellArr = document.querySelectorAll('.cell');
    let actualTime = new Date();
    for (let i = 0; i < cellQuantity; i++) {
        cellArr[i].addEventListener("click", (event) => {
            console.log("Вы походили на поле:", cellArr[i].id, "Время хода: ", actualTime.getHours(), ": ", actualTime.getMinutes());
        })
    }

}


chestLog(64);