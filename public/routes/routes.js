const express = require('express');
const passport = require('passport');
const router = express.Router();
const path = require('path');



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
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }));

router.get('/play', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

router.get('/signup', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/views/signup.html'));
});







// router.get('/login', function(req, res, next) {
//   res.render('login', { title: 'Login' });
// });

// router.post('/login', passport.authenticate('local', {
//   successRedirect: '/profile',
//   failureRedirect: '/login',
//   failureFlash: true
// }));

// router.get('/signup', function(req, res, next) {
//   res.render('signup', { title: 'Sign Up' });
// });

router.post('/signup', function(req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  const user = new User({ firstName, lastName, email, password });
  user.save(function(err) {
    if (err) { return next(err); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/profile');
    });
  });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// router.get('/profile', isLoggedIn, function(req, res){
//   res.render('profile', { title: 'Profile', user: req.user });
// });




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


