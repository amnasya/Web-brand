document.addEventListener('DOMContentLoaded', function () {
    // Video mute/unmute functionality
    const video = document.getElementById('bg-video');
    const muteToggle = document.getElementById('mute-toggle');

    if (video && muteToggle) {
        muteToggle.addEventListener('click', () => {
            video.muted = !video.muted;
            muteToggle.textContent = video.muted ? 'Unmute' : 'Mute';
        });
    }

    // Hamburger menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.navbar-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Form validation
    const modelForm = document.getElementById('model-registration');
    if (modelForm) {
        modelForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;
            const requiredFields = modelForm.querySelectorAll('[required]');

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');

                    // Create or update error message
                    let errorMsg = field.parentElement.querySelector('.error-message');
                    if (!errorMsg) {
                        errorMsg = document.createElement('span');
                        errorMsg.className = 'error-message';
                        field.parentElement.appendChild(errorMsg);
                    }
                    errorMsg.textContent = 'This field is required';
                } else {
                    field.classList.remove('error');
                    const errorMsg = field.parentElement.querySelector('.error-message');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });

            if (isValid) {
                // Here you would typically send the form data to a server
                alert('Form submitted successfully!');
                modelForm.reset();
            }
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        if (currentScroll > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.style.background = 'transparent';
        }

        lastScroll = currentScroll;
    });
});

function updateQuantity(change) {
  const quantityInput = document.getElementById('quantity');
  let currentValue = parseInt(quantityInput.value);
  
  // Jika bukan angka, anggap 1
  if (isNaN(currentValue)) currentValue = 1;

  let newValue = currentValue + change;

  if (newValue >= 1 && newValue <= 10) {
    quantityInput.value = newValue;
  }

  quantityInput.append(newValue);

  if(quantityInput < 1 || quantityInput > 10){
    alert("maximum purchase is 10");
  }
}

