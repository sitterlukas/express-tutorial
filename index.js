const express = require('express');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

// Init middleware
app.use(logger);

// Gets all members
app.get('/api/members', (req, res) => {
  res.json(members);
});

// Get single member
app.get('/api/members/:id', (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res.status(404).json({ msg: `Member with id ${req.params.id} not found` });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started at ${PORT}`));
