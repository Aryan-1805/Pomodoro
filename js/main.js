import { Timer } from './timer.js';
import { 
    formatTime, 
    updateDisplay, 
    updatePhaseLabel, 
    updateButtonStates,
    requestNotificationPermission,
    sendNotification
} from './utils.js';

let timer;

function initializeTimer() {
    const workDuration = parseInt(document.getElementById('workDuration').value);
    const breakDuration = parseInt(document.getElementById('breakDuration').value);
    timer = new Timer(workDuration, breakDuration);
    
    updateDisplay(formatTime(timer.timeLeft));
    updatePhaseLabel(timer.isWorkPhase);
    updateButtonStates(false);
    requestNotificationPermission();
}

function setupEventListeners() {
    document.getElementById('startBtn').addEventListener('click', () => {
        timer.start(
            (timeLeft) => updateDisplay(formatTime(timeLeft)),
            (isWorkPhase) => {
                updatePhaseLabel(isWorkPhase);
                sendNotification(
                    isWorkPhase ? 'Work Time!' : 'Break Time!',
                    {
                        body: isWorkPhase 
                            ? 'Time to focus on your work.' 
                            : 'Time for a break!',
                        icon: '/favicon.ico'
                    }
                );
            }
        );
        updateButtonStates(true);
    });

    document.getElementById('pauseBtn').addEventListener('click', () => {
        timer.pause();
        updateButtonStates(false);
    });

    document.getElementById('resetBtn').addEventListener('click', () => {
        timer.reset();
        updateDisplay(formatTime(timer.timeLeft));
        updatePhaseLabel(true);
        updateButtonStates(false);
    });

    ['workDuration', 'breakDuration'].forEach(id => {
        const input = document.getElementById(id);
        input.addEventListener('change', () => {
            const workDuration = parseInt(document.getElementById('workDuration').value);
            const breakDuration = parseInt(document.getElementById('breakDuration').value);
            timer.updateDurations(workDuration, breakDuration);
            updateDisplay(formatTime(timer.timeLeft));
        });
        
        // Add input validation
        input.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            if (value < 1) e.target.value = 1;
            if (value > 60) e.target.value = 60;
        });
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeTimer();
    setupEventListeners();
});