let products = [];
function ratingStars(rating) {
  let roundedRating = roundToHalf(rating); // 4.4 -> 4.5
  let wholeNumber = Math.floor(roundedRating);
  let decimalNumber = roundedRating - wholeNumber;
  let innerHtml = `<img src="./assets/star-icon.svg" alt="star icon">`.repeat(
    wholeNumber
  );
  if (decimalNumber == 0.5) {
    innerHtml += `<img src="./assets/half-star-icon.svg" alt="star icon">`;
  }

  return `<div class="rating-stars">${innerHtml}</div>`;
}

function roundToHalf(value) {
  return Math.round(value * 2) / 2;
}

function card(imageSrc, title, rating, price) {
  return `
            <div class="product-image">
              <img src="${imageSrc}" alt="product image">
            </div>
            <p class="product-title">${title}</p>
            <div class="rating">
              ${ratingStars(rating)}
              <p>${roundToHalf(rating).toFixed(1)}/<span>5</span></p>
            </div>
            <p class="product-price">$${price}</p>
          `;
}

async function fetchData() {
  const response = await fetch("https://fakestoreapi.com/products");
  products = (await response.json()).slice(0, 8);
  renderData(products);
}

async function renderData(productArray) {
  const container = document.querySelector(".products");
  const viewAllButton = document.querySelector(".view-all-button");
  container.innerHTML = "";
  productArray.forEach((element) => {
    const item = document.createElement("div");
    item.classList.add("product");
    item.innerHTML = card(
      element.image,
      element.title,
      element.rating.rate,
      element.price
    );
    container.appendChild(item);
  });

  // show products button for <=768px
  const productItems = document.querySelectorAll(
    ".product:not(:nth-child(-n+2))"
  );

  let expanded;
  viewAllButton.addEventListener("click", function () {
    productItems.forEach((item) => {
      if (item.classList.contains("expand")) {
        expanded = false;
      } else {
        expanded = true;
      }

      item.classList.toggle("expand");
    });

    viewAllButton.textContent = expanded ? "View Less" : "View All";
  });
}

function arrowsFunctionality() {
  const arrows = document.querySelectorAll(".slider-arrow");
  const sliderContainer = document.querySelector(".reviews-container");
  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      const arrowDirection = arrow.id == "left-slider-arrow" ? -1 : 1;
      const scrollAmount = arrowDirection * sliderContainer.clientWidth;
      sliderContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  });
}

function filterData() {
  const input = document.querySelector(".search-bar input");
  input.addEventListener("input", () => {
    console.log(products);
    let filteredArray = products.filter((element) =>
      element.title.toUpperCase().includes(input.value.toUpperCase())
    );
    console.log(filteredArray);

    renderData(filteredArray);
  });
}

async function init() {
  await fetchData();
  filterData();
}

function burgerMenu() {
  const burgerMenuButton = document.querySelector(".burger-menu");
  const burgerIcon = document.querySelector(".burger-menu img");
  const navContainer = document.querySelector(".navigation-container");

  burgerMenuButton.addEventListener("click", () => {
    // Check if the current icon is the burger menu icon
    if (burgerIcon.src.includes("burger-menu-icon.svg")) {
      burgerIcon.src = "./assets/close-icon.svg";
      navContainer.classList.add("active");
    } else {
      burgerIcon.src = "./assets/burger-menu-icon.svg";
      navContainer.classList.remove("active");
    }
  });
}

init();
burgerMenu();


window.addEventListener("load", arrowsFunctionality);
