export const renderScoreboard = (scoreboardList) => {
  if (!scoreboardList) return;
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
        it.total != null ? it.total + "pts" : ""
      }</div>`;
      div.appendChild(left);
      div.appendChild(right);
      scoreboardList.appendChild(div);
    });
  } catch (e) {
    scoreboardList.textContent = "Unable to read scores.";
  }
};

export const openScoreboard = (
  scoreboardPopup,
  scoreboardBtn,
  scoreboardList
) => {
  renderScoreboard(scoreboardList);
  if (!scoreboardPopup) return;
  scoreboardPopup.style.display = "block";
  if (scoreboardBtn) scoreboardBtn.setAttribute("aria-expanded", "true");
  scoreboardPopup.setAttribute("aria-hidden", "false");
};

export const closeScoreboard = (scoreboardPopup, scoreboardBtn) => {
  if (!scoreboardPopup) return;
  scoreboardPopup.style.display = "none";
  if (scoreboardBtn) scoreboardBtn.setAttribute("aria-expanded", "false");
  scoreboardPopup.setAttribute("aria-hidden", "true");
};

export const setupScoreboard = (
  scoreboardBtn,
  scoreboardPopup,
  scoreboardList
) => {
  if (!scoreboardBtn || !scoreboardPopup || !scoreboardList) return null;
  const onToggle = () => {
    const isOpen = scoreboardPopup.style.display === "block";
    if (isOpen) closeScoreboard(scoreboardPopup, scoreboardBtn);
    else openScoreboard(scoreboardPopup, scoreboardBtn, scoreboardList);
  };
  scoreboardBtn.addEventListener("click", onToggle);
  return {
    render: () => renderScoreboard(scoreboardList),
    open: () => openScoreboard(scoreboardPopup, scoreboardBtn, scoreboardList),
    close: () => closeScoreboard(scoreboardPopup, scoreboardBtn),
  };
};
