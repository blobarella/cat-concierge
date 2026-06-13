document.addEventListener('DOMContentLoaded', () => {
  const links = Array.from(document.querySelectorAll('a[rel="prettyPhoto"]'));
  if (links.length === 0) return;

  const galleryData = links.map(link => ({
    src: link.getAttribute('href'),
    title: link.getAttribute('title') || ''
  }));

  let currentIndex = 0;

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

  const img = overlay.querySelector('.lightbox-img');
  const caption = overlay.querySelector('.lightbox-caption');
  const closeBtn = overlay.querySelector('.lightbox-close');
  const prevBtn = overlay.querySelector('.lightbox-prev');
  const nextBtn = overlay.querySelector('.lightbox-next');

  function updateLightbox(index) {
    img.src = galleryData[index].src;
    caption.textContent = galleryData[index].title;
  }

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox(currentIndex);
    overlay.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.style.display = 'none';
    img.src = '';
    document.body.style.overflow = '';
  }

  function showNext(e) {
    if(e) e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryData.length;
    updateLightbox(currentIndex);
  }

  function showPrev(e) {
    if(e) e.stopPropagation(); 
    currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
    updateLightbox(currentIndex);
  }

  links.forEach((link, index) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      openLightbox(index);
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target.classList.contains('lightbox-container')) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (overlay.style.display === 'flex') {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') showNext();
      if (e.key === 'ArrowLeft') showPrev();
    }
  });
});