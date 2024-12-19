const API_URL = 'http://localhost:5000/api/auth/login'


document.addEventListener('DOMContentLoaded', () =>{
    const form = document.querySelector('.form-signup');
    const usernameInput = document.querySelector('input[name="username"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    
    const errors = [];

    // Validate email address
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!username) errors.push('Username is required.');
        if (!email) errors.push('Email is required.');
        if (!password) errors.push('Password is required.');
        
        // Validate email format
        if (email && !validateEmail(email)) {
            console.log('Invalid email address.');
            errors.push('Invalid email address.');
        }

        // Show errors if any
        if (errors.length > 0) {
            showPopup(errors);
            return;
        }

        // Prepare form data for submission
        const formData = {
            username,
            email,
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
    })
})
