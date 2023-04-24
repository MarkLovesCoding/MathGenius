const express = require('express');
const flash = require('connect-flash')
const session = require('express-session')
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

router.use(flash());
// set up the home route
router.get('/', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/views/login.html'));
});


  router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        console.log(" error first")
        req.flash('error', 'An error occurred while logging in. Please try again.');
        return res.redirect('/login');
      }
      if (!user) {
        console.log(" error username pass")

        req.flash('error', 'Invalid username or password.');
        return res.redirect('/login');
      }
      req.login(user, (err) => {
        if (err) {
        console.log(" error logging in")

          req.flash('error', 'An error occurred while logging in. Please try again.');
          return next(err);
        }
        req.flash('success', 'Login successful!');
        return res.redirect('/play');
      });
    })(req, res, next);
  });
  





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
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/play');
    });
  } catch (err) {
    if (err.code === 11000) { // Duplicate email error
      req.flash('error', 'This email has already been registered');
    } else { // Other error
      req.flash('error', 'An error occurred while signing up');
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



router.get('/logout', function(req, res) {
  req.logout(function(err) {
    if (err) {
      console.log(err);
    }
    req.session.destroy(function(err) {
      if (err) {
        console.log(err);
      }
      res.redirect('/login');
    });
  });
});



module.exports = router;
