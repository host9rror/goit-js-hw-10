import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', onFormSubmit);

function createDelayedPromise(delay, shouldFulfill) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFulfill) {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
};

function onFormSubmit(e) {
    e.preventDefault();

    const delay = parseInt(document.querySelector('input[name="delay"]').value);

    const shouldFulfill = document.querySelector('input[name="state"]:checked').value === "fulfilled";

    createDelayedPromise(delay,  shouldFulfill)
      .then((delay) => {
        const message = `✅ Fulfilled promise in ${delay}ms`;
        iziToast.success({
            title: "Success",
            message: message,
            position: "topRight",
        })
      })
      .catch((delay) => {
        const message = `❌ Rejected promise in ${delay}ms`;
        iziToast.error({
            title: "Error",
            message: message,
            position: "topRight",
        })
      })
};