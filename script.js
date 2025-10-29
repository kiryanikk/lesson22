const startBtnSelector = '.button__start';
const stopBtnSelector = '.button__stop';
const hoursInputSelector = '#hours';
const minutesInputSelector = '#minutes';
const secondsInputSelector = '#seconds';

const startBtn = document.querySelector(startBtnSelector);
const stopBtn = document.querySelector(stopBtnSelector);
const hoursInput = document.querySelector(hoursInputSelector);
const minutesInput = document.querySelector(minutesInputSelector);
const secondsInput = document.querySelector(secondsInputSelector);

const delaySeconds = 1;

let intervalId;
let remainingTime;

let hours;
let minutes;
let seconds;

function startTimer(event) {
    setTimeout(() => {
        stopBtn.style.opacity = 0.1        
    }, 500);

    event.preventDefault();
    hours = parseInt(hoursInput.value);
    minutes = parseInt(minutesInput.value);
    seconds = parseInt(secondsInput.value);

    remainingTime = hours * 3600 + minutes * 60 + seconds;

    intervalId = setInterval(updateTimer, delaySeconds * 1000);

    document.documentElement.requestFullscreen();

    hideElement(startBtn);
    showElement(stopBtn);
}

function updateTimer() {
    if (remainingTime > 0) {
        remainingTime --;

        hours = Math.floor(remainingTime / 3600);
        minutes = Math.floor(remainingTime % 3600 / 60);
        seconds = remainingTime % 60;

        hoursInput.value = hours.toString().padStart(2, '0');
        minutesInput.value = minutes.toString().padStart(2, '0');;
        secondsInput.value = seconds.toString().padStart(2, '0');;        
    } else {
        stopTimer();
    }

}

function stopTimer() {

    clearInterval(intervalId);
    hideElement(stopBtn);

    setTimeout(() => {
        document.exitFullscreen();
        showElement(startBtn);
    }, 1000)
    
}

function hideElement(element) {
    element.classList.add("hide");
}

function showElement(element) {
    element.classList.remove("hide");
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);