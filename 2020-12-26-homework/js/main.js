const iconSpin = document.querySelector(".icon-spin3");
const btnPlay = document.querySelector(".icon-play");
const btnPause = document.querySelector(".icon-pause");
const hidden = document.querySelector(".hidden");
const inputTime = document.querySelector('.input-time');
const mainTimer = document.querySelector('.main-timer');
btnPlay.disabled = true;

let timeVal;
let checkTime;

const runTimer = () => {

    console.log(Date.now());
    let currTime = moment();
    let destTime = moment(`${timeVal}`, 'HH:mm');
    let diffTime = moment(destTime.diff(currTime)).utc();
    checkTime = diffTime;

    if (moment(destTime).isBefore(currTime)) {
        destTime.add(1, 'd');
    }

    if (diffTime.isDST()) {
        diffTime.subtract(3, 'h');
    }
    console.log('difftime:', diffTime.format('HH:mm:ss'));
    mainTimer.innerHTML = diffTime.format('HH:mm:ss');
};

let timerID;
let delay = 1000;

const timerStart = () => {
    timerID = setInterval(runTimer, 1000);
}

const timerStop = () => {
    clearInterval(timerID);
    mainTimer.innerHTML = '00:00:00';
    iconSpin.classList.remove("animate-spin");
    btnPause.classList.add("hidden");
    btnPlay.classList.remove("hidden");
}

btnPlay.addEventListener("click", (evt) => {
    iconSpin.classList.add("animate-spin");
    btnPause.classList.remove("hidden");
    btnPlay.classList.add("hidden");
});

btnPause.addEventListener("click", (evt) => {
    iconSpin.classList.remove("animate-spin");
    btnPause.classList.add("hidden");
    btnPlay.classList.remove("hidden");
    timerStop();
});

inputTime.addEventListener('input', (evt) => {
    if (evt.target.value !== "") {
        btnPlay.disabled = false;
        btnPlay.addEventListener('click', timerStart);
    } else {
        btnPlay.disabled = true;
        btnPlay.removeEventListener('click', timerStart);
    }
    timeVal = evt.target.value;
})