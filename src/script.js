var template = [];
const FALLBACK_LANGUAGE = "fr";

var langJson = {};

(async () => {
  const response = await fetch("./lang.json");
  langJson = await response.json();
})();

//Initial Setup
const initialTheme = localStorage.getItem("theme");
const initialLanguage = localStorage.getItem("language") ?? FALLBACK_LANGUAGE;

function render() {
  const currentLanguage = localStorage.getItem("language") ?? FALLBACK_LANGUAGE;
  const chosenLang = langJson[currentLanguage];

  const localizedItems = document.querySelectorAll(".localized");

  if (template.length === 0) {
    localizedItems.forEach((item) => {
      template.push(item.innerHTML);
    });
  }

  if (Mustache === undefined || langJson?.en === undefined) {
    setTimeout(render, 1000);
    return;
  }

  localizedItems.forEach((item, index) => {
    item.classList.add("rendered");
    item.innerHTML = Mustache.render(template[index], chosenLang);
  });
}
