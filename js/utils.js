export function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return {
        minutes: mins.toString().padStart(2, '0'),
        seconds: secs.toString().padStart(2, '0')
    };
}

export function updateDisplay(timeObj) {
    document.getElementById('minutes').textContent = timeObj.minutes;
    document.getElementById('seconds').textContent = timeObj.seconds;
    // Add title update for better UX
    document.title = `${timeObj.minutes}:${timeObj.seconds} - Pomodoro Timer`;
}

export function updatePhaseLabel(isWorkPhase) {
    const label = isWorkPhase ? 'Work Time' : 'Break Time';
    const phaseLabel = document.getElementById('phaseLabel');
    phaseLabel.textContent = label;
    
    // Update timer background based on phase
    const timer = document.querySelector('.timer');
    timer.style.background = isWorkPhase 
        ? 'linear-gradient(135deg, #4a90e2, #357abd)'
        : 'linear-gradient(135deg, #5cb85c, #449d44)';
}

export function updateButtonStates(isRunning) {
    document.getElementById('startBtn').disabled = isRunning;
    document.getElementById('pauseBtn').disabled = !isRunning;
}

// Add notification support
export function requestNotificationPermission() {
    if ('Notification' in window) {
        Notification.requestPermission();
    }
}

export function sendNotification(title, options) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, options);
    }
}