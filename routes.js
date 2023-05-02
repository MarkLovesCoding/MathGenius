const express = require('express');
const passport = require('passport');
const router = express.Router();
const path = require('path');
const User = require('./models/User');
const passportConfig = require('./config/passport-config');
const flash = ('connect-flash')
passportConfig(passport);


// 
// Rendering Routes
// 

const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // redirect to login page if not authenticated
    return res.redirect('/login');
  }
  next();
};

// set up the home route
router.get('/', requireAuth, (req, res) => {

  var flashData = req.flash('flashData')[0]



  res.render('index', flashData);
});

router.get('/login', (req, res) => {
  const flashMessage = req.flash('flashAlert')[0]
  var loginMessage = ''
  var messageType = ''
  if (flashMessage) {
    messageType = flashMessage.type;
    loginMessage = flashMessage.message;
  }
  console.log(messageType)
  console.log(loginMessage)
  res.render('login', {
    messageType: messageType,
    loginMessage: loginMessage
  });
});

router.post('/guest',  (req, res, next) => {
  passport.authenticate('guest', async (err, user, info) => {
    if(err){
      console.log("error occured authenticating guest:", err)
    }

    let username, guestEmail;
    let userExists = true;
    
    while (userExists) {
      username = 'Guest_' + Math.floor(Math.random() * 100000);
      guestEmail = `${username}@${username}.com`;
      try {
         user = await User.findOne({ username: username, guest: true });
        userExists = user ? true : false;
      } catch (error) {
        console.error(error);
        res.sendStatus(500);
        return;
      }
    }
    try {
      // Check if a guest user with this username already exists
      // If not, create a new user and save it to the database

      user = new User({
        username: username,
        email: guestEmail,
        authType: 'guest',
        guest: true
      });
      await user.save();
      console.log("HERE")


      req.login(user, (err) => {
        if (err) {
          return next(err);
        }
        // Redirect to the home page
        req.flash("flashData", {
          welcomeMessage: `Hi ${user.username}`,
          userData: {
            name: user.username,
            session: {},
            badges: []
          },
          flashMessage: "guest"
        });
        return res.redirect('/');
      });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }

  //     // console.log(req.isAuthenticated)
  //     req.flash("flashData", {
  //       // signupSuccessMessage: "Hello Guest!",
  //       welcomeMessage: `Hi ${user.username}`,
  //       userData: {
  //         name: user.username,
  //         session: {},
  //         badges: []
  //       },
  //       flashMessage: "guest"
  //     })

  //     console.log('redirect now');
  //     return res.redirect('/')

  //   } catch (error) {
  //     console.error(error);
  //     res.sendStatus(500);
  //   }
  })(req, res, next);






});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {

    if (err) {


      req.flash('flashAlert', {
        type: 'error',
        message: 'Error Loging In'
      })
      return res.redirect('/login')

    }
    if (!user) {

      req.flash('flashAlert', {
        type: 'error',
        message: 'Invalid Username or Password.'
      })
      return res.redirect('/login')



      // });
    }
    req.login(user, (err) => {
      if (err) {
        console.log(" error logging in")
        return next(err);
      }

      req.flash('flashData', {
        welcomeMessage: `Hi ${user.username}`,
        userData: {
          _id: user._id,
          name: user.name,
          session: {},
          badges: user.badges,

        },
        flashMessage: 'success' // pass flashMessage to the view
        //
      }
      )

      return res.redirect('/')



    });
  })(req, res, next);
});



router.get('/signup', (req, res) => {


  const flashMessage = req.flash('flashAlert')[0]
  var signupMessage = ''
  var messageType = ''
  if (flashMessage) {
    messageType = flashMessage.type;
    signupMessage = flashMessage.message;
  }
  console.log(messageType)
  console.log(signupMessage)
  res.render('signup', {
    messageType: messageType,
    signupMessage: signupMessage.message
  });

});

router.post('/signup', async function (req, res, next) {
  const { username, email, password } = req.body;

  // Check if email field exists and is not empty
  if (!email) {
    return res.render('signup', {
      errorMessage: `Email Required.`
    });
  }

  const user = new User({ username, email, password, authType: 'local', session: {}, badges: [] });
  try {
    await user.save();
    req.login(user, function (err) {
      if (err) { return next(err); }
      // req.flash('sign-up-successful,"Account Created Succesfully')
      req.flash('flashMessage', {
        type: 'success',
        message: 'Account Created Succesfully'
      })
      req.flash("flashData", {
        welcomeMessage: `Hi ${username}`,
        userData: {
          name: user.username,
          session: {},
          badges: []
        },
        flashMessage: "guest"
      })


      return res.render('index', {
        welcomeMessage: `Hi ${username}`,
        userData: {
          name: user.username,
          session: {},
          badges: []
        },
        flashMessage: "success"
      })
    });
  } catch (err) {
    if (err.code === 11000) { // Duplicate email error

      req.flash('flashAlert', {
        type: 'error',
        message: "Duplicate email. Please use a different email."
      })
      return res.redirect('/signup')

    } else { // Other error
      console.log(err)
      let message
      if (err.errors.username) {
        message = err.errors.username
      }
      else if (err.errors.password) {
        message = err.errors.password
      }
      else if (err.errors.email) {
        message = err.errors.email
      }

      req.flash('flashAlert', {
        type: 'error',
        message: message
      })

      return res.redirect('/signup')
    }
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
    const loadUser = req.user;

    const profileName = loadUser.username


    req.flash('flashData', {
      welcomeMessage: `Hi ${profileName}`,
      userData: {
        _id: loadUser._id,
        name: profileName,
        session: {},
        badges: loadUser.badges,

      },
      flashMessage: 'success' // pass flashMessage to the view
    })
    return res.redirect('/')

    // res.render('index', {
    //   signupSuccessMessage: req.flash('google-sign-in'),
    //   welcomeMessage: `Hi ${profileName}`,
    //   userData: {
    //   }
    // });
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

router.post(
  '/auth/guest',
  passport.authenticate('guest'),
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









// Protected Routes
// 
// 





module.exports = router;
