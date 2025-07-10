const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

let users = [];

// Input validation middleware
const validateUserInput = (req, res, next) => {
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: 'Username and email are required' });
  }
  if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  next();
};

app.post('/api/users', validateUserInput, (req, res) => {
  try {
    const { username, email } = req.body;
    const newUser = { 
      id: Date.now(), 
      username, 
      email,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.get('/api/users', (req, res) => {
  try {
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.get('/api/users/:id', (req, res) => {
  try {
    const user = users.find(u => u.id == req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

app.put('/api/users/:id', validateUserInput, (req, res) => {
  try {
    const { username, email } = req.body;
    const userIndex = users.findIndex(u => u.id == req.params.id);
    if (userIndex > -1) {
      users[userIndex] = { 
        ...users[userIndex],
        username, 
        email,
        updatedAt: new Date().toISOString()
      };
      res.json(users[userIndex]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.delete('/api/users/:id', (req, res) => {
  try {
    const userIndex = users.findIndex(u => u.id == req.params.id);
    if (userIndex > -1) {
      const deletedUser = users.splice(userIndex, 1);
      res.json(deletedUser[0]);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});