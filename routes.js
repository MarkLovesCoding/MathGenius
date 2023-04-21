const express = require('express');
const flash = require('connect-flash')
const session = require('express-session')
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
router.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
router.use(flash());
// set up the home route
router.get('/', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

router.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/views/login.html'));
});

// router.post('/login',
//   passport.authenticate('local', { successRedirect: '/play', failureRedirect: '/login' }));

  // router.post('/login', passport.authenticate('local', {
  //   successRedirect: '/play',
  //   failureRedirect: '/login',
  //   // failureFlash: true
  // }), (req, res, next) => {
  //   // This middleware will only be executed if there is an authentication error
  //   const errors = req.flash('error');
  //   const errorMessage = errors.length ? errors[0] : 'Unknown error';
  //   if (errorMessage) {
  //     res.status(401).json({ error: errorMessage });
  //   } else {
  //     res.status(200).json({ message: 'Login successful' });
  //   }
  // });
  

  // router.post('/login', (req, res, next) => {
  //   passport.authenticate('local', (err, user, info) => {
  //     if (err) {
  //       return next(err);
  //     }
  //     if (!user) {
  //       switch (info.type) {
  //         case 'username':
  //           return res.status(401).json({ error: 'Incorrect username' });
  //         case 'password':
  //           return res.status(401).json({ error: 'Incorrect password' });
  //         default:
  //           return res.status(401).json({ error: 'Unknown error' });
  //       }
  //     }
  //     req.logIn(user, (err) => {
  //       if (err) {
  //         return next(err);
  //       }
  //       return res.status(200).json({ message: 'Login successful' });
  //     });
  //   })(req, res, next);
  // });
  
  // router.post('/login', (req, res, next) => {
  //   passport.authenticate('local', (err, user, info) => {
      
  //     console.log('err', err);
  //     console.log('user', user);
  //     console.log('info', info);
  //     if (err) {
  //       return next(err);
  //     }
  //     if (!user) {
  //       console.log("invalid username????");
  //       return res.status(401).json({ error: 'Invalid username or password' });
  //     }
  //     req.logIn(user, (err) => {
  //       if (err) {
  //         return next(err);
  //       }
  //       return res.status(200).json({ message: 'Login successful' });
  //     });
  //   })(req, res, next);
  // });
  
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
      req.logIn(user, (err) => {
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

// router.post('/signup', async function(req, res, next) {
//   const { username, email, password } = req.body;

//   // Check if email field exists and is not empty
//   if (!email) {
//     return res.status(400).json({ error: 'Email field is required' });
//   }

//   const user = new User({ username, email, password, authType:'local' });
//   try {
//     await user.save();
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/play');
//     });
//   } catch (err) {
//     console.log("swal should run here")
//     if (err.code === 11000) { // Duplicate email error
     
//       Swal.fire({
//         icon: 'error',
//         title: 'Sign up failed',
//         text: 'This email has already been registered'
//       });
//     } else { // Other error
//       Swal.fire({
//         icon: 'error',
//         title: 'Sign up failed',
//         text: 'An error occurred while signing up'
//       });
//     }
//     return res.redirect('/signup');
//   }
// });





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
    if (err.code === 11000) { // Duplicate email error
      req.flash('error', 'This email has already been registered');
    } else { // Other error
      req.flash('error', 'An error occurred while signing up');
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
