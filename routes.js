const express = require('express');
const passport = require('passport');
const router = express.Router();
const path = require('path');
const User = require('./models/User');
const passportConfig = require('./config/passport-config');

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
  res.render('index',{
    welcomeMessage:null,
    userData:null
  });
});

router.get('/login', (req, res) => {
  res.render('login',{
    loginMessage:""
  });
});

router.post('/guest', async (req, res) => {
  let username, guestEmail;
  let userExists = true;
  // const username = 'guest' + Math.floor(Math.random() * 1000000);
  // const guestEmail = `${username}@${username }.com`  // res.render('index',{
  // //   welcomeMessage:`Hi ${username}`,
  // //   userData:{
  // //     name:username,
  // //     session:{},
  // //     badges:[]
  // //   }
  // // })

  while (userExists) {
    username = 'Guest_' + Math.floor(Math.random() * 100000);
    guestEmail = `${username}@${username }.com`;
    try {
      let user = await User.findOne({ username: username, guest: true });
      userExists = user ? true : false;
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
      return;
    }
  }
  try {
    // Check if a guest user with this username already exists
    let user = await User.findOne({ username: username, guest: true });

    // If not, create a new user and save it to the database
    if (!user) {
      user = new User({
        username: username,
        email:guestEmail,
        authType:'guest',
        guest: true
      });
      await user.save();
    }

    // Render the "play" view with the guest user's data
    res.render('index', {
      welcomeMessage: `Hi ${user.username}`,
      userData: {
        name: user.username,
        session: {},
        badges: []
      }
    });

  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    console.log("userrouter:");
    if (err) {
      console.log(" error first")
      return res.render('login',{
        loginMessage:'Login Error Occurred. Try Again.'
      });
    }
    if (!user) {
      console.log(" error with username or pass")
      return res.render('login',{
        loginMessage:'Invalid Username or Password.'
      });
    }
    req.login(user, (err) => {
      if (err) {
        console.log(" error logging in")
        return next(err);
      }
     

      return res.render('index',{
        welcomeMessage:`Hi ${user.username}`,
        userData:{
          _id:user._id,
          name:user.name,
          session:{},
          badges:user.badges
        }
      });
    });
  })(req, res, next);
});

router.get('/play', (req, res) => {
  res.render('index',{
    welcomeMessage:req.data.welcomeMessage || "nowelcome",
    userData:req.data.userData||"nodata"
  });
}); 

router.get('/signup', (req, res) => {
  res.render('signup',{
    signupMessage:''
  });
});

router.post('/signup', async function (req, res, next) {
  const { username, email, password } = req.body;

  // Check if email field exists and is not empty
  if (!email) {
    return res.render('signup',{
      errorMessage:`Email Required.`
    });
  }

  const user = new User({ username, email, password, authType: 'local',session:{},badges:[] });
  try {
    await user.save();
    req.login(user, function (err) {
      if (err) { return next(err); }
   
      return res.render('index',{
        welcomeMessage:`Hi ${username}`,
        userData:{
        }
    })
    });
  } catch (err) {
    if (err.code === 11000) { // Duplicate email error
      return res.render('signup',{
        signupMessage:"Duplicate email. Please use a different email."
        
      });
    } else { // Other error
      console.log(err)
      let message
      if(err.errors.username){
        message = err.errors.username
      }
      else if(err.errors.password){
        message = err.errors.password
      }
      else if(err.errors.email){
        message = err.errors.email
      }  
      return res.render('signup',{
        
       signupMessage:message
      });
    }}




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
    res.render('index',{
      welcomeMessage:`Hi ${profileName}`,
      userData:{
      }
    });
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









// Protected Routes
// 
// 





module.exports = router;
