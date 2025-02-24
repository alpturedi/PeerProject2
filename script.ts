const themeToggle = document.querySelector("#theme-toggle") as HTMLButtonElement;
const lightModeButton = document.querySelector("#theme-toggle>#light") as HTMLElement;
const darkModeButton = document.querySelector("#theme-toggle>#dark") as HTMLElement;

//Initial Setup
const initialTheme = localStorage.getItem("theme");

if (initialTheme === "dark") {
  document.body.classList.add("dark-mode");
}

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

function refreshButtons(isDark: boolean) {
  lightModeButton.style.display = isDark ? "block" : "none";
  darkModeButton.style.display = isDark ? "none" : "block";
}
