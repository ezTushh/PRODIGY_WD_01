// script.js
let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById("display");
const startStopButton = document.getElementById("startStop");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const laps = document.getElementById("laps");

startStopButton.addEventListener("click", startStop);
resetButton.addEventListener("click", reset);
lapButton.addEventListener("click", recordLap);

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1);
        startStopButton.textContent = "Stop";
        running = true;
    } else {
        clearInterval(tInterval);
        startStopButton.textContent = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    display.textContent = "00:00:00";
    laps.innerHTML = "";
    lapCounter = 1;
    startStopButton.textContent = "Start";
    running = false;
}

function recordLap() {
    if (running) {
        const lapTime = display.textContent;
        const lapElement = document.createElement("div");
        lapElement.textContent = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(lapElement);
        lapCounter++;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let hours = Math.floor(difference / 1000 / 60 / 60);
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / 1000 / 60);
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    milliseconds = (milliseconds < 10) ? "0" + milliseconds : milliseconds;

    display.textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
}
