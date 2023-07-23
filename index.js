const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', (error) => console.error());
db.once('open', () => console.log('Connected to database'));

const app = express();
app.use(express.json());
app.use('/users', require('./routes/userRoutes'));

app.listen(5000, () => {
  console.log('App is running on 5000 port...');
});
