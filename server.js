const express = require('express');
// const sassMiddleware = require('node-sass-middleware');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
// const helmet = require('helmet');
// const csp = require('helmet-csp');

const app = express();

// set up the Sass middleware
// app.use(sassMiddleware({
//   src: path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   indentedSyntax:false,
//   debug: true,
//   outputStyle: 'expanded'
// }));

// if (process.env.NODE_ENV === 'development') {
//   require('./dev.js');
// }

// set up the logger middleware
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Set up Content Security Policy middleware

// set up the home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/routes/login.html'));
});
app.get('/play', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});



// serve static files from the public directory
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));




// start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
