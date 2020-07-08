const refs = {
  startBtn: document.querySelector('button[data-action-start]'),
  stopBtn: document.querySelector('button[data-action-stop]'),
  days: document.querySelector('span[data-value="days"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  mins: document.querySelector('span[data-value="mins"]'),
  secs: document.querySelector('span[data-value="secs"]'),
};

// new CountdownTimer({
//   selector: '#timer-1',
//   targetDate: new Date('Jul 31, 2020'),
// });

// console.log(CountdownTimer.targetDate);
const timer = {
  intervald: null,
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    const startTime = new Date('Jul 31, 2020');
    this.intervald = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      updateClockface(deltaTime);
    }, 1000);
  },
  stop() {
    clearInterval(this.intervald);
    this.intervald = null;
    this.isActive = false;
  },
};
// timer.start();

refs.startBtn.addEventListener('click', timer.start.bind(timer));
refs.stopBtn.addEventListener('click', timer.stop.bind(timer));

function updateClockface(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(
    Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  );
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.mins.textContent = mins;
  refs.secs.textContent = secs;
}
function pad(value) {
  return String(value).padStart(2, '0');
}
