// Уровень 1) Есть два корабля, первый корабль имеет  HP (Health Points) 100, Damage 4, второй корабль имеет HP 40, damage 15. Описать объектами.
// В одной итерации стреляют друг в друга. Вывести лог боя. Определить победителя. 
// Уровень 2) Два флота, во флотах 4 типа кораблей: эсминцы hp 45 dmg 10, линкоры hp 100 dmg 4, авианосцы hp 15 dmg 40, крейсеры hp 60 dmg 8. 
// Создаются флот из 10 кораблей случайного типа. Выстрел по случайному кораблю, погрешность повреждения +20%/-20%. 
// Уровень 3) Флотов больше двух.


// Уровень 1) Есть два корабля, первый корабль имеет  HP (Health Points) 100, Damage 4, второй корабль имеет HP 40, damage 15. Описать объектами.
// В одной итерации стреляют друг в друга. Вывести лог боя. Определить победителя. 

const firstVessel = {
    HP: 100,
    Damage: 4,
}

const secondVessel = {
    HP: 40,
    Damage: 15,
}

let str = '';

const battle = () => {
    let firstHP = firstVessel.HP;
    let secondHP = secondVessel.HP;
    let damageFirst = firstVessel.Damage;
    let damageSecond = secondVessel.Damage;
    console.log('HP первого корабля:', firstHP, '; HP второго корабля:', secondHP, '; Урон, наносимый первым кораблем:', damageFirst, '; Урон, наносимый вторым кораблем:', damageSecond);
    str = str + `HP первого корабля: ${firstHP}; HP второго корабля: ${secondHP}; Урон, наносимый первым кораблем: ${damageFirst}, Урон, наносимый вторым кораблем: ${damageSecond}`;
    while ((firstHP > 0) && (secondHP > 0)) {
        secondHP = secondHP - damageFirst;
        console.log('Первый корабль делает выстрел:', damageFirst, 'У второго остается HP:', secondHP)
        str = str + `<br> Первый корабль делает выстрел: ${damageFirst}, 'У второго остается HP: ${secondHP}`
        firstHP = firstHP - damageSecond;
        console.log('Второй корабль делает выстрел:', damageSecond, 'У первого остается HP:', firstHP)
        str = str + `<br> Второй корабль делает выстрел:: ${damageSecond}, 'У первого остается HP: ${firstHP}`
    }
    return (firstHP > 0) ? 'Победил первый корабль!' : 'Победил второй корабль!';
};

console.log(battle());
str = str + `<br> ${battle()}`;

let mainEl = document.querySelector('.main');

mainEl.innerHTML = str;

// Уровень 2) Два флота, во флотах 4 типа кораблей: эсминцы hp 45 dmg 10, линкоры hp 100 dmg 4, авианосцы hp 15 dmg 40, крейсеры hp 60 dmg 8. 
// Создаются флот из 10 кораблей случайного типа. Выстрел по случайному кораблю, погрешность повреждения +20%/-20%. 

const randomInt = (min, max) => {
    //случайное число от min до (max+1)
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
};

const destoyer = {
    name: "destoyer",
    HP: 45,
    Damage: 10,
    type: 1,
}

const battleship = {
    name: "battleship",
    HP: 100,
    Damage: 4,
    type: 2,
}

const aircraftCarrier = {
    name: "aircraftCarrier",
    HP: 15,
    Damage: 40,
    type: 3,
}

const cruiser = {
    name: "cruiser",
    HP: 60,
    Damage: 8,
    type: 4,
}

const randomFleet = (quantity) => {
    let fleet = [];
    let shipTypes = [destoyer, battleship, aircraftCarrier, cruiser];
    for (let i = 0; i < quantity; i++) {
        fleet[i] = shipTypes[randomInt(0, 3)];

    }
    return fleet;
};

const fleetHP = (fleetName) => {
    let sum = 0;
    for (let i = 0; i < (fleetName.length - 1); i++) {
        sum = sum + fleetName[i].HP;
    }
    return sum;
};

let firstFleet = randomFleet(10);
let secondFleet = randomFleet(10);

let firstFleetSumHP = fleetHP(firstFleet);
let secondFleetSumHP = fleetHP(secondFleet);

console.log("First Fleet: ", firstFleet, "Second Fleet: ", secondFleet);


console.log("First Fleet summary HP: ", firstFleetSumHP, "Second Fleet summary HP: ", secondFleetSumHP);

const shoot = (fleetName1, fleetName2) => {
    let firstTeamRandomShip = fleetName1[randomInt(0, 9)];
    let secondTeamRandomShip = fleetName2[randomInt(0, 9)];
    if ((firstTeamRandomShip.HP > 0) && (secondTeamRandomShip.HP > 0)) {
        firstTeamRandomShip.HP = firstTeamRandomShip.HP - randomInt((secondTeamRandomShip.Damage * 8 / 10), (secondTeamRandomShip.Damage * 12 / 10));
        secondTeamRandomShip.HP = secondTeamRandomShip.HP - randomInt((firstTeamRandomShip.Damage * 8 / 10), (firstTeamRandomShip.Damage * 12 / 10));
    } else if (firstTeamRandomShip.HP < 0) {
        firstTeamRandomShip.status = "died";
    } else if (secondTeamRandomShip.HP < 0) {
        secondTeamRandomShip.status = "died";
    }

    let str = `Первый выстрел: команда 1 - стреляет ${firstTeamRandomShip.name}; команда 2 - стреляет ${secondTeamRandomShip.name}; `
    return str;
}

const battleWar = (fleetName1, fleetName2) => {
    let firstFleetHP = fleetHP(fleetName1);
    let secondFleetHP = fleetHP(fleetName2);
    while ((firstFleetHP > 0) && (secondFleetHP > 0)) {
        shoot(fleetName1, fleetName2);
        firstFleetHP = fleetHP(fleetName1);
        secondFleetHP = fleetHP(fleetName2);
    };
    return (firstFleetHP > 0) ? `${firstFleetHP}; ${secondFleetHP}, Победил первый флот` : `${firstFleetHP}; ${secondFleetHP}, Победил второй флот`;
};



console.log(battleWar(firstFleet, secondFleet));