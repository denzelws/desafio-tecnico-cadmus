require('dotenv').config();
const express = require('express');
const cors = require('cors');
const database = require('./infrastructure/database');

const app = express();

app.use(cors());
app.use(express.json());

// Routes will be imported here
// const contactsRoutes = require('./presentation/routes/contactsRoutes');

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;

database.connect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
  });

module.exports = app;
