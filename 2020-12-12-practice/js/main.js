const mainEl = document.querySelector('.main');

const genTable = (quantity) => {
    let str = '';
    for (let i = 1; i < quantity + 1; i++) {
        str = str + `<div class="cell-in" id="${i}"></div>`;
        // console.log(str);

    }
    return str;
};

let str1 = genTable(144);
mainEl.innerHTML = str1;

document.addEventListener('click', (event) => {
    event.target.style.backgroundColor = "Yellow";
})

