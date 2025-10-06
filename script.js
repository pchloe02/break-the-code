import {
  getInputsValues,
  getTheCode,
  checkTheCode,
  verifyCode,
} from "./functions.js";
import { startTimer, stopTimer, getTimer, renderTimer } from "./timer.js";
import { data } from "./constant.js";

// DOM elements
const inputsCode = document.querySelectorAll(".input-group");
const form = document.getElementById("form-code");
const verifyButton = document.getElementById("verify-button");
const verifyFirstLetter = document.getElementsByClassName("screen-letter")[0];
const verifySecondLetter = document.getElementsByClassName("screen-letter")[1];
const verifyThirdLetter = document.getElementsByClassName("screen-letter")[2];
const verifyFourthLetter = document.getElementsByClassName("screen-letter")[3];
const successMessage = document.getElementById("success-message");
const errorMessage = document.getElementById("error-message");
const startbutton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer");

// Start state
const generateRandomCode = getTheCode(data.alphabet);
let timerDuration = 90;
renderTimer(timerElement, timerDuration);
// console.log("Generated Code:", generateRandomCode);
document.querySelectorAll("input").forEach((input) => (input.disabled = true));
document.querySelectorAll("button").forEach((btn) => {
  if (btn !== startbutton) btn.disabled = true;
});

inputsCode.forEach((inputGroup) => {
  const input = inputGroup.querySelector(".code-input");
  if (input) {
    const randomIndex = Math.floor(Math.random() * data.alphabet.length);
    input.value = data.alphabet[randomIndex];
  }
});

inputsCode.forEach((inputGroup) => {
  const input = inputGroup.querySelector(".code-input");
  input.addEventListener("input", () => {
    input.value = input.value.toUpperCase().replace(/[^A-Z]/g, "");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkTheCode(
      getInputsValues(inputsCode),
      generateRandomCode,
      {
        successMessage,
        errorMessage,
      },
      stopTimer,
      getTimer
    );
  });

  verifyButton.addEventListener("click", () => {
    verifyCode(getInputsValues(inputsCode), generateRandomCode, [
      verifyFirstLetter,
      verifySecondLetter,
      verifyThirdLetter,
      verifyFourthLetter,
    ]);
  });
});

startbutton.addEventListener("click", () => {
  startTimer(timerElement, errorMessage, timerDuration);
  startbutton.style.display = "none";
  document.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
  document
    .querySelectorAll("input")
    .forEach((input) => (input.disabled = false));
});
