const slidesContainer = document.getElementById('slides');
if(slidesContainer) {
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

  showSlide(currentSlide);
  setInterval(nextSlide, 3000);
}