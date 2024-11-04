const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));

// Route: Display the contact form
app.get('/contact', (req, res) => {
  res.render('contact', { error: null });
});

// Route: Handle form submission
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;

  // Form validation: check if all fields are filled out
  if (!name || !email || !message) {
    return res.render('contact', { error: 'All fields are required.' });
  }

  // Render the thank you page with submitted data
  res.render('thank-you', { name, email, message });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
