export class Timer {
    constructor(workMinutes, breakMinutes) {
        this.workDuration = workMinutes * 60;
        this.breakDuration = breakMinutes * 60;
        this.timeLeft = this.workDuration;
        this.isRunning = false;
        this.isWorkPhase = true;
        this.interval = null;
    }

    start(onTick, onPhaseChange) {
        if (!this.isRunning) {
            this.isRunning = true;
            this.interval = setInterval(() => {
                this.timeLeft--;
                onTick(this.timeLeft);

                if (this.timeLeft <= 0) {
                    this.switchPhase();
                    onPhaseChange(this.isWorkPhase);
                }
            }, 1000);
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.interval);
    }

    reset() {
        this.pause();
        this.isWorkPhase = true;
        this.timeLeft = this.workDuration;
    }

    switchPhase() {
        this.isWorkPhase = !this.isWorkPhase;
        this.timeLeft = this.isWorkPhase ? this.workDuration : this.breakDuration;
    }

    updateDurations(workMinutes, breakMinutes) {
        this.workDuration = workMinutes * 60;
        this.breakDuration = breakMinutes * 60;
        this.reset();
    }
}