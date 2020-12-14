// 1) На странице сделать поле ввода текста(textarea), а также кнопку Go.В поле вводим любой произвольный текст, разделенный пробелами.При нажатии на кнопку Go должно появится необходимое количество полей ввода, при этом каждое поле ввода будет заполнено одним словом из текста.
// 2) Найти самое длинное слово, вывести его в консоль.
// 3) С помощью имеющихся слов создать предложение ровно в 30 символов.

const mainText = document.querySelector('.main-textarea');
const goButton = document.querySelector('.btn');
const mainEl = document.querySelector('.main');

goButton.addEventListener("click", (event) => {
    let str = mainText.value;
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            let oneWord = str.slice(0, i);
            str = str.slice(i + 1, str.length);
            i = 0;
            let newStr = `<br><textarea class="main-textarea" name="text" id="" cols="30" rows="1">${oneWord}</textarea>`;
            mainEl.innerHTML = mainEl.innerHTML + newStr;
        }
    }
    mainEl.innerHTML = mainEl.innerHTML + `<br><textarea class="main-textarea" name="text" id="" cols="30" rows="1">${str}</textarea>`
    return mainEl.innerHTML;
})