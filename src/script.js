var template = [];
const FALLBACK_LANGUAGE = "en";

var langJson = {};
var firstBatch = [];
var secondBatch = [];

//Initial Setup
const initialTheme = localStorage.getItem("theme");
const initialLanguage = localStorage.getItem("language") ?? FALLBACK_LANGUAGE;

(async () => {
  const response = await fetch("./lang.json");
  langJson = await response.json();
})();

(async () => {
  if (window?.location?.pathname === "/products.html") {
    firstBatch = await (await fetch("https://dummyjson.com/products?limit=9")).json();
    const productsContainer = document.querySelector(".product-grid ");
    console.log("¡ ⛰️ ~ firstBatch⛰️ !", firstBatch, productsContainer);

    if (productsContainer) {
      firstBatch?.products?.forEach((product) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
          <div class="card" key="${product.id}">
            <img src="${product?.images?.[0]}" alt="${product?.title}" />
            <h3>${product?.title}</h3>
            <p>${product?.price}</p>
            <button>${langJson?.[initialLanguage]?.addToCart}</button>
          </div>`;
        productsContainer.appendChild(productCard);
      });
    } else {
      console.log("Mutation obscerver not working, implement the logic here");
    }
    secondBatch = await (await fetch("https://dummyjson.com/products?limit=9&skip=9")).json();
  }
})();

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
