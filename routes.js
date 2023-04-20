const express = require('express');
const passport = require('passport');
const router = express.Router();
const path = require('path');
const User = require('./models/User')


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

// router.post('/signup', function(req, res, next) {
//   const { firstName, lastName, email, password } = req.body;
//   const user = new User({ email, password });
//   user.save(function(err) {
//     if (err) { return next(err); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/play');
//     });
//   });
// });
// router.post('/signup', function(req, res, next) {
//   const { email, password } = req.body;
//   const user = new User({ email, password });
//   user.save()
//     .then(() => {
//       req.logIn(user, function(err) {
//         if (err) { return next(err); }
//         return res.redirect('/play');
//       });
//     })
//     .catch((err) => next(err));
// });


// router.post('/signup', (req, res) => {
//   const {email, password } = req.body;
//   const user = new User({email, password });
//   user.save()
//     .then(user => res.send(user))
//     .catch(err => {
//       console.log(err);
//       res.status(500).send(err);
//     });
// });
router.post('/signup', async function(req, res, next) {
  const { username, email, password } = req.body;

  // Check if email field exists and is not empty
  if (!email) {
    return res.status(400).json({ error: 'Email field is required' });
  }

  const user = new User({ username, email, password });
  try {
    await user.save();
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/play');
    });
  } catch (err) {
    return next(err);
  }
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


