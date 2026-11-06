// Pour le carrousel

document.addEventListener('DOMContentLoaded', () => {
      const carousel = document.querySelector('.carousel');
      const track = carousel.querySelector('.carousel-track');
      const slides = track.querySelectorAll('.slide');
      const nextButton = carousel.querySelector('.next');
      const prevButton = carousel.querySelector('.prev');

      let index = 0;
      let autoPlayId;
      const intervalTime = 3000; // NEW: Switch automatically every 3 seconds.

      function update() {
        // CHANGED: Move by 100% for each complete slide, not 100 / slide count.
        track.style.transform = `translateX(-${index * 100}%)`;
      }

      // NEW: Both the buttons and automatic timer use these functions.
      function nextSlide() {
        index = (index + 1) % slides.length;
        update();
      }

      function previousSlide() {
        index = (index - 1 + slides.length) % slides.length;
        update();
      }

      // NEW: Start / stop automatic navigation, preventing duplicate timers.
      function stopAutoPlay() {
        clearInterval(autoPlayId);
        autoPlayId = undefined;
      }

      function startAutoPlay() {
        stopAutoPlay();
        if (slides.length > 1 && !document.hidden) {
          autoPlayId = setInterval(nextSlide, intervalTime);
        }
      }

      // CHANGED: Buttons now change the image and reset the automatic timer.
      nextButton.addEventListener('click', () => {
        nextSlide();
        if (carousel.matches(':hover') || carousel.matches(':focus-within')) {
          stopAutoPlay();
        } else {
          startAutoPlay();
        }
      });

      prevButton.addEventListener('click', () => {
        previousSlide();
        if (carousel.matches(':hover') || carousel.matches(':focus-within')) {
          stopAutoPlay();
        } else {
          startAutoPlay();
        }
      });

      // NEW: Pause when hovered or keyboard-focused; resume when leaving.
      carousel.addEventListener('mouseenter', stopAutoPlay);
      carousel.addEventListener('mouseleave', () => {
        if (!carousel.matches(':focus-within')) startAutoPlay();
      });
      carousel.addEventListener('focusin', stopAutoPlay);
      carousel.addEventListener('focusout', () => {
        if (!carousel.matches(':hover')) startAutoPlay();
      });

      // NEW: Don't run the timer while the browser tab is hidden.
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          stopAutoPlay();
        } else if (!carousel.matches(':hover') && !carousel.matches(':focus-within')) {
          startAutoPlay();
        }
      });

      startAutoPlay();
    });