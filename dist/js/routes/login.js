const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
router.get('/', (req, res) => {
  res.render('login', {
    message: req.flash('loginMessage')
  });
});
router.post('/local', (req, res, next) => {
  passport.authenticate('local-login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});
router.post('/local', (req, res) => {
  const {
    username,
    password
  } = req.body;
  User.findOne({
    username: username
  }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else if (!user) {
      res.render('login', {
        message: 'Incorrect username or password'
      });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else if (result) {
          req.session.user = user;
          res.redirect('/profile');
        } else {
          res.render('login', {
            message: 'Incorrect username or password'
          });
        }
      });
    }
  });
});
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}));
router.get('/google/callback', passport.authenticate('google', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}));
module.exports = router;