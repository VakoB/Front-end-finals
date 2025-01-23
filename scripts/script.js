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

async function fetchData(url) {
  const response = await fetch(url);
  const result = response.json();
  return result;
}

async function fillData() {
  const result = await fetchData("https://fakestoreapi.com/products");
  const container = document.querySelector(".products");
  result.slice(0, 8).forEach((element) => {
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
}

fillData();
