let a = '';
let b = '';
let str = ''

for (let i = 2; i <= 14; i++) {
    if (i % 2 === 0) {
        a = a + ' ' + i;
        console.log(i);
    }
}
for (let i = 33; i <= 45; i++) {
    if (i % 3 === 0) {
        b = b + ' ' + i;
        console.log(i);
    }
}

str = `nums: ${a},${b}`
console.log(str);