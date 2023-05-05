const express = require('express');
const passport = require('passport');
const router = express.Router();
const path = require('path');
const User = require('./models/User');
const passportConfig = require('./config/passport-config');
const flash = ('connect-flash')
const uuid = require('uuid')

const nodemailer = require('nodemailer');
const crypto = require('crypto');

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

  const userData = req.session.userData  || {};
  const sessionId = req.session.sessionId || null;
  console.log("flashdata:",flashData)
  console.log("userdata:",userData)
  console.log("sessionId:",sessionId)
  res.render('index', {flashData, userData, sessionId});
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

      const sessionId = uuid.v4();
      // user.token = token;

      await user.save();
      console.log("HERE")



      req.login(user, (err) => {
        if (err) {
          return next(err);
        }

        req.flash("flashData", {
          welcomeMessage: `Hi ${user.username}`,
          flashMessage: "guest"
        });

        req.session.sessionId = sessionId
        req.session.userData = {
          name: user.username,
          session: {},
          badges: []
        }

     
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
      const sessionId = uuid.v4();
      req.flash('flashData', {
        welcomeMessage: `Hi ${user.username}`,
        flashMessage: 'success' // pass flashMessage to the view
        //
      })
      
      req.session.userData = {
          name: user.username,
          session: {},
          badges: user.badges,
      }
      req.session.sessionId=sessionId
      

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
    req.flash('flashAlert', {
      type: 'error',
      message: "Email Required."
    })
    return res.redirect('/signup')
  }

  const user = new User({ username, email, password, authType: 'local', session: {}, badges: [] });
  try {
    await user.save();
    req.login(user, function (err) {
      if (err) { return next(err); }
      // req.flash('sign-up-successful,"Account Created Succesfully')
      // req.flash('flashMessage', {
      //   type: 'success',
      //   message: 'Account Created Succesfully'
      // })
      // req.flash("flashData", {
      //   welcomeMessage: `Hi ${username}`,
      //   userData: {
      //     name: user.username,
      //     session: {},
      //     badges: []
      //   },
      //   flashMessage: "guest"
      // })

      const sessionId = uuid.v4();
      req.flash('flashData', {
        welcomeMessage: `Hi ${user.username}`,
        flashMessage: 'success' // pass flashMessage to the view
        //
      })
      
      req.session.userData = {
          name: user.username,
          session: {},
          badges: user.badges,
      }
      req.session.sessionId=sessionId
      return res.redirect('/')

      // return res.render('index', {
      //   welcomeMessage: `Hi ${username}`,
      //   userData: {
      //     name: user.username,
      //     session: {},
      //     badges: []
      //   },
      //   flashMessage: "success"
      // })
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


    // req.flash('flashData', {
    //   welcomeMessage: `Hi ${profileName}`,
    //   userData: {
    //     name: profileName,
    //     session: {},
    //     badges: loadUser.badges,

    //   },
    //   flashMessage: 'success' // pass flashMessage to the view
    // })


    const sessionId = uuid.v4();
    req.flash('flashData', {
      welcomeMessage: `Hi ${profileName}`,
      flashMessage: 'success' // pass flashMessage to the view
      //
    })
    
    req.session.userData = {
        name: profileName,
        session: {},
        badges: loadUser.badges,
    }
    req.session.sessionId=sessionId




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



const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'admin@mathgenius.ca',
    pass: process.env.EMAILPASS
  }
});



router.get('/forgot-password', (req, res) => {
   const flashMessage = req.flash('flashAlert')[0]
  var passwordMessage = ''
  var messageType = ''
  if (flashMessage) {
    messageType = flashMessage.type;
    passwordMessage = flashMessage.message;
  }
  console.log(messageType)
  console.log(passwordMessage)
  res.render('forgotPassword', {
    messageType: messageType,
    passwordMessage: passwordMessage
  });
});




router.post('/forgot-password', async(req, res) => {
  const { email } = req.body;
try{
  const user = await User.findOne({ email })
  
    if ( !user) {
      req.flash('flashAlert', {type:'error',message:'No account with that email address exists.'});
      return res.redirect('/forgot-password');
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    user.save()
    // (err) => {
    //   if (err) {
    //     req.flash('flashAlert', {type:'error',message: 'Error saving user with reset token.'});
    //     return res.redirect('/forgot-password');
    //   }

      const mailOptions = {
        from: 'admin@mathgenius.ca',
        to: email,
        subject: 'Password reset request',
        html: `Please click this link to reset your password: <a href="http://localhost:4000/reset-password/${token}">Reset Password</a>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          req.flash('flashAlert', {type:'error',message: 'Error sending password reset email.'});
          return res.redirect('/forgot-password');
        } else {
          console.log('Email sent: ' + info.response);
          req.flash('flashAlert',  {type:'success',message:'Password reset email sent. Check your inbox.'});
          return res.redirect('/forgot-password');
        }
      
      
      });
    }
    catch(err){
      console.log(err);
      req.flash('flashAlert', {type:'error',message:'Error occurred resetting your password.'});
      return res.redirect('/forgot-password');
    }
    });


router.get('/reset-password/:token', async (req, res) => {
 try{ 
  const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
 
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot-password');
    }
    res.render('reset-password', { token: req.params.token });
  }
  catch(err){
    console.error(err);
    req.flash('flashAlert',{
      message:'An error occurred while resetting your password.', type:'error'
    })
  }
});




router.post('/reset-password/:token', async (req, res) => {

  try{
  const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })
  
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('back');
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save()
    

      req.logIn(user, (err) => {
        if (err) {
          req.flash('flashAlert',{type:'error', message:'Error logging in with new password.'});
          return res.redirect('/login');
        } else {
          req.flash('flashAlert',{type:'success', message: 'Password successfully reset.'});
          return res.redirect('/');
        }
      });
    }
  catch(err){
    console.log(err);
    req.flash('flashAlert', {type:'error',message:'Error occurred resetting your password.'});
    return res.redirect('/forgot-password');
  }
  });




















module.exports = router;
