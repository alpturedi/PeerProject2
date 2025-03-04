var template = [];
const FALLBACK_LANGUAGE = "en";
const PAGE_SIZE = 12;

var langJson = {};

//Initial Setup
const initialTheme = localStorage.getItem("theme");
const initialLanguage = localStorage.getItem("language") ?? FALLBACK_LANGUAGE;

(async () => {
  const response = await fetch("../lang.json");
  langJson = await response.json();
  console.log(langJson);
})();

const currentPage = parseInt(window?.location?.search?.split("=")?.[1] ?? "1", 10);
console.log(currentPage);
let fetchedProducts = [];

(async () => {
  if (window?.location?.pathname === "/PeerProject2/products.html") {
    const { products, total } = await (
      await fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${PAGE_SIZE * (currentPage - 1)}  `)
    ).json();

    const navContainer = document.querySelector("ul.pagination");

    fetchedProducts = products;
    console.log(fetchedProducts);
    renderProducts(fetchedProducts);

    if (navContainer) {
      navContainer.innerHTML = `
            <li class="page-item${currentPage === 1 ? " disabled" : ""}">
              <a class="page-link" href="?page=${currentPage - 1}" tabindex="-1"><i class="fa-solid fa-chevron-left"></i>&nbsp;Previous</a>
            </li>`;

      if (currentPage > 1) {
        const firstPage = document.createElement("li");
        firstPage.classList.add("page-item");
        firstPage.innerHTML = <a class="page-link" href="?page=1">1</a>;
        navContainer.appendChild(firstPage);
      }

      const currentPageElement = document.createElement("li");
      currentPageElement.className = "page-item";
      currentPageElement.innerHTML = currentPage.toString();
      navContainer.appendChild(currentPageElement);

      const lastPage = Math.ceil(total / PAGE_SIZE);
      if (currentPage < lastPage) {
        const lastPageElement = document.createElement("li");
        lastPageElement.className = "page-item";
        lastPageElement.innerHTML = <li class="page-item"><a class="page-link" href="?page=${lastPage}">${lastPage}</a></li>;
        navContainer.appendChild(lastPageElement);

        const nextPageElement = document.createElement("li");
        nextPageElement.className = `page-item ${currentPage === lastPage ? "disabled" : ""}`;
        nextPageElement.innerHTML = `<a class="page-link" href="?page=${
          currentPage + 1
        }">Next&nbsp;<i class="fa-solid fa-chevron-right"></i></a>`;
        navContainer.appendChild(nextPageElement);
      } else {
        console.log("Mutation obscerver not working, implement the logic here");
      }
    }
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
document.addEventListener("DOMContentLoaded", () => {
  const sortSelect = document.querySelector("#price-sort");

  if (sortSelect) {
    sortSelect.addEventListener("change", async () => {
      console.log("addevent is called hjere ");
      const selectedOption = sortSelect.value;
      await renderProducts(fetchedProducts, selectedOption);
    });
  }

  renderProducts(fetchedProducts, "price-low");
});

async function renderProducts(products, sortOrder = "price-low") {
  let sortedProducts = [...products];

  // Always sort based on selected order
  if (sortOrder === "price-low") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "price-high") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  const productsContainer = document.querySelector(".product-grid");
  if (productsContainer) {
    productsContainer.innerHTML = ""; // Clear previous products

    sortedProducts.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("product-card");
      productCard.innerHTML = `
        <div class="card" key="${product.id}">
          <img src="${product.images?.[0]}" alt="${product.title}" />
          <h3>${product.title}</h3>
          <p>$${product.price}</p>
          <button>${langJson?.[initialLanguage]?.addToCart || "Add to Cart"}</button>
        </div>`;
      productsContainer.appendChild(productCard);
    });
  }
}