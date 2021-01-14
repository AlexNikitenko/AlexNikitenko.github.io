// Фронтенд парковки. 
// 1) Сгенерировать массив паркомест. Количество задано в константе PLACES. 
// Каждое паркоместо имеет свойства: id, occupied, time
const mainEl = document.querySelector('.main');
const currTimeEl = document.querySelector('.current-time');
const carinEl = document.querySelector('.car-in');
const caroutEl = document.querySelector('.car-out');
const overlayEl = document.querySelector('.overlay');
const btnCloseEls = document.querySelectorAll('.modal-close');
const inpFromTimeEl = document.querySelector('.from-time');
const btnOkEl = document.querySelector('.btn-ok');
const btnYesEl = document.querySelector('.btn-yes');
const btnNoEl = document.querySelector('.btn-no');
const occuTimeEl = document.querySelector('.occu-time');
const freeSpacesEl = document.querySelector('.free-spaces');
const occupiedSpacesEl = document.querySelector('.occupied-spaces');
const messageEl = document.querySelector('.message');

const PLACES = 33;
let timerID;
const arrPlaces = [];

// let timeVal;

const generatePlaces = () => {
    for (let i = 0; i < PLACES; i++) {
        arrPlaces.push({
            id: i,
            occupied: false,
            time: '--:--',
        })
    }
}

generatePlaces();

// 2) Функция подсчета количества занятых и свободных паркомест

const occuPlaces = () => {
    return arrPlaces.reduce((sum, val) => {
        if (val.occupied) sum += 1;
        return sum;
    }, 0)
};

const refreshInfoBoard = () => {
    let temp = occuPlaces();
    occupiedSpacesEl.innerHTML = `Occupied Spaces: ${temp}`;
    freeSpacesEl.innerHTML = `Free Spaces: ${arrPlaces.length - temp}`;
}

refreshInfoBoard();

// 3) Отобразить на странице паркоместа с указанием id, свободно/занято, 
// время занятого. 

const renderParkPlaces = () => {
    mainEl.innerHTML = arrPlaces.reduce((str, el) => {
        return `${ str }
          <div id="${ el.id }" class="parking-space free-parking">
            ${el.id} <br>
            ${el.occupied ? 'occupied' : 'free'} <br>
            ${el.time}
          </div>
          `;
    }, '');

}

renderParkPlaces();

// console.log('Free Places: ', countFreePlaces(arr));

// 4) Также на странице отобразить текущее время

const runTimer = () => {

    timerID = setInterval(() => {
        let currTime = moment();
        currTimeEl.innerHTML = currTime.format('DD-MM-YY HH:mm:ss');
    }, 100)
}

runTimer();

// 5) При нажатии на паркоместо, если оно пустое, появляется модальное окно 
// с полем input, в нем текущее время, которое можно исправить, это время 
// занимания парковки. При нажатии "ОК" парковка занимается. 


// 6) Если нажать на занятой парковке, то появляется модальное окно 
// "освободить парковку? Да/Нет. Время занимания паркоместа: столько-то".


// 7) При нажатии на пустой парковке, если количество свободных паркомест 
// меньше 20% от всех и при этом время занимания больше 9:00 и меньше 18:00, 
// то в модальном окне порекомендовать не занимать паркоместо.

const removeModalShow = () => {
    carinEl.classList.remove('modal-show');
    caroutEl.classList.remove('modal-show');
    overlayEl.classList.remove('modal-show');
};

btnCloseEls.forEach(element => {
    element.addEventListener('click', removeModalShow);
});

mainEl.addEventListener('click', (ev) => {
    if (ev.target.id !== '') {
        let i = Number(ev.target.id);
        let tempOccuPlaces = occuPlaces();
        let tempFreePlaces = PLACES - tempOccuPlaces;

        if (!arrPlaces[i].occupied) {
            carinEl.classList.add('modal-show');
            overlayEl.classList.add('modal-show');
            inpFromTimeEl.value = moment().format('HH:mm');

            inpFromTimeEl.addEventListener('input', (evt) => {
                let timeVal = evt.target.value;
                let startTime = '09:00';
                let endTime = '18:00';
                let timeFormat = "HH:mm";

                if (moment(timeVal, timeFormat).isBetween(moment(startTime, timeFormat), moment(endTime, timeFormat)) &&
                    (tempFreePlaces <= (PLACES * 2 / 10))) {
                    messageEl.innerHTML = 'We recommend not to occupy a parking space due to the small number of free spaces';
                } else {
                    messageEl.innerHTML = 'Book your parking space:';
                }
            })

            const clickBtnOk = () => {

                arrPlaces[i].time = inpFromTimeEl.value;
                arrPlaces[i].occupied = true;
                removeModalShow();
                renderParkPlaces();
                refreshInfoBoard();
                btnOkEl.removeEventListener('click', clickBtnOk);
            }
            btnOkEl.addEventListener('click', clickBtnOk);

        } else {
            caroutEl.classList.add('modal-show');
            overlayEl.classList.add('modal-show');
            let currTime = moment();
            let destTime = moment(arrPlaces[i].time, 'HH:mm');
            occuTimeEl.innerHTML = moment(currTime - destTime).utc().format('HH:mm');

            const clickBtnYes = () => {
                arrPlaces[i].time = '--:--';
                arrPlaces[i].occupied = false;
                removeModalShow();
                renderParkPlaces();
                refreshInfoBoard();
                btnYesEl.removeEventListener('click', clickBtnYes);
            };

            const clickBtnNo = () => {
                removeModalShow();
                btnNoEl.removeEventListener('click', clickBtnNo);
            };

            btnYesEl.addEventListener('click', clickBtnYes);
            btnNoEl.addEventListener('click', clickBtnNo);

        }
    }


})