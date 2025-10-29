import {
  getInputsValues,
  getTheCode,
  checkTheCode,
  verifyCode,
  selectLetterWithArrows,
} from "./functions.js";
import { startTimer, stopTimer, getTimer, renderTimer } from "./timer.js";
import { setupScoreboard } from "./scoreboard.js";
import { data } from "./constant.js";

// DOM elements
const inputsCode = document.querySelectorAll(".input-group");
const form = document.getElementById("form-code");
const verifyButton = document.getElementById("verify-button");
const verifyFirstLetter = document.getElementsByClassName("screen-letter")[0];
const verifySecondLetter = document.getElementsByClassName("screen-letter")[1];
const verifyThirdLetter = document.getElementsByClassName("screen-letter")[2];
const verifyFourthLetter = document.getElementsByClassName("screen-letter")[3];
const errorMessage = document.getElementById("error-message");
const startbutton = document.getElementById("start-btn");
const timerElement = document.getElementById("timer");
const scoreboardBtn = document.getElementById("scoreboard-btn");
const scoreboardPopup = document.getElementById("scoreboard-popup");
const scoreboardList = document.getElementById("scoreboard-list");
const winPopup = document.getElementById("win-popup");
const winPopupText = document.getElementById("win-popup-text");
const winPopupImg = document.getElementById("win-popup-img");
const restartBtn = document.getElementById("restart");

setupScoreboard(scoreboardBtn, scoreboardPopup, scoreboardList);

const proxy = "https://corsproxy.io/?";
const apiUrl = "https://random-d.uk/api/v2/random";

let prefetchedDuckUrl = null;
let preloadedDuckImage = null;

const prefetchDuckImage = async () => {
  try {
    const res = await fetch(proxy + encodeURIComponent(apiUrl));
    const data = await res.json();
    if (data && data.url) {
      prefetchedDuckUrl = data.url;
      const img = new Image();
      img.src = data.url;
      preloadedDuckImage = img;
    }
  } catch (err) {
    prefetchedDuckUrl = null;
    preloadedDuckImage = null;
  }
};

const fetchDuckUrl = async () => {
  try {
    const res = await fetch(proxy + encodeURIComponent(apiUrl));
    const data = await res.json();
    return data && data.url ? data.url : null;
  } catch (err) {
    console.warn("fetchDuckUrl failed:", err);
    return null;
  }
};
prefetchDuckImage();

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

  const upArrow = inputGroup.querySelector(".arrow-up");
  const downArrow = inputGroup.querySelector(".arrow-down");
  const alphabet = data.alphabet;

  selectLetterWithArrows(input, upArrow, downArrow, alphabet);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const isWin = checkTheCode(
      getInputsValues(inputsCode),
      generateRandomCode,
      {
        errorMessage,
      },
      stopTimer,
      getTimer
    );

    if (isWin) {
      if (winPopupText) {
        winPopupText.textContent = "Thank you! You saved my favorite file!";
      }

      if (winPopup) {
        winPopup.style.display = "flex";
        winPopup.setAttribute("aria-hidden", "false");
      }

      if (winPopupImg) {
        winPopupImg.innerHTML = "";

        if (preloadedDuckImage) {
          winPopupImg.appendChild(preloadedDuckImage.cloneNode(true));
        } else if (prefetchedDuckUrl) {
          const imgEl = new Image();
          imgEl.src = prefetchedDuckUrl;
          winPopupImg.appendChild(imgEl);
        } else {
          fetchDuckUrl()
            .then((url) => {
              if (!url) return;
              const imgEl = new Image();
              imgEl.src = url;
              winPopupImg.appendChild(imgEl);
            })
            .catch((err) => console.warn("duck fetch failed:", err));
        }
      }
    }
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

if (restartBtn) {
  restartBtn.addEventListener("click", () => {
    const winPopupEl = document.getElementById("win-popup");
    if (winPopupEl) {
      winPopupEl.style.display = "none";
      winPopupEl.setAttribute("aria-hidden", "true");
    }

    window.location.reload();
  });
}
