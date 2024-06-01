import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
});

startButton.disabled = true;
startButton.addEventListener('click', onStartClick);
dateTimePicker.addEventListener('change', onDateChange);

let selectedDateTime = null;
let intervalId = null;

function onStartClick(event) {
  event.preventDefault();

  const timeDiff = selectedDateTime - new Date();

  if (timeDiff < 0) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    return;
  }

  startButton.disabled = true;

  intervalId = setInterval(() => {
    const diff = selectedDateTime - new Date();

    if (diff <= 0) {
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      clearInterval(intervalId);

      startButton.disabled = false;

      iziToast.success({
        title: 'Success',
        message: 'Timer finished',
      });
      return;
    }

    updateTimer(convertMs(diff));
  }, 1000);
}

function onDateChange(event) {
  selectedDateTime = new Date(event.target.value);
  startButton.disabled = false;
}

function updateTimer({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
