const slides = document.getElementById('slides');
const items = [...document.querySelectorAll('.slide')];
const dots = document.getElementById('dots');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const playBtn = document.getElementById('playBtn');
const birthdayAudio = document.getElementById('birthdayAudio');
let current = 0;
let autoplay;
let touchStart = 0;

items.forEach((_, index) => {
  const dot = document.createElement('button');
  dot.className = `dot${index === 0 ? ' active' : ''}`;
  dot.setAttribute('aria-label', `Show photo ${index + 1}`);
  dot.addEventListener('click', () => showSlide(index));
  dots.append(dot);
});

function showSlide(index) {
  current = (index + items.length) % items.length;
  slides.style.transform = `translateX(-${current * 100}%)`;
  [...dots.children].forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === current));
}
function resetAutoplay() { clearInterval(autoplay); autoplay = setInterval(() => showSlide(current + 1), 5000); }
previous.addEventListener('click', () => { showSlide(current - 1); resetAutoplay(); });
next.addEventListener('click', () => { showSlide(current + 1); resetAutoplay(); });
slides.addEventListener('touchstart', event => { touchStart = event.changedTouches[0].screenX; }, { passive: true });
slides.addEventListener('touchend', event => { const distance = event.changedTouches[0].screenX - touchStart; if (Math.abs(distance) > 45) { showSlide(current + (distance < 0 ? 1 : -1)); resetAutoplay(); } }, { passive: true });
resetAutoplay();

playBtn.addEventListener('click', async () => {
  try {
    await birthdayAudio.play();
    playBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i><span>Birthday Song Playing</span>';
    playBtn.disabled = true;
  } catch { playBtn.querySelector('span').textContent = 'Tap again to play the song'; }
});
birthdayAudio.addEventListener('ended', () => { playBtn.innerHTML = '<i class="fa-solid fa-music"></i><span>Play Your Birthday Song</span>'; playBtn.disabled = false; });
