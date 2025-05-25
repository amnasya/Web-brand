 document.addEventListener('DOMContentLoaded', function () {
            // Hamburger menu henpon
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
            const successMessage = document.getElementById('success-message');

            if (modelForm) {
                // Real time validation
                const inputs = modelForm.querySelectorAll('input');
                inputs.forEach(input => {
                    input.addEventListener('blur', () => validateField(input));
                    input.addEventListener('input', () => {
                        if (input.classList.contains('error')) {
                            validateField(input);
                        }
                    });
                });

                // Form submission
                modelForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    
                    let isValid = true;
                    const fields = modelForm.querySelectorAll('input');
                    
                    fields.forEach(field => {
                        if (!validateField(field)) {
                            isValid = false;
                        }
                    });

                    if (isValid) {
                        // Show success message
                        successMessage.style.display = 'block';
                        successMessage.scrollIntoView({ behavior: 'smooth' });
                        
                        // Reset form after a short delay
                        setTimeout(() => {
                            modelForm.reset();
                            successMessage.style.display = 'none';
                        }, 3000);
                    }
                });
            }

            // Validation Functions
            function validateField(field) {
                const fieldGroup = field.closest('.form-group');
                let isValid = true;
                let errorMessage = '';

                // Clear previous error state
                fieldGroup.classList.remove('error');

                switch (field.type) {
                    case 'text':
                        // Validation 1: Full Name - minimum 2 characters, letters and spaces only
                        if (field.name === 'full-name') {
                            const namePattern = /^[a-zA-Z\s]{2,}$/;
                            if (!field.value.trim()) {
                                errorMessage = 'Full name is required';
                                isValid = false;
                            } else if (!namePattern.test(field.value.trim())) {
                                errorMessage = 'Please enter a valid name (minimum 2 characters, letters only)';
                                isValid = false;
                            }
                        }
                        break;

                    case 'email':
                        // Validation 2: Email - proper email format
                        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!field.value.trim()) {
                            errorMessage = 'Email address is required';
                            isValid = false;
                        } else if (!emailPattern.test(field.value)) {
                            errorMessage = 'Please enter a valid email address';
                            isValid = false;
                        }
                        break;

                    case 'date':
                        // Validation 3: Birth Date - must be 16 years or older
                        if (!field.value) {
                            errorMessage = 'Birth date is required';
                            isValid = false;
                        } else {
                            const birthDate = new Date(field.value);
                            const today = new Date();
                            const age = today.getFullYear() - birthDate.getFullYear();
                            const monthDiff = today.getMonth() - birthDate.getMonth();
                            
                            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                                age--;
                            }
                            
                            if (age < 16) {
                                errorMessage = 'You must be at least 16 years old to register';
                                isValid = false;
                            }
                        }
                        break;

                    case 'radio':
                        // Validation 4: Gender - one option must be selected
                        if (field.name === 'gender') {
                            const genderInputs = document.querySelectorAll('input[name="gender"]');
                            const isGenderSelected = Array.from(genderInputs).some(input => input.checked);
                            if (!isGenderSelected) {
                                errorMessage = 'Please select your gender';
                                isValid = false;
                            }
                        }
                        break;

                    case 'checkbox':
                        // Validation 5: Terms and Conditions - must be checked
                        if (field.name === 'terms' && !field.checked) {
                            errorMessage = 'You must agree to the terms and conditions';
                            isValid = false;
                        }
                        break;
                }

                // Show/hide error message
                if (!isValid) {
                    fieldGroup.classList.add('error');
                    const errorElement = fieldGroup.querySelector('.error-message');
                    if (errorElement) {
                        errorElement.textContent = errorMessage;
                    }
                }

                return isValid;
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