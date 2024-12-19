const API_URL = 'http://localhost:5000/api/product';

document.addEventListener('DOMContentLoaded', () => {
    const jwtToken = localStorage.getItem('accessToken');
    const form = document.querySelector('.form-sellbook');
    const bookTitleInput = document.querySelector('input[name="book_title"]');
    const bookAuthorInput = document.querySelector('input[name="book_author"]');
    const bookYearInput = document.querySelector('input[name="book_year"]');
    const bookPriceInput = document.querySelector('input[name="price"]');
    const bookImageInput = form.querySelector('input[name="img"]');

    const errors = [];

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const book_title = bookTitleInput.value.trim();
        const book_author = bookAuthorInput.value.trim();
        const book_year = bookYearInput.value.trim();
        const price = bookPriceInput.value.trim();
        const img = bookImageInput.files[0];; // Get the image file

        console.log(`${book_title} \n${book_author} \n${book_year} \n${price} \n${img}`);

        // Validation checks
        if (!book_title) errors.push('Title cannot be empty');
        if (!book_author) errors.push('Author cannot be empty');
        if (!book_year) errors.push('Book year cannot be empty');
        if (!price || price < 1) errors.push('Enter a valid price');
        if (!img) errors.push('Image is required');

        if (errors.length > 0) {
            console.log(errors);
            return;
        }

        const formData = new FormData();
        formData.append('book_title', book_title);
        formData.append('book_author', book_author);
        formData.append('book_year', book_year);
        formData.append('price', price);
        formData.append('img', img); // Append the image file to FormData
        
        console.log(formData)

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwtToken}`, // Authorization header
            },
            body: formData, // Send FormData which will automatically set the Content-Type
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.success) {
                showPopup('Success', 'Book entered successfully');
            } else {
                showPopup('Fail', data.message || 'Book creation failed');
            }
        })
        .catch((error) => {
            console.error('Error during form submission:', error);
            showPopup('Fail', 'An error occurred while submitting the form.');
        });
    });

    function showPopup(title, message) {
        // Create the popup container
        const popup = document.createElement('div');
        popup.style.position = 'fixed';
        popup.style.top = '0';
        popup.style.left = '0';
        popup.style.width = '100%';
        popup.style.height = '100%';
        popup.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        popup.style.display = 'flex';
        popup.style.justifyContent = 'center';
        popup.style.alignItems = 'center';
        popup.style.zIndex = '1000';

        // Create the popup content
        const popupContent = document.createElement('div');
        popupContent.style.backgroundColor = 'white';
        popupContent.style.padding = '20px';
        popupContent.style.borderRadius = '8px';
        popupContent.style.textAlign = 'center';
        popupContent.style.maxWidth = '400px';
        popupContent.style.width = '90%';

        // Add title
        const popupTitle = document.createElement('h2');
        popupTitle.innerHTML = title;
        popupContent.appendChild(popupTitle);

        // Add message
        const popupMessage = document.createElement('p');
        popupMessage.innerHTML = message;
        popupContent.appendChild(popupMessage);

        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = 'Close';
        closeBtn.style.marginTop = '20px';
        closeBtn.style.padding = '10px 20px';
        closeBtn.style.border = 'none';
        closeBtn.style.backgroundColor = '#007bff';
        closeBtn.style.color = 'white';
        closeBtn.style.borderRadius = '5px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.addEventListener('click', () => {
            document.body.removeChild(popup);
        });
        popupContent.appendChild(closeBtn);

        // Append content to popup
        popup.appendChild(popupContent);

        // Append popup to body
        document.body.appendChild(popup);
    }
});
