let a = '';
let b = '';
let c = '';
let str = ''

for (let i = 2; i <= 14; i++) {
    if (i % 2 === 0) {
        a = a + ' ' + i;
    }
}
for (let i = 9991999; i <= 9992011; i++) {
    if (i % 3 === 0) {
        b = b + ' ' + i;
    }
}
for (let i = 10002223335; i <= 10002223350; i++) {
    if (i % 5 === 0) {
        c = c + ' ' + i;
    }
}

str = `nums: ${a},${b},${c}`
console.log(str);