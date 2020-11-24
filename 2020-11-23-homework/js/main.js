// let mainElement = document.querySelector('.main');
// let width = 500;
// let height = 300;
// let color1 = 'yellow';
// let color2 = 'blue';
// mainElement.style = `width: ${width}px; height: ${height}px; background: linear-gradient(blue 50%, yellow 50%);`;

let a = document.querySelector('.variable_a');
let b = document.querySelector('.variable_b');
let c = document.querySelector('.variable_c');
let elemD = document.querySelector('.discriminant');
let buttonResult = document.querySelector('.button');

// d = b ^ 2 - 4 * a * c;
a = Number(a);
b = Number(b);
c = Number(c);
let d = b * b - 4 * a * c;
buttonResult.addEventListener("click", function(evt) {
    evt.preventDefault();
    elemD.value = d;
})


console.log(b);
// ax ^ 2 + bx + c = 0
// d = b ^ 2 - 4 ac