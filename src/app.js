const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('express').Router();
const courseInfo = require('./routes/newsInfo');
const mongoose = require("mongoose");
const {signin, signup} = require("./controllers/authController");
require("dotenv")
  .config();

process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});

if(process.env.NODE_ENV != 'test') {
//Connect to database
  try {
    mongoose.connect("mongodb://localhost:27017/usersdb", {
      useUnifiedTopology: true,
      useNewUrlParser: true
    });
    console.log("connected to db");
  } catch (error) {
    handleError(error);
  }
}

const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

const PORT = 3000;

routes.get('/', (req, res)=>{
  res.status(200).send("Welcome to the News Fetching App");
});

routes.use('/courses', newsInfo);

routes.post('/register', signup);

routes.post('/signin', signin);

app.listen(process.env.PORT || PORT, (error) =>{
  if(!error)
      console.log("Server is Successfully Running and App is listening on port " + PORT);
  else
      console.log("Error occurred, server can't start", error);
  }
);

module.exports = app;
