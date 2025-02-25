const themeToggle = document.querySelector("#theme-toggle");
const lightModeButton = document.querySelector("#theme-toggle>#light");
const darkModeButton = document.querySelector("#theme-toggle>#dark");
const languageSelector = document.querySelector("#language-select");

if (initialTheme === "dark") {
  document.body.classList.add("dark-mode");
}

languageSelector.value = initialLanguage ?? FALLBACK_LANGUAGE;

refreshButtons(initialTheme === "dark");

themeToggle?.addEventListener("click", () => {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.classList.remove("dark-mode");
    refreshButtons(false);
    localStorage.removeItem("theme");
  } else {
    document.body.classList.add("dark-mode");
    refreshButtons(true);
    localStorage.setItem("theme", "dark");
  }
});

languageSelector?.addEventListener("change", (e) => {
  localStorage.setItem("language", e.target.value);
  render();
});

function refreshButtons(isDark) {
  lightModeButton.style.display = isDark ? "block" : "none";
  darkModeButton.style.display = isDark ? "none" : "block";
}
