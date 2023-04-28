const express = require('express');
const passport = require('passport');
const router = express.Router();
const path = require('path');
const User = require('./models/User');
const passportConfig = require('./config/passport-config');

passportConfig(passport);

const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // redirect to login page if not authenticated
    return res.redirect('/login');
  }
  next();
};

// set up the home route
router.get('/', requireAuth, (req, res) => {
  res.render('index');
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log("userrouter:");
    if (err) {
      console.log(" error first")
      return res.status(401).json({message: err.message});
    }
    if (!user) {
      console.log(" error with username or pass")
      return res.status(401).json({message:"Invalid username or password."});
    }
    req.login(user, (err) => {
      if (err) {
        console.log(" error logging in")
        return next(err);
      }
      return res.status(200).json({success:true});
    });
  })(req, res, next);
});

router.get('/play', (req, res) => {
  res.render('index');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', async function (req, res, next) {
  const { username, email, password } = req.body;

  // Check if email field exists and is not empty
  if (!email) {
    return res.status(400).json({ error: 'Email field is required' });
  }

  const user = new User({ username, email, password, authType: 'local' });
  try {
    await user.save();
    req.login(user, function (err) {
      if (err) { return next(err); }
      return res.redirect('/play');
    });
  } catch (err) {
    if (err.code === 11000) { // Duplicate email error
    } else { // Other error
    }
    return res.redirect('/signup');
  }
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

router.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    req.session.destroy(function (err) {
      if (err) {
        console.log(err);
      }
      res.redirect('/login');
    });
  });
});

module.exports = router;
