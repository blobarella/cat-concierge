document.addEventListener('DOMContentLoaded', () => {
  // Find all links matching the rel attribute from your previous markup
  const links = Array.from(document.querySelectorAll('a[rel="prettyPhoto"]'));
  if (links.length === 0) return;

  // Extract gallery data (image source and title)
  const galleryData = links.map(link => ({
    src: link.getAttribute('href'),
    title: link.getAttribute('title') || ''
  }));

  let currentIndex = 0;

  // Dynamically inject the lightbox overlay into the DOM
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <div class="lightbox-container">
      <button class="lightbox-close" title="Close (Esc)">&times;</button>
      <button class="lightbox-prev" title="Previous (Left Arrow)">&#10094;</button>
      <img class="lightbox-img" src="" alt="Cat Concierge Client">
      <button class="lightbox-next" title="Next (Right Arrow)">&#10095;</button>
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Cache elements
  const img = overlay.querySelector('.lightbox-img');
  const caption = overlay.querySelector('.lightbox-caption');
  const closeBtn = overlay.querySelector('.lightbox-close');
  const prevBtn = overlay.querySelector('.lightbox-prev');
  const nextBtn = overlay.querySelector('.lightbox-next');

  // Functions
  function updateLightbox(index) {
    img.src = galleryData[index].src;
    caption.textContent = galleryData[index].title;
  }

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox(currentIndex);
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeLightbox() {
    overlay.style.display = 'none';
    img.src = ''; // Clear image to free memory
    document.body.style.overflow = ''; // Restore scrolling
  }

  function showNext(e) {
    if(e) e.stopPropagation(); // prevent closing if clicked on button
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateLightbox(currentIndex);
  }

  function showPrev(e) {
    if(e) e.stopPropagation(); 
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateLightbox(currentIndex);
  }

  // Bind clicks on gallery thumbnails
  links.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  // Bind control buttons
  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  // Click outside the image to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.classList.contains('lightbox-container')) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (overlay.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    }
  });
});