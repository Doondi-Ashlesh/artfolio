const track = document.getElementById('comicCarousel');
const dots = document.getElementById('comicDots');
const cards = Array.from(track.querySelectorAll('a'));

let currentIndex = 1; // Start with second card centered
let autoScrollInterval;
let autoScrollPaused = false;

// Create dots and set up event listeners
cards.forEach((card, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Go to comic ${i + 1}`);
  dot.addEventListener('click', () => {
    currentIndex = i;
    updateCarousel();
    pauseAutoScroll();
  });
  dots.appendChild(dot);

  card.addEventListener('click', (e) => {
    if (i === currentIndex) return; // Allow navigation on center card
    e.preventDefault(); // Prevent navigation on side cards
    currentIndex = i;
    updateCarousel();
    pauseAutoScroll();
  });
});

function updateCarousel() {
  cards.forEach((card, i) => {
    card.classList.remove('highlight', 'visible');

    // Show only the current card and one neighbor on each side (handle edges)
    if (
      (currentIndex === 0 && (i === 0 || i === 1)) ||
      (currentIndex === cards.length - 1 && (i === cards.length - 2 || i === cards.length - 1)) ||
      (i >= currentIndex - 1 && i <= currentIndex + 1)
    ) {
      card.classList.add('visible');
    }

    if (i === currentIndex) {
      card.classList.add('highlight');
    }
  });

  // Update active dot
  dots.querySelectorAll('button').forEach((btn, i) => {
    btn.classList.toggle('active', i === currentIndex);
  });
}

function autoScroll() {
  if (autoScrollPaused) return;
  currentIndex = (currentIndex + 1) % cards.length;
  updateCarousel();
}

function pauseAutoScroll() {
  autoScrollPaused = true;
  clearInterval(autoScrollInterval);
  setTimeout(() => {
    autoScrollPaused = false;
  }, 4000);
  autoScrollInterval = setInterval(autoScroll, 4000);
}

// Initialize
updateCarousel();
autoScrollInterval = setInterval(autoScroll, 4000);
