const iconSpin = document.querySelector(".icon-spin3");
const btnPlay = document.querySelector(".icon-play");
const btnStop = document.querySelector(".icon-pause");
const hidden = document.querySelector(".hidden");
const inputTime = document.querySelector('.input-time');
const mainTimer = document.querySelector('.main-timer');
btnPlay.disabled = true;

let timeVal;

const runTimer = () => {

    const timerID = setInterval(() => {
        let currTime = moment();
        let destTime = moment(`${timeVal}`, 'HH:mm');
        if (moment(destTime).isBefore(currTime)) {
            destTime.add(1, 'd');
        }
        let diffTime = moment(destTime.diff(currTime)).utc();
        if (diffTime.isDST()) {
            diffTime.subtract(3, 'h');
        }
        moment(diffTime.format('HH:mm:ss')).subtract(100, 'ms');
        mainTimer.innerHTML = diffTime.format('HH:mm:ss');
        if (diffTime.format('HH:mm:ss') === '00:00:00') {
            clearInterval(timerID);
            iconSpin.classList.remove("animate-spin");
            btnStop.classList.add("hidden");
            btnPlay.classList.remove("hidden");
        }
    }, 100)
    btnStop.addEventListener("click", (evt) => {
        mainTimer.innerHTML = '00:00:00';
        iconSpin.classList.remove("animate-spin");
        btnStop.classList.add("hidden");
        btnPlay.classList.remove("hidden");
        clearInterval(timerID);
    });
};

btnPlay.addEventListener("click", (evt) => {
    iconSpin.classList.add("animate-spin");
    btnStop.classList.remove("hidden");
    btnPlay.classList.add("hidden");
});

inputTime.addEventListener('input', (evt) => {
    if (evt.target.value !== "") {
        btnPlay.disabled = false;
        btnPlay.addEventListener('click', runTimer);

    } else {
        btnPlay.disabled = true;
        btnPlay.removeEventListener('click', runTimer);
    }
    timeVal = evt.target.value;
});