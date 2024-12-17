let timer;
let isRunning = false;
let minutes = 25;
let seconds = 0;

const minutesDisplay = document.getElementById("minutes");
const secondsDisplay = document.getElementById("seconds");
const timerCircle = document.getElementById("timer-circle");

const updateDisplay = () => {
  minutesDisplay.textContent = String(minutes).padStart(2, "0");
  secondsDisplay.textContent = String(seconds).padStart(2, "0");
};

// Add a bounce animation to the timer circle
const animateCircle = () => {
  timerCircle.classList.add("bounce");
  setTimeout(() => timerCircle.classList.remove("bounce"), 400);
};

const startTimer = () => {
  if (!isRunning) {
    isRunning = true;
    animateCircle(); // Add animation when starting
    timer = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(timer);
          isRunning = false;
          alert("Time's up!");
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
  animateCircle(); // Add animation when pausing
};

const resetTimer = () => {
  clearInterval(timer);
  isRunning = false;
  minutes = 25;
  seconds = 0;
  updateDisplay();
  animateCircle(); // Add animation when resetting
};

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

updateDisplay();
