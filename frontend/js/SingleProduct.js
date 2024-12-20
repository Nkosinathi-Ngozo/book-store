
const API_URL = `http://localhost:5000/api/product/find/${getId()}`
const jwtToken = localStorage.getItem('accessToken');

document.addEventListener('DOMContentLoaded', () =>{
    const img = document.querySelector('.image')
    const book_title = document.querySelector('.book_title')
    const book_year = document.querySelector('.book_year')
    const form = document.querySelector('.form-add-cart');

    fetch(API_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`, // Authorization header
        }
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success && data.product) {
            // Assuming the API returns a `product` object
            const product = data.product;

            // Populate the fields with the product data
            if (product.img) {
                img.src = product.img; // Set the image source
                img.alt = product.book_title || "Product Image"; // Optional alt text
            }

            book_title.textContent = product.book_title || "Unknown Title";
            book_year.textContent = product.book_year || "Unknown Year";
        } else {
            console.error('Error: No product found or data was invalid.');
        }
    })
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        
    })
})
function getId(){
    const urlParams = new URLSearchParams(window.location.search);

    // Get the value of 'id'
    const id = urlParams.get('id');
    if (id) {
        console.log(`Product ID: ${id}`);
        // You can now use 'id' to fetch product data or display it on the page
    } else{
        console.log(`No Product ID`);
    }
    return id
}