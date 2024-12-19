const API_URL = 'http://localhost:5000/api/auth/register'


document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.form-signup');
    const firstNameInput = document.querySelector('input[name="first_name"]');
    const lastNameInput = document.querySelector('input[name="last_name"]');
    const usernameInput = document.querySelector('input[name="username"]');
    const emailInput = document.querySelector('input[name="email"]');
    const phoneInput = document.querySelector('input[name="phone_number"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const confirmPasswordInput = document.querySelector('input[name="confirm"]');
    const popup = document.querySelector('.popup');
    const closeBtn = document.querySelector('.close-btn');

    // Show popup with error messages
    function showPopup(messages) {
        const popupContent = popup.querySelector('.popup-content');
        popupContent.innerHTML = `<h2>Error</h2>`;
        messages.forEach((msg) => {
            const p = document.createElement('p');
            p.textContent = msg;
            popupContent.appendChild(p);
        });
        popup.style.display = 'block';
    }

    // Hide popup when close button is clicked
    closeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        popup.style.display = 'none';
    });

    // Validate email address
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate phone number (e.g., 10-15 digits)
    function validatePhoneNumber(phone) {
        const phoneRegex = /^0\d{9}$/;
        return phoneRegex.test(phone);
    }

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const phone = phoneInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        const errors = [];
        
        console.log('Register');

        // Validate required fields
        if (!firstName) errors.push('First name is required.');
        if (!lastName) errors.push('Last name is required.');
        if (!username) errors.push('Username is required.');
        if (!email) errors.push('Email is required.');
        if (!phone) errors.push('Phone number is required.');
        if (!password) errors.push('Password is required.');
        if (!confirmPassword) errors.push('Confirm password is required.');

        // Validate email format
        if (email && !validateEmail(email)) {
            console.log('Invalid email address.');
            errors.push('Invalid email address.');
        }

        // Validate phone number format
        if (phone && !validatePhoneNumber(phone)) {
            console.log('Invalid phone number. Must be 10 digits.');
            errors.push('Invalid phone number. Must be 10 digits.');
        }

        // Validate passwords match
        if (password && confirmPassword && password !== confirmPassword) {
            console.log('Passwords do not match.');
            errors.push('Passwords do not match.');
        }

        // Show errors if any
        if (errors.length > 0) {
            showPopup(errors);
            return;
        }

        // Prepare form data for submission
        const formData = {
            first_name: firstName,
            last_name: lastName,
            username,
            email,
            phone_number: phone,
            password,
        };

        // Submit form data using fetch
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                // store accessToken in secure local storage
                localStorage.setItem('accessToken', data.accessToken);

                window.location.href = '/frontend/html/Frontpage.html'; // Redirect on success
            } else {
                showPopup(data.message || ['Registration failed.']);
            }
        })
        .catch((error) => {
            console.error('Error during form submission:', error);
            showPopup(['An error occurred while submitting the form.']);
        });
    });
});
