const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

let storage = []; // Temporary server-side storage

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// GET: Form page
app.get('/', (req, res) => {
  res.render('index', { error: null });
});

// POST: Handle form submission with server-side validation
app.post('/submit', (req, res) => {
  const { username, email, age } = req.body;

  // Server-side validation
  if (!username || !email || !age || isNaN(age) || age < 1) {
    return res.render('index', { error: 'Invalid input. Please fill all fields correctly.' });
  }

  // Store valid data
  storage.push({ username, email, age });

  res.render('result', { username, email, age, allData: storage });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
