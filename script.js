// script.js
let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsContainer = document.getElementById('laps');

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const minutes = String(Math.floor((elapsedTime / 60000) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((elapsedTime / 1000) % 60)).padStart(2, '0');
    const milliseconds = String(Math.floor((elapsedTime % 1000) / 10)).padStart(2, '0');
    display.textContent = `${minutes}:${seconds}:${milliseconds}`;
}

function startStop() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        startStopBtn.textContent = 'Start';
    } else {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 10);
        running = true;
        startStopBtn.textContent = 'Stop';
    }
}

function reset() {
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    startStopBtn.textContent = 'Start';
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = display.textContent;
        const lapElement = document.createElement('li');
        lapElement.textContent = `Lap ${lapsContainer.children.length + 1}: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);