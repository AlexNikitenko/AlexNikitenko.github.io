// На заводе выпускаются автомобили со следующими конфигурациями: -цвет кузова: желтый, зеленый, красный, синий, оранжевый;
//  -коробка передач: автоматическая, ручная; -кондиционер: установлен, отсутствует; -отделка салона: кожа, ткань, комбинированная.
//   Задача: описать в объекте все возможные конфигурации автомобилей, при этом на каждой конфигурации указать код формата: XXXXYZWV, 
//   где: XXXX- порядковый номер конфигурации, Y- цвет кузова, Z-коробка передач, W- кондиционер, V-отделка салона.

const mainObj = {
    arr: [],
};

const cabinColor = ['yellow', 'green', 'red', 'blue', 'orange'];
const transmitionType = ['automatic', 'manual'];
const conditioneer = ['with', 'without'];
const saloonMaterial = ['leather', 'textile', 'mixed'];

function Item(y, z, w, v) {
    this.cabinColor = y;
    this.transmitionType = z;
    this.conditioneer = w;
    this.saloonMaterial = v;
}

let count = 1;

cabinColor.forEach(cabcol => {
    transmitionType.forEach(trans => {
        conditioneer.forEach(cond => {
            saloonMaterial.forEach(sal => {
                let tempObj = new Item(cabcol, trans, cond, sal);
                let tempStr = `${String(count).padStart(4, '0')}${(cabcol[0]).toUpperCase()}${(trans[0]).toUpperCase()}${(cond[0]).toUpperCase()}${(sal[0]).toUpperCase()}`;
                tempObj.code = tempStr;
                mainObj.arr.push(tempObj);
                count++;
            })
        })
    })
})

console.dir(mainObj);