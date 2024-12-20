let timer;
let isRunning = false;
let isWorkInterval = true;
let workMinutes = 25;
let breakMinutes = 5;
let minutes = workMinutes;
let seconds = 0;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const timerCircle = document.getElementById("timer-circle");
const workTimeInput = document.getElementById("work-time");
const breakTimeInput = document.getElementById("break-time");

const updateDisplay = () => {
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
};

const animateCircle = () => {
  timerCircle.classList.add("bounce");
  setTimeout(() => timerCircle.classList.remove("bounce"), 400);
};

const startTimer = () => {
  if (!isRunning) {
    isRunning = true;
    animateCircle();
    timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          isRunning = false;
          isWorkInterval = !isWorkInterval;
          alert(isWorkInterval ? "Time for a break!" : "Back to work!");
          minutes = isWorkInterval ? workMinutes : breakMinutes;
          seconds = 0;
          updateDisplay();
          return;
        } else {
          minutes--;
          seconds = 59;
        }
      } else {
        seconds--;
      }
      updateDisplay();
    }, 1000);
  }
};

const pauseTimer = () => {
  clearInterval(timer);
  isRunning = false;
  animateCircle();
};

const resetTimer = () => {
  clearInterval(timer);
  isRunning = false;
  isWorkInterval = true;
  workMinutes = parseInt(workTimeInput.value, 10) || 25;
  breakMinutes = parseInt(breakTimeInput.value, 10) || 5;
  minutes = workMinutes;
  seconds = 0;
  updateDisplay();
  animateCircle();
};

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

updateDisplay();
