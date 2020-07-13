class CountdownTimer {
  constructor({ selector, targetDate, interval = null, isActive = false }) {
    this._refs = this._getRefs(selector);
    this._targetDate = targetDate;
    this._interval = interval;
    this._isActive = isActive;
    this._bindEvents();
  }
  _getRefs(root) {
    const refs = {};
    refs.startBtn = document.querySelector(`${root} [data-action-start]`);
    refs.stopBtn = document.querySelector(`${root} [data-action-stop]`);
    refs.days = document.querySelector(`${root} [data-value="days"]`);
    refs.hours = document.querySelector(`${root} [data-value="hours"]`);
    refs.mins = document.querySelector(`${root} [data-value="mins"]`);
    refs.secs = document.querySelector(`${root} [data-value="secs"]`);
    return refs;
  }

  _bindEvents() {
    this._refs.startBtn.addEventListener('click', this._start.bind(this));
    this._refs.stopBtn.addEventListener('click', this._stop.bind(this));
  }
  _start() {
    if (this.isActive) {
      return;
    }
    this._isActive = true;
    const startTime = this._targetDate;
    this._interval = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      this._updateClockface(deltaTime);
    }, 1000);
  }
  _stop() {
    clearInterval(this._interval);
    this._interval = null;
    this._isActive = false;
  }
  _updateClockface(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    this._refs.days.textContent = days;
    this._refs.hours.textContent = hours;
    this._refs.mins.textContent = mins;
    this._refs.secs.textContent = secs;
  }
  pad(value) {
    return String(value).padStart(2, '0');
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('2020, 08, 31'),
});
