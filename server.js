const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/v2', (req, res) => {
  res.sendFile(path.join(__dirname, 'v2.html'));
});

app.get('/v2/', (req, res) => {
  res.redirect(301, '/v2');
});

// Serve static files from the current directory
app.use(express.static(path.join(__dirname)));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});