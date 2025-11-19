// js/script.js

// Wait for DOM
document.addEventListener('DOMContentLoaded', function () {

  /* --------------------------
     GALLERY LIGHTBOX
  --------------------------- */
  const galleryImgs = document.querySelectorAll('.gallery img');
  if (galleryImgs.length) {
    galleryImgs.forEach(img => {
      img.addEventListener('click', function () {
        // create lightbox
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');

        const bigImg = document.createElement('img');
        // use same src (if you have large versions, consider using data-large)
        bigImg.src = this.src;
        bigImg.alt = this.alt || '';

        lightbox.appendChild(bigImg);
        document.body.appendChild(lightbox);

        // remove on click or Escape
        lightbox.addEventListener('click', () => lightbox.remove());
        document.addEventListener('keydown', function escHandler(e) {
          if (e.key === 'Escape' && document.getElementById('lightbox')) {
            const lb = document.getElementById('lightbox');
            if (lb) lb.remove();
            document.removeEventListener('keydown', escHandler);
          }
        });
      });
    });
  }

  /* --------------------------
     SIMPLE SEARCH FOR SERVICES
  --------------------------- */
  const searchBox = document.getElementById('searchBox');
  if (searchBox) {
    searchBox.addEventListener('keyup', function () {
      const q = this.value.toLowerCase();
      const items = document.querySelectorAll('#serviceList li');
      items.forEach(li => {
        li.style.display = li.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }

  /* --------------------------
     FORM VALIDATION FUNCTION
     (applies to contactForm and enquiryForm)
  --------------------------- */
  function applyValidation(formId) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', function (e) {
      let valid = true;
      // reset all error messages first
      const errEls = form.querySelectorAll('.error-message');
      errEls.forEach(el => el.textContent = '');

      // find required fields
      const required = form.querySelectorAll('[required]');
      required.forEach(field => {
        const wrapperMsg = field.nextElementSibling;
        // simple email format check
        if (field.type === 'email') {
          const val = field.value.trim();
          const emailRegex = /^\S+@\S+\.\S+$/;
          if (!emailRegex.test(val)) {
            valid = false;
            field.classList.add('error');
            if (wrapperMsg && wrapperMsg.classList.contains('error-message')) {
              wrapperMsg.textContent = 'Please enter a valid email address.';
            }
          } else {
            field.classList.remove('error');
          }
          return;
        }

        // generic required check
        if (field.value.trim() === '') {
          valid = false;
          field.classList.add('error');
          if (wrapperMsg && wrapperMsg.classList.contains('error-message')) {
            wrapperMsg.textContent = 'This field cannot be empty.';
          }
        } else {
          field.classList.remove('error');
        }
      });

      if (!valid) {
        e.preventDefault();
        // Optionally focus first invalid
        const firstError = form.querySelector('.error');
        if (firstError) firstError.focus();
      } else {
        // All good: for demo we prevent actual submission and show a friendly message
        // Remove the following block if you have server-side handling.
        e.preventDefault();
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = 'Sending...';
        }

        // Fake processing delay
        setTimeout(() => {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = 'Submitted';
          }
          // Clear form fields (optional)
          form.reset();
          // Show success near first .error-message or as alert
          alert('Thank you — your message has been received. We will contact you soon.');
        }, 900);
      }
    });
  }

  applyValidation('contactForm');
  applyValidation('enquiryForm');
});
