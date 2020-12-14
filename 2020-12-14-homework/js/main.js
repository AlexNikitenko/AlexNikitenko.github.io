// 1) На странице сделать поле ввода текста(textarea), а также кнопку Go.В поле вводим любой произвольный текст, разделенный пробелами.При нажатии на кнопку Go должно появится необходимое количество полей ввода, при этом каждое поле ввода будет заполнено одним словом из текста.
// 2) Найти самое длинное слово, вывести его в консоль.

const mainText = document.querySelector('.main-textarea');
const goButton = document.querySelector('.btn');
const mainEl = document.querySelector('.additional');

goButton.addEventListener("click", (event) => {
    let str = mainText.value;
    let arr = [];
    mainEl.innerHTML = "";
    for (let i = 0; i < str.length; i++) {
        if (str[i] === ' ') {
            let oneWord = str.slice(0, i);
            arr.push(oneWord);
            str = str.slice(i + 1, str.length);
            i = 0;
            let newStr = `<br><textarea class="main-textarea" name="text" id="" cols="30" rows="1">${oneWord}</textarea>`;
            mainEl.innerHTML = mainEl.innerHTML + newStr;
        }
    }
    mainEl.innerHTML = mainEl.innerHTML + `<br><textarea class="main-textarea" name="text" id="" cols="30" rows="1">${str}</textarea>`;

    arr.push(str);
    let maxLength = arr[0].length;
    let theLongestWord = '';

    for (j = 1; j < arr.length; j++) {
        if (arr[j].length > maxLength) {
            maxLength = arr[j].length;
            theLongestWord = arr[j];
        }
    }
    console.log("The Longest Word is:", theLongestWord, "Length: ", maxLength);
    return arr;
})