const carousel = document.querySelector(".carousel");
const indicator = document.querySelectorAll(".indicator");
let index = 0;
indicator.forEach((indicator, i) => {
  indicator.addEventListener("click", () => {
    index = i;
    carousel.scrollLeft = i * carousel.offsetWidth;
    if (i === index) {
      indicator.src = "./images/Ellipse 3.png";
    } else {
      indicator.src = "./images/Ellipse 4.png";
    }
  });
});
const firstCardWidth = carousel.querySelector(".carousel-card").offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false,
  startX,
  startScrollLeft;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

carouselChildrens
  .slice(-cardPerView)
  .reverse()
  .forEach((card) => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });
carouselChildrens.slice(0, cardPerView).forEach((card) => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");

  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
};

const dragging = (e) => {
  if (!isDragging) return;
  const x = startScrollLeft - (e.pageX - startX);
  carousel.scrollLeft = x;
  if (x < 0) {
    index += 1;
  } else {
    index -= 1;
  }
};

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
};

const infiniteScroll = () => {
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  } else if (
    Math.ceil(carousel.scrollLeft) ===
    carousel.scrollWidth - carousel.offsetWidth
  ) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }
};
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

function increaseQuantity() {
  let quantityElement = document.getElementById("quantity");
  let quantity = parseInt(quantityElement.textContent);
  quantityElement.textContent = quantity + 1;
}
function decreaseQuantity() {
  let quantityElement = document.getElementById("quantity");
  let quantity = parseInt(quantityElement.textContent);
  if (quantity > 1) {
    quantityElement.textContent = quantity - 1;
  }
}
