const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const quizRoutes = require('./route.js');

// ... other code
const app = express();



app.use(bodyParser.json());
app.use(cors());

app.use('/api', quizRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});