import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate;

const startButton = document.querySelector("[data-start]");


flatpickr("#datetime-picker", {
    enableTime: true,
    time_24h: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        userSelectedDate = selectedDates[0];

        if (userSelectedDate > new Date()) {
            startButton.disabled = false;
        } else {
            startButton.disabled = true;
            iziToast.error({
                title: 'Error',
                message: 'Please choose a date in the future',
                position: 'topRight',
            });
        }
    },
});

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);

    const hours = Math.floor((ms % day) / hour);

    const minutes = Math.floor(((ms % day) % hour) / minute);

    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }

const timer = document.querySelector('.timer')

function addLeadingZero(value) {
    if (value < 10) {
        return value.toString().padStart(2, "0");
    } else {
        return value.toString();
    }
};


function startTimer() {
    const difference = userSelectedDate - new Date();

    if (difference > 0) {
        const { days, hours, minutes, seconds } = convertMs(difference);

        document.querySelector("[data-days]").textContent = addLeadingZero(days);
        document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
        document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
        document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);

        setTimeout(startTimer, 1000);
    } else {
        
    }
};


startButton.addEventListener("click", () => {
    if (userSelectedDate) {
        startTimer();
    } else {
        iziToast.error({
            title: 'Error',
            message: 'Please choose a date in the future',
            position: 'topRight',
        });;
    }
});