export const getTheCode = (alphabet) => {
  let code = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length) + 1;
    const letter = alphabet[randomIndex];
    code += letter;
  }
  return code;
};

export const getInputsValues = (inputCode) => {
  let code = "";
  inputCode.forEach((inputGroup) => {
    const input = inputGroup.querySelector(".code-input");
    input && (code += input.value);
  });
  return code;
};

export const checkTheCode = (
  playerCode,
  generateRandomCode,
  message,
  stopTimer,
  getTimer
) => {
  if (playerCode.length === 4) {
    if (playerCode === generateRandomCode) {
      stopTimer();
      try {
        const key = "time-remaining";
        const entry = getTimer();
        const raw = localStorage.getItem(key);
        let parsed = null;
        try {
          parsed = raw ? JSON.parse(raw) : null;
        } catch (e) {
          parsed = null;
        }

        const last = Array.isArray(parsed) ? parsed[parsed.length - 1] : null;

        const next = Array.isArray(parsed)
          ? last && last.total === entry.total && last.timer === entry.timer
            ? parsed
            : parsed.concat(entry)
          : parsed && typeof parsed === "object"
          ? parsed.total === entry.total && parsed.timer === entry.timer
            ? [parsed]
            : [parsed, entry]
          : [entry];

        if (next !== parsed) localStorage.setItem(key, JSON.stringify(next));
      } catch (err) {
        console.error("append time-remaining error:", err);
      }

      message.successMessage.textContent =
        "Congratulations, you have defused the bomb!";
      message.successMessage.style.color = "#4bff4b";
      message.errorMessage.textContent = "";

      document.querySelectorAll("button").forEach((btn) => {
        if (btn.id !== "scoreboard-btn") btn.disabled = true;
      });
      document
        .querySelectorAll("input")
        .forEach((input) => (input.disabled = true));
    } else {
      message.errorMessage.textContent =
        "The code is incorrect, please try again.";
      message.successMessage.textContent = "";
    }
  }
};

export const verifyCode = (playerCode, generateRandomCode, verifyLetters) => {
  for (let i = 0; i < 4; i++) {
    if (playerCode[i] === generateRandomCode[i]) {
      verifyLetters[i].style.backgroundColor = "#4bff4bff";
    } else {
      verifyLetters[i].style.backgroundColor = "#df2222ff";
    }
  }
};
