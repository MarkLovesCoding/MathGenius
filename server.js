const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport')
const session = require('express-session')
const routes = require('./routes/routes');
const passportConfig = require('./config/passport-config'); // import the passport configuration
const db = require('./db/db');


const app = express();


// set up the logger middleware
app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


 app.use(session({
  secret: 'my-secret-key-2lkj2n3ifulsidfnlkj3r23r232nkiiiicc7s8s873hdkn4k',
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.initialize()) 
 app.use(passport.session())

 passportConfig(passport);

const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // redirect to login page if not authenticated
    return res.redirect('/login');
  }
  next();
}
app.use('/', routes);


app.get('/', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// 

// app.get('/', (req, res) => {
//   db.collection('myCollection').find().toArray((err, data) => {
//     if (err) throw err;
//     res.send(data);
//   });
// });
// 





// set up the home route
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/views/login.html'));
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

app.get('/play', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});
app.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/views/signup.html'));
});



// serve static files from the public directory
app.use(express.static(path.join(__dirname, 'dist'))  );




// start the server
const port = 4000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
