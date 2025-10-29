export const getTheCode = (alphabet) => {
  let code = "";
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * alphabet.length);
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
  if (playerCode.length !== 4) return false;

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

    document.querySelectorAll("button").forEach((btn) => {
      if (btn.id !== "scoreboard-btn" && btn.id !== "restart")
        btn.disabled = true;
    });
    document
      .querySelectorAll("input")
      .forEach((input) => (input.disabled = true));

    return true;
  }

  if (message && message.errorMessage)
    message.errorMessage.textContent =
      "The code is incorrect, please try again.";

  return false;
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

export const selectLetterWithArrows = (input, upArrow, downArrow, alphabet) => {
  const ensureIndex = (val) => {
    if (!val) return 0;
    const idx = alphabet.indexOf(val.toUpperCase());
    return idx === -1 ? 0 : idx;
  };

  if (upArrow) {
    upArrow.addEventListener("click", () => {
      const currentLetter = input.value && input.value.toUpperCase();
      const idx = ensureIndex(currentLetter);
      const prevLetter = (idx - 1 + alphabet.length) % alphabet.length;
      input.value = alphabet[prevLetter];
      input.dispatchEvent(new Event("input"));
    });
  }

  if (downArrow) {
    downArrow.addEventListener("click", () => {
      const currentLetter = input.value && input.value.toUpperCase();
      const idx = ensureIndex(currentLetter);
      const nextLetter = (idx + 1) % alphabet.length;
      input.value = alphabet[nextLetter];

      input.dispatchEvent(new Event("input"));
    });
  }
};
