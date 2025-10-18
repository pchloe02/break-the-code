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
      localStorage.setItem("time-remaining", JSON.stringify(getTimer()));

      message.successMessage.textContent =
        "Congratulations, you have defused the bomb!";
      message.successMessage.style.color = "#4bff4b";
      message.errorMessage.textContent = "";

      document
        .querySelectorAll("button")
        .forEach((btn) => (btn.disabled = true));
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
