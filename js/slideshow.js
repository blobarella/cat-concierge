const slidesContainer = document.getElementById('slides');
const slides = slidesContainer.querySelectorAll('img');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.style.opacity = 1;
    } else {
      slide.style.opacity = 0;
    }
  });
  currentSlide = index;
}

function nextSlide() {
  showSlide((currentSlide + 1) % slides.length);
}

showSlide(currentSlide); // Show the first slide initially

setInterval(nextSlide, 3000); // Change slides every 3 seconds