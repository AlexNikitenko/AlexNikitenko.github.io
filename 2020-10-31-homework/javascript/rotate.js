let iconSpin = document.querySelector(".icon-spin3");
let play = document.querySelector(".icon-play");
let pause = document.querySelector(".icon-pause");


play.addEventListener("click", function(evt) {
    evt.preventDefault();
    iconSpin.classList.add("animate-spin");
    play.classList.remove("icon-play");
    play.classList.add("icon-pause");
});


pause.addEventListener("click", function(evt) {
    evt.preventDefault();
    iconSpin.classList.remove("animate-spin");
    pause.classList.remove("icon-pause");
    pause.classList.add("icon-play");
});