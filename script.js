// Mobile menu toggle
const toggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

toggle.addEventListener('click', () => {
  sidebar.classList.toggle('open');
});

document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('open');
  });
});

// Reviews carousel
(function() {
  const carousel = document.getElementById('reviews-carousel');
  const slides = Array.from(carousel.querySelectorAll('.review-slide'));
  const prevBtn = document.querySelector('.slide-nav.prev');
  const nextBtn = document.querySelector('.slide-nav.next');
  let currentIndex = 0;
  let autoplayInterval = null;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentIndex = (index + slides.length) % slides.length;
    slides[currentIndex].classList.add('active');
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = null;
  }

  prevBtn.addEventListener('click', () => {
    stopAutoplay();
    prevSlide();
    startAutoplay();
  });

  nextBtn.addEventListener('click', () => {
    stopAutoplay();
    nextSlide();
    startAutoplay();
  });

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
  prevBtn.addEventListener('mouseenter', stopAutoplay);
  prevBtn.addEventListener('mouseleave', startAutoplay);
  nextBtn.addEventListener('mouseenter', stopAutoplay);
  nextBtn.addEventListener('mouseleave', startAutoplay);

  showSlide(0);
  startAutoplay();
})();

// Contact form handling
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  status.textContent = "Sending...";
  status.style.color = "#1f3f39";

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    const result = await response.json();
    console.log('Formspree response:', response.status, result);

    if (response.ok) {
      status.textContent = "Thank you! Your message has been sent successfully.";
      status.style.color = "#2f6f62";
      form.reset();
    } else {
      let errorMessage = "Something went wrong. Please try again.";
      if (response.status === 400) {
        errorMessage = "Form validation error. Please check your input.";
      } else if (response.status === 429) {
        errorMessage = "Too many submissions. Please wait a few minutes.";
      } else if (response.status === 403) {
        errorMessage = "Form is not active. Please check your Formspree settings.";
      }
      status.textContent = errorMessage;
      status.style.color = "#d32f2f";
      console.error('Form submission failed:', response.status, result);
    }
  } catch (error) {
    status.textContent = "Network error. Please check your connection and try again.";
    status.style.color = "#d32f2f";
    console.error('Network error:', error);
  }
});
