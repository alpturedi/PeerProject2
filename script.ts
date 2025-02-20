const themeToggle = document.querySelector(
  "#theme-toggle"
) as HTMLButtonElement;
const lightModeButton = document.querySelector(
  "#theme-toggle>#light"
) as HTMLElement;
const darkModeButton = document.querySelector(
  "#theme-toggle>#dark"
) as HTMLElement;

const currentTheme = localStorage.getItem("theme");

console.log("currentTheme", currentTheme);

if (currentTheme === "dark") {
  document.body.classList.add("dark-mode");
}

refreshButtons(currentTheme === "dark");

themeToggle?.addEventListener("click", () => {
  const temp = lightModeButton.style.display;
  lightModeButton.style.display = darkModeButton.style.display;
  darkModeButton.style.display = temp;

  if (currentTheme === "dark") {
    document.body.classList.remove("dark-mode");
    console.log("LIGHT NOW");
    localStorage.removeItem("theme");
  } else {
    document.body.classList.add("dark-mode");
    console.log("DARK NOW");
    localStorage.setItem("theme", "dark");
  }
});

function refreshButtons(isDark: boolean) {
  lightModeButton.style.display = isDark ? "block" : "none";
  darkModeButton.style.display = isDark ? "none" : "block";
}
