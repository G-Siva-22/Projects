const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

// Set EJS as view engine
app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/submit', (req, res) => {
  const { username, email } = req.body;
  res.render('result', { username, email });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
