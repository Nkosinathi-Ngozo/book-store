const API_URL = 'http://localhost:5000/api/auth/protected'

document.addEventListener('DOMContentLoaded', () => {
    const navbarLinks = document.getElementById('navbar-links');
    const content = document.querySelector('.content');
    const isAuthenticated = localStorage.getItem('accessToken')

    // Check the authentication status by calling an API endpoint
    if (isAuthenticated) {
        // If the user is authenticated, show the logout link
        const logoutLink = document.createElement('li');
        const logoutAnchor = document.createElement('a');
        logoutAnchor.textContent = 'Log out';
        logoutLink.appendChild(logoutAnchor);
        navbarLinks.appendChild(logoutLink);
        logoutLink.addEventListener('click', () => {
            localStorage.removeItem('accessToken');
            window.location.href = 'Frontpage.html';
        });
    } else {
        // If not authenticated, show the sign-up and login links
        const signUpLink = document.createElement('li');
        const signUpAnchor = document.createElement('a');
        signUpAnchor.href = 'Signup.html';
        signUpAnchor.textContent = 'Sign Up';
        signUpLink.appendChild(signUpAnchor);
        navbarLinks.appendChild(signUpLink);

        const loginLink = document.createElement('li');
        const loginAnchor = document.createElement('a');
        loginAnchor.href = 'Login.html';
        loginAnchor.textContent = 'Log In';
        loginLink.appendChild(loginAnchor);
        navbarLinks.appendChild(loginLink);

        // Add sign-up and login buttons to the content section
        const buttonsDiv = document.createElement('div');
        const signUpButton = document.createElement('a');
        signUpButton.href = 'Signup.html';
        signUpButton.innerHTML = '<button type="button"><span></span>SIGN UP</button>';
        buttonsDiv.appendChild(signUpButton);

        const loginButton = document.createElement('a');
        loginButton.href = 'Login';
        loginButton.innerHTML = '<button type="button"><span></span>LOGIN</button>';
        buttonsDiv.appendChild(loginButton);

        content.appendChild(buttonsDiv);

        signUpButton.addEventListener('click', () => {
            window.location.href = 'Signup.html';
        });
        loginButton.addEventListener('click', () => {
            window.location.href = 'Login.html';
        });
        
    }
});
