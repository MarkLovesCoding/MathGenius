const express = require('express');
const sassMiddleware = require('node-sass-middleware');
const morgan = require('morgan');
const path = require('path');

const app = express();

// set up the Sass middleware
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax:false,
  debug: true,
  outputStyle: 'expanded'
}));


// set up the logger middleware
app.use(morgan('dev'));

// serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// set up the home route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// start the server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
