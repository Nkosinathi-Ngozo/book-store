const API_URL = 'http://localhost:5000/api/product'
const jwtToken = localStorage.getItem('accessToken');

fetch(API_URL, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwtToken}`, // Authorization header
    }
})
.then((response) => response.json())
.then((data) => {
    if (data.success) {
        // store accessToken in secure local storage
        const productContainer = document.querySelector('.product-container');
        productContainer.innerHTML = ''; // Clear any existing products

        data.products.forEach((product) => {
            const productHTML = `
                <a href="SingleProduct.html?id=${product._id}">
                    <div class="pro">
                        <img src="${product.img}" alt="${product.book_title}">
                        <div class="product-details">
                            <span>${product.book_title}</span>
                            <h5>${product.book_author}</h5>
                            <h5>${product.book_year}</h5>
                            <h4>R ${product.price}</h4>
                        </div>
                    </div>
                </a>
            `;
            productContainer.innerHTML += productHTML;
        });
    } else {
        showPopup(data.message || ['Fetch failed.']);
    }
})
.catch((error) => {
    console.error('Error during form submission:', error);
    showPopup(['An error occurred while submitting the form.']);
});
