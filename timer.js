let timerInterval;
let timerStart;
let timerDuration = 60;

export const renderTimer = (timerElement, time) => {
  const min = Math.floor(time / 60);
  const sec = time % 60;
  timerElement.textContent = `${min}:${sec.toString().padStart(2, "0")}`;
};

export const startTimer = (timerElement, errorMessage, time) => {
  timerDuration = time;
  timerStart = Date.now();
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const now = Date.now();
    const elapsed = Math.floor((now - timerStart) / 1000);
    const remaining = Math.max(0, time - elapsed);
    renderTimer(timerElement, remaining);
    if (remaining <= 0) {
      clearInterval(timerInterval);
      stopTimer();
      timerElement.textContent = "X_X";
      errorMessage.style.color = "red";
      errorMessage.textContent = "Game over, you failed to defuse the bomb.";
      document
        .querySelectorAll("button")
        .forEach((btn) => (btn.disabled = true));
      document
        .querySelectorAll("input")
        .forEach((input) => (input.disabled = true));
    }
  }, 200);
};

export const stopTimer = () => {
  clearInterval(timerInterval);
};

export const resetTimer = (time, timerElement) => {
  timerDuration = time;
  renderTimer(timerElement, time);
};

export const getTimer = () => {
  const finalTimer = (total) => ({
    total_remaining: {
      total,
      minutes: Math.floor(total / 60),
      seconds: total % 60,
    },
  });

  if (!timerStart) return finalTimer(timerDuration);
  const now = Date.now();
  const elapsed = Math.floor((now - timerStart) / 1000);
  const remaining = Math.max(0, timerDuration - elapsed);
  return finalTimer(remaining);
};
