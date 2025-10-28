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
const scoreboardBtn = document.getElementById("scoreboard-btn");
const scoreboardPopup = document.getElementById("scoreboard-popup");
const scoreboardList = document.getElementById("scoreboard-list");

const renderScoreboard = () => {
  try {
    const raw = localStorage.getItem("time-remaining");
    if (!raw) return (scoreboardList.textContent = "No scores yet.");
    const parsed = JSON.parse(raw);
    const arr = Array.isArray(parsed)
      ? parsed
      : parsed && typeof parsed === "object"
      ? [parsed]
      : [];
    if (!arr.length) return (scoreboardList.textContent = "No scores yet.");

    const sortedScores = arr
      .slice()
      .sort((a, b) => (b.total || 0) - (a.total || 0));
    scoreboardList.innerHTML = "";
    sortedScores.forEach((it, idx) => {
      const div = document.createElement("div");
      div.className = "scoreboard-item";
      const left = document.createElement("div");
      left.innerHTML = `<div>${idx + 1}. ${
        it.name_player || "Player"
      }</div><div class="meta">${it.timer || ""}</div>`;
      const right = document.createElement("div");
      right.innerHTML = `<div class="meta">${
        it.total != null ? it.total + "s" : ""
      }</div>`;
      div.appendChild(left);
      div.appendChild(right);
      scoreboardList.appendChild(div);
    });
  } catch (e) {
    scoreboardList.textContent = "Unable to read scores.";
  }
};

const openScoreboard = () => {
  renderScoreboard();
  scoreboardPopup.style.display = "block";
  scoreboardBtn.setAttribute("aria-expanded", "true");
  scoreboardPopup.setAttribute("aria-hidden", "false");
};

const closeScoreboard = () => {
  scoreboardPopup.style.display = "none";
  scoreboardBtn.setAttribute("aria-expanded", "false");
  scoreboardPopup.setAttribute("aria-hidden", "true");
};

if (scoreboardBtn && scoreboardPopup) {
  scoreboardBtn.addEventListener("click", () => {
    const isOpen = scoreboardPopup.style.display === "block";
    if (isOpen) closeScoreboard();
    else openScoreboard();
  });
}

// Start state
const generateRandomCode = getTheCode(data.alphabet);
let timerDuration = 90;
renderTimer(timerElement, timerDuration);
console.log("Generated Code:", generateRandomCode);
document.querySelectorAll("input").forEach((input) => (input.disabled = true));
document.querySelectorAll("button").forEach((btn) => {
  if (btn !== startbutton && btn !== scoreboardBtn) btn.disabled = true;
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
