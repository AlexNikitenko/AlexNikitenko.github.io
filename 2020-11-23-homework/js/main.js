let a = 3;
let b = -14;
let c = -5;

let mainDiv = document.querySelector('.main');

let d = b * b - (4 * a * c);

if (d < 0) {
    mainDiv.innerHTML = `Квадратное уравнение: ${(a)}x2 + ${(b)}x + ${(c)} = 0;
    <br>n\ Найдем дискриминант: D = b*b - 4ac = (${b})*(${b})-4*(${a})*(${c}) = ${d};;
    <br>D < 0, корней нет`
} else if (d === 0) {
    let x = (-b) / 2 * a;
    mainDiv.innerHTML = `Квадратное уравнение: ${(a)}x2 + ${(b)}x + ${(c)} = 0;
    <br>Найдем дискриминант: D = b*b - 4ac = (${b})*(${b})-4*(${a})*(${c}) = ${d};;
    <br>D = 0, корень один;
    <br>Корень: x = (-b)/2a = ${-b/(2*a)}`
} else {
    let x1 = (-b + Math.sqrt(d)) / (2 * a);
    let x2 = (-b - Math.sqrt(d)) / (2 * a);
    mainDiv.innerHTML = `Квадратное уравнение: (${a})x2 + (${b})x + (${(c)}) = 0;
    <br> Найдем дискриминант: D = b*b - 4ac = (${b})*(${b})-4*(${a})*(${c}) = ${d};
    <br> D > 0, корней два;
    <br> Корень: x1 = (-b + √d)/2a = -(${b}) + √${d})/2${a} = ${x1};
    <br> x2 = (-b - √d)/2a = -(${b}) - √${d})/2${a} = ${x2}`
}