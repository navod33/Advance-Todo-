const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//import Routes
const authRoute = require('./routes/auth');
const todoRoute = require('./routes/todo');

dotenv.config();

// Connect to DB
mongoose.connect(
  'mongodb+srv://navodemedia:UredMOKcaKh3KlMc@cluster0.48jwiur.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//Middleware
app.use(express.json());

//Route Middlware
app.use('/api/user', authRoute);
app.use('/api/todo', todoRoute);

app.listen(9000, () => console.log('server up and running'));
