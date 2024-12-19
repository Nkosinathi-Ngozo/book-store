const fs = require('fs');
const multer = require('multer');
const path = require('path');

// Specify the image directory path
const imageDirectory = path.join(__dirname, 'images');

// Ensure the directory exists
if (!fs.existsSync(imageDirectory)) {
    fs.mkdirSync(imageDirectory, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imageDirectory); // Set the destination to the image directory
    },
    filename: function (req, file, cb) {
        // Use a timestamp to avoid filename conflicts
        cb(null, Date.now() + path.extname(file.originalname)); // Unique file name with original extension
    }
});

const upload = multer({ storage: storage });


module.exports = upload