// Фронтенд парковки. 
// 1) Сгенерировать массив паркомест. Количество задано в константе PLACES. 
// Каждое паркоместо имеет свойства: id, occupied, time
// 3) Отобразить на странице паркоместа с указанием id, свободно/занято, 
// время занятого. 
const parkingField = document.querySelector('.parking');
const currTimeField = document.querySelector('.current-time');
const modalBooking = document.querySelector('.modal-booking');
const modalFree = document.querySelector('.modal-free');
const modalOffer = document.querySelector('.modal-offer');
const overlayField = document.querySelector('.overlay');
const stopBtn = document.querySelector('.btn-stop');
const cancelBtn = document.querySelector('.btn-cancel');
const mainTimer = document.querySelector('.timer');
const countFreeSpaces = document.querySelector('.free-spaces');
const countOcupiedSpaces = document.querySelector('.occupied-spaces');

const PLACES = 40;

const genArr = () => {
    let str = '';
    let newArr = [];
    for (let i = 0; i < PLACES; i++) {
        newArr[i] = { //Элементами массива будут объекты с полями id, occupied, time
            id: `${i+1}`,
            occupied: "Free",
            bookingTime: "00:00:00",
        };
        str = `${str}<div class="parking-space free-parking" id="#${newArr[i].id}">
        <span id="#pn${newArr[i].id}">Place<br>${newArr[i].id}</span><br>
        <span id="#oc${newArr[i].id}">${newArr[i].occupied}</span><br>
        <span id="#t${newArr[i].id}">${newArr[i].bookingTime}</span></div>`;
        parkingField.innerHTML = str;
    }

    return newArr;
};

// console.log(genArr(PLACES));

// let arr = genArr(PLACES);

// 2) Функция подсчета количества занятых и свободных паркомест

const countFreePlaces = (array) => {
    let count = 0;
    for (let i = 0; i < array.length; i++) {
        count += (array[i].occupied === "Free") ? 1 : 0;
    }
    countFreeSpaces.innerHTML = `Free Spaces: ${count}`;
    countOcupiedSpaces.innerHTML = `Booked Spaces = ${array.length-count}`;

};

console.log('Free Places: ', countFreePlaces(arr));

// 4) Также на странице отобразить текущее время

const runTimer = (array) => {
    let currTime = moment();
    const timerID = setInterval(() => {
        currTime.add(100, 'ms');
        currTimeField.innerHTML = currTime.format('HH:mm:ss');
    }, 100)
}

// runTimer(arr);

// 5) При нажатии на паркоместо, если оно пустое, появляется модальное окно 
// с полем input, в нем текущее время, которое можно исправить, это время 
// занимания парковки. При нажатии "ОК" парковка занимается. 

const getBooking = (array) => {
    const currTime = moment().format('HH:mm:ss');
    array.forEach(elem => {
        const tempEl = document.getElementById(`#${elem.id}`); //Создаем временную переменную для div'а паркоместа
        const tempTime = document.getElementById(`#t${elem.id}`); //Создаем временную переменную для времени, указанном на паркоместе
        const tempOccupied = document.getElementById(`#oc${elem.id}`); //Создаем временную переменную для статуса, указанном на паркоместе

        tempEl.addEventListener('click', () => { // Ставим обработчик на клик по паркоместу
            if (elem.occupied === "Free") { //Проверяем свободно ли паркоместо

                let freePlaces = countFreePlaces(arr);
                if (freePlaces < (PLACES * 2 / 10)) {
                    modalOffer.classList.add('modal-show'); //Добавляем модальное окно с временем для брони
                    overlayField.classList.add('modal-show'); //Добавляем оверлей
                }

                modalBooking.classList.add('modal-show'); //Добавляем модальное окно с временем для брони
                overlayField.classList.add('modal-show'); //Добавляем оверлей
                modalBooking.innerHTML = `Book your parking space:
                <input type="time" class="input-time" id="#input${elem.id}" value="${currTime}">
                <button type="button" class="btn btn-booked"id="#okbtn${elem.id}">Ok</button>`; //Наполняем модальное окно для брони уникальными Input, button
                const tempInput = document.getElementById(`#input${elem.id}`); //Временная переменная времени указанном в input
                const tempBookedBtn = document.getElementById(`#okbtn${elem.id}`); //Временная переменная кнопки ОК 

                tempBookedBtn.addEventListener('click', () => { //Ставим обработчик клика по кнопке ОК
                    modalBooking.classList.remove('modal-show');
                    overlayField.classList.remove('modal-show');
                    tempTime.innerHTML = tempInput.value; //меняем значение времени на забронированное
                    elem.bookingTime = tempInput.value;
                    // console.log(tempInput.value);
                    // let duration = moment.duration(moment().diff(tempInput.value));
                    // mainTimer.innerHTML = `${duration}`;

                    elem.occupied = `Booked`; //меняем статус на "занято"
                    tempOccupied.innerHTML = elem.occupied;
                    tempEl.classList.remove('free-parking'); //Меняем цвет парковки
                    tempEl.classList.add('booked-parking');

                })
                overlayField.addEventListener('click', () => { //Ставим обработчик клика по оверлею
                    modalBooking.classList.remove('modal-show');
                    overlayField.classList.remove('modal-show');
                    modalFree.classList.remove('modal-show');
                    modalOffer.classList.remove('modal-show');
                })
            }

            if (elem.occupied === "Booked") { //Проверяем занято ли паркоместо
                modalFree.classList.add('modal-show');
                overlayField.classList.add('modal-show');
                cancelBtn.addEventListener('click', () => {
                    modalFree.classList.remove('modal-show');
                    overlayField.classList.remove('modal-show');
                })

                stopBtn.addEventListener('click', () => {
                    modalFree.classList.remove('modal-show');
                    overlayField.classList.remove('modal-show');
                    tempEl.classList.add('free-parking'); //Меняем цвет парковки
                    tempEl.classList.remove('booked-parking');
                    elem.occupied = `Free`; //меняем статус на "свободно"
                    tempOccupied.innerHTML = elem.occupied;
                    elem.bookingTime = '00:00:00';


                })
            }
        });

    })
    return array;
};

// getBooking(arr);
console.log(getBooking(arr))

// 6) Если нажать на занятой парковке, то появляется модальное окно 
// "освободить парковку? Да/Нет. Время занимания паркоместа: столько-то".

const getParkingTime = (array) => { //Таймер для подсчета времени занятого места
    array.forEach(elem => {
        const timerID = setInterval(() => {
            let currTime = moment();
            // currTime.format('HH:mm:ss');
            let destTime = elem.bookingTime;
            let diffTime = moment().from(destTime);
            // let diffTime = destTime.diff(currTime);
            moment(diffTime.format('HH:mm:ss')).add(1000, 'ms');
            mainTimer.innerHTML = diffTime.format('HH:mm:ss');
            console.log(currTime.format('HH:mm:ss'), destTime, diffTime.format('HH:mm:ss'));
            // if (moment(destTime).isBefore(currTime) || moment(destTime).isSame(currTime)) {
            //     let diffTime = moment(currTime.diff(destTime)).utc();
            //     moment(diffTime.format('HH:mm:ss')).add(1000, 'ms');
            //     mainTimer.innerHTML = diffTime.format('HH:mm:ss');
            //     console.log(currTime.format('HH:mm:ss'), destTime.format('HH:mm:ss'));
            // } else {
            //     mainTimer.innerHTML = 'Wait for start parking time';
            // };

        }, 1000);
    })
};

// getParkingTime(arr);



// 7) При нажатии на пустой парковке, если количество свободных паркомест 
// меньше 20% от всех и при этом время занимания больше 9:00 и меньше 18:00, 
// то в модальном окне порекомендовать не занимать паркоместо.