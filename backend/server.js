const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const routes = require('./routes/task_routes.js');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/', routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
