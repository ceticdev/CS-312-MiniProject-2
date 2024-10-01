// import express and axios
import express from 'express';
import axios from 'axios';
// import routes
import indexRoutes from './routes/index.js';
// create instance of Express app
const app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// serve static files
app.use(express.static('public'));

// middleware to parse the POST request body
app.use(express.urlencoded({ extended: true }));

// use imported routes
app.use('/', indexRoutes);

// start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

