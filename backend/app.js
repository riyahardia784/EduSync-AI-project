const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const studentRoutes = require('./routes/student.routes');

// ✅ Middleware first

app.use(cors());

app.use(express.json()); 
  




 app.use("/student",studentRoutes);


module.exports = app;