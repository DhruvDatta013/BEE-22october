const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Setup multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Directory to save uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});
const upload = multer({ storage });

// Sample product data (name, description, and image path)
let products = [
  { name: 'Laptop', description: 'A high-performance laptop', image: '/uploads/laptop.jpg' },
  { name: 'Smartphone', description: 'A smartphone with great features', image: '/uploads/smartphone.jpg' },
  { name: 'Headphones', description: 'Noise-canceling headphones', image: '/uploads/headphones.jpg' },
];

// Route: Display product catalog
app.get('/catalog', (req, res) => {
  res.render('catalog', { products });
});

// Route: Render form to add new product
app.get('/add-product', (req, res) => {
  res.render('add-product');
});

// Route: Handle new product submission with image upload
app.post('/add-product', upload.single('image'), (req, res) => {
  const { name, description } = req.body;
  const image = req.file ? '/uploads/' + req.file.filename : '/uploads/default.jpg';

  // Add new product to the list
  products.push({ name, description, image });
  
  res.redirect('/catalog'); // Redirect to catalog to see the updated list
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
