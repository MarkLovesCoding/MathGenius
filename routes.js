const express = require('express');
const passport = require('passport');
const router = express.Router();
const path = require('path');
const User = require('./models/User');
const Swal = require('sweetalert2');

const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // redirect to login page if not authenticated
    return res.redirect('/login');
  }
  next();
};

// set up the home route
router.get('/', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/views/login.html'));
});

router.post('/login',
  passport.authenticate('local', { successRedirect: '/play', failureRedirect: '/login' }));

router.get('/play', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/views/signup.html'));
});

router.post('/signup', async function(req, res, next) {
  const { username, email, password } = req.body;

  // Check if email field exists and is not empty
  if (!email) {
    return res.status(400).json({ error: 'Email field is required' });
  }

  const user = new User({ username, email, password, authType:'local' });
  try {
    await user.save();
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/play');
    });
  } catch (err) {
    console.log("swal should run here")
    if (err.code === 11000) { // Duplicate email error
     
      Swal.fire({
        icon: 'error',
        title: 'Sign up failed',
        text: 'This email has already been registered'
      });
    } else { // Other error
      Swal.fire({
        icon: 'error',
        title: 'Sign up failed',
        text: 'An error occurred while signing up'
      });
    }
    return res.redirect('/signup');
  }
});

router.get('/logout', function(req, res){
  req.logout(function(err){
    if(err){
      console.log(err);
      return next(err);
    }
    res.redirect('/');
  });
});

// route for Google authentication
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile'] })
);

// callback route for Google authentication
router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

// route for Local authentication
router.post(
  '/auth/local',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;
