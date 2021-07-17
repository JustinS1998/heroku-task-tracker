const express = require('express');
const path = require('path');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/tasks', (req, res) => {
  // Return them as json
  res.json(
    {
      task1: {'title': 'task1', 'details': 'task1 details'},
      task2: {'title': 'task2', 'details': 'task2 details'}
    });

  console.log(`Sent tasks`);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Listening on ${port}`);

