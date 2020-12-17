// 2)на кнопку "?" вешаем обработчик: при нажатии на кнопку берется 
// введенное число в первый input, суммируется с числом во втором input-е 
// и ответ выводится в div
// 3) создаем переключатель в 4х кнопках. По умолчанию подсвечена первая, 
// но если нажать на вторую выделение с первой уберется и будет подсвечена 
// вторая кнопка. Аналогично 3 и 4-я.

const button5 = document.querySelector('.btn5');
const input1 = document.querySelector('.input1');
const input2 = document.querySelector('.input2');
const resultBlock = document.querySelector('.additional-block');
const smallButtons = document.querySelectorAll('.btn');

const button1 = document.querySelector('.btn1');
const button2 = document.querySelector('.btn2');
const button3 = document.querySelector('.btn3');
const button4 = document.querySelector('.btn4');

console.log(smallButtons);

const lightedBtn = (arr) => {
    for (let i = 0; i < smallButtons.length; i++) {
        smallButtons[i].addEventListener("click", (event) => {
            smallButtons[0].style.backgroundColor = "transparent";
            smallButtons[1].style.backgroundColor = "transparent";
            smallButtons[2].style.backgroundColor = "transparent";
            smallButtons[3].style.backgroundColor = "transparent";
            event.target.style.backgroundColor = "Yellow";
        })
    }
};

lightedBtn(smallButtons);

const calculator = () => {
    let button1 = "+";
    let button2 = "-";
    let button3 = "*";
    let button4 = "/";
    button5.addEventListener("click", (event) => {
        let inputData1 = Number(input1.value);
        let inputData2 = Number(input2.value);
        if button1.visit
        resultBlock.innerHTML = inputData1 + inputData2;
    })
    for (let i = 0; i < smallButtons.length; i++) {
        smallButtons[i].addEventListener("click", (event) => {
            smallButtons[0].style.backgroundColor = "transparent";
            smallButtons[1].style.backgroundColor = "transparent";
            smallButtons[2].style.backgroundColor = "transparent";
            smallButtons[3].style.backgroundColor = "transparent";
            event.target.style.backgroundColor = "Yellow";
        })
    }
};

button5.addEventListener("click", (event) => {
    let inputData1 = Number(input1.value);
    let inputData2 = Number(input2.value);
    if button1.visit
    resultBlock.innerHTML = inputData1 + inputData2;
})