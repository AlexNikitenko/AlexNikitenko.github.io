let iconSpin = document.querySelector(".icon-spin3");
let play = document.querySelector(".icon-play");
let pause = document.querySelector(".icon-pause");
let hidden = document.querySelector(".hidden");


play.addEventListener("click", function(evt) {
    evt.preventDefault();
    iconSpin.classList.add("animate-spin");
    pause.classList.remove("hidden");
    play.classList.add("hidden");
});


pause.addEventListener("click", function(evt) {
    evt.preventDefault();
    iconSpin.classList.remove("animate-spin");
    pause.classList.add("hidden");
    play.classList.remove("hidden");
});