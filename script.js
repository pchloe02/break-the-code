import {
  getInputsValues,
  getTheCode,
  checkTheCode,
  verifyCode,
} from "./functions.js";
import { data } from "./constant.js";

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

const generateRandomCode = getTheCode(data.alphabet);
console.log("Generated Code:", generateRandomCode);

inputsCode.forEach((inputGroup) => {
  const input = inputGroup.querySelector(".code-input");
  input.addEventListener("input", () => {
    input.value = input.value.toUpperCase().replace(/[^A-Z]/g, "");
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    checkTheCode(getInputsValues(inputsCode), generateRandomCode, inputsCode, {
      successMessage,
      errorMessage,
    });
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

const timerElement = document.getElementById("timer");
const duration = 60;
const start = Date.now();

const updateTimer = () => {
  const now = Date.now();
  const elapsed = Math.floor((now - start) / 1000);
  const remaining = Math.max(0, duration - elapsed);
  const min = Math.floor(remaining / 60);
  const sec = remaining % 60;
  timerElement.textContent = `${min}:${sec.toString().padStart(2, "0")}`;
  if (remaining > 0) {
    setTimeout(updateTimer, 200);
  } else {
    timerElement.textContent = "X_X";
    errorMessage.textContent = "Game over, you failed to defuse the bomb.";
    errorMessage.style.color = "red";

    document.querySelectorAll("button").forEach((btn) => (btn.disabled = true));
    document
      .querySelectorAll("input")
      .forEach((input) => (input.disabled = true));
  }
};

startbutton.addEventListener("click", () => {
  updateTimer();
  startbutton.style.display = "none";
  document.querySelectorAll("button").forEach((btn) => (btn.disabled = false));
  document
    .querySelectorAll("input")
    .forEach((input) => (input.disabled = false));
});
