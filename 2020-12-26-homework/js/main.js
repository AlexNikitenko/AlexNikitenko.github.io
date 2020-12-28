const iconSpin = document.querySelector(".icon-spin3");
const btnPlay = document.querySelector(".icon-play");
const btnPause = document.querySelector(".icon-pause");
const hidden = document.querySelector(".hidden");
const inputTime = document.querySelector('.input-time');
const mainTimer = document.querySelector('.main-timer');
btnPlay.disabled = true;

let timeVal;

const runTimer = () => {

    console.log(Date.now());
    let currTime = moment();
    let destTime = moment(`${timeVal}`, 'HH:mm');
    if (moment(destTime).isBefore(currTime)) {
        destTime.add(1, 'd');
    }
    let diffTime = moment(destTime.diff(currTime));
    diffTime.subtract(3, 'h');
    console.log('difftime:', moment(diffTime).format('HH:mm:ss'));
    mainTimer.innerHTML = moment(diffTime).format('HH:mm:ss')
};

btnPlay.addEventListener("click", (evt) => {
    iconSpin.classList.add("animate-spin");
    btnPause.classList.remove("hidden");
    btnPlay.classList.add("hidden");
});

btnPause.addEventListener("click", (evt) => {
    iconSpin.classList.remove("animate-spin");
    btnPause.classList.add("hidden");
    btnPlay.classList.remove("hidden");
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
})