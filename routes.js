const express = require('express');
const passport = require('passport');
const router = express.Router();
const path = require('path');
const User = require('./models/User');
const passportConfig = require('./config/passport-config');
const flash = require('connect-flash')
const uuid = require('uuid')


const crypto = require('crypto');
const sendinblue = require('./config/email-config')
passportConfig(passport);

const SibApiV3Sdk = require('sib-api-v3-sdk');
const rateLimit = require("express-rate-limit");
// 
// Rendering Routes
// 



const requireAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // redirect to login page if not authenticated
    return res.redirect('/landing');
  }
  next();
};




// Navigation GET Routes

// Home route
router.get('/', requireAuth, (req, res) => {



  res.render('index');
});

router.get('/privacy', requireAuth, (req, res) => {

 

  res.render('privacy');
});
router.get('/landing', requireAuth, (req, res) => {

 

  res.render('landing');
});

router.get('/login', (req, res) => {

  const flashMessage = req.flash('flashAlert')[0]
  var loginMessage = ''
  var messageType = ''
  if (flashMessage) {
    messageType = flashMessage.type;
    loginMessage = flashMessage.message;
  }
  res.render('login', {
    messageType: messageType,
    loginMessage: loginMessage
  });
});

function requireLogin(req, res, next) {
  if (!req.session.userData) {
    res.redirect('/login');
  } else {
    next();
  }
}

router.get('/profile',requireLogin, (req, res) => {

  res.render('profile', {
    userData:req.session.userData
  });
});

router.get('/signup', (req, res) => {


  const flashMessage = req.flash('flashAlert')[0]
  var signupMessage = ''
  var messageType = ''
  if (flashMessage) {
    messageType = flashMessage.type;
    signupMessage = flashMessage.message;
  }

  res.render('signup', {
    messageType: messageType,
    signupMessage: signupMessage.message
  });

});

// POST Routes


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

    }
    req.login(user, async (err) => {
      if (err) {
        console.log(" error logging in")
        return next(err);
      }
      


      req.session.userData = {
        userId:user._id.toString(),

        name: user.username,
        session:{},
        badges: user.badges,
        imageSrc:user.imageSrc
      }
      req.flash('flashData', {
        welcomeMessage: 'Successful Login',
        flashMessage: 'success' // pass flashMessage to the view
        //
      })

 
      // req.session.sessionId = sessionId

      return res.redirect('/')

    });
  })(req, res, next);
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

  const user = new User({ username, email, password, authType: 'local', session: {}, badges: {} });
  try {
    await user.save();
    req.login(user, function (err) {
      if (err) { return next(err); }

      // const sessionId = uuid.v4();
      req.flash('flashData', {
        welcomeMessage: `Successful Login`,
        flashMessage: 'success' // pass flashMessage to the view
        //
      })

      req.session.userData = {
        userId:user._id.toString(),
        name: user.username,
        session: {},
        badges: {
          "game":{
            1:false,
            2:false,
            3:false,
            4:false,
            5:false,
          },
          "quiz":{
            1:false,
            2:false,
            3:false,
            4:false,
            5:false,
          },
          "mcquiz":{
            1:false,
            2:false,
            3:false,
            4:false,
            5:false,
          }
        },
        imageSrc:user.imageSrc

      }
      // req.session.sessionId = sessionId
      return res.redirect('/')


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



router.post('/guest', (req, res, next) => {
  passport.authenticate('guest', async (err, user, info) => {
    if (err) {
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
        badges: {
          "game":{
            1:false,
            2:false,
            3:false,
            4:false,
            5:false,
          },
          "quiz":{
            1:false,
            2:false,
            3:false,
            4:false,
            5:false,
          },
          "mcquiz":{
            1:false,
            2:false,
            3:false,
            4:false,
            5:false,
          }
        },
        guest: true,
        // imgSrc:"http://localhost:4000/assets/mouse.png"
      });

      // const sessionId = uuid.v4();
      // user.token = token;

      await user.save();
  

      req.login(user, (err) => {
        if (err) {
          return next(err);
        }

        req.flash("flashData", {
          welcomeMessage: `Successful Login`,
          flashMessage: "success"
        });

        // req.session.sessionId = sessionId
        req.session.userData = {
        userId:user._id.toString(),

          name: user.username,
          session: {lastLogin:new Date()},
          
          imageSrc:"../assets/cat.png"

        }

        return res.redirect('/');
      });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }

  })(req, res, next);


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




    // const sessionId = uuid.v4();
    req.flash('flashData', {
      welcomeMessage: `Hi ${profileName}`,
      flashMessage: 'success' // pass flashMessage to the view
      //
    })

    req.session.userData = {
      userId:loadUser._id.toString(),
      name: profileName,
      session: {},
      badges: loadUser.badges,
    }
    // req.session.sessionId = sessionId

    return res.redirect('/')


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




// Email Routes
// 
// 


const sendEmail = async (to, subject, html) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.sender = { name: 'Math Genius', email: 'no-reply@mathgenius.ca' };
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html;


  try {
    const response = await sendinblue.sendTransacEmail(sendSmtpEmail);
  } catch (error) {
    console.error(error);
  }
};

const url = "https://www.mathgenius.ca"



router.get('/forgot-username', (req, res) => {
  const flashMessage = req.flash('flashAlert')[0]
  var passwordMessage = ''
  var messageType = ''
  if (flashMessage) {
    messageType = flashMessage.type;
    passwordMessage = flashMessage.message;
  }

  res.render('forgotUsername', {
    messageType: messageType,
    passwordMessage: passwordMessage
  });
});


router.post('/forgot-username', async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('flashAlert', { type: 'error', message: 'No account with that email address exists.' });
      return res.redirect('/forgot-password');
    }

    const html = `Hey there! Your username is: ${user.username}.  <a href="${url}/login">Click here to Login.</a> `;
    await sendEmail(email, 'Username Retrieval', html);
    req.flash('flashAlert', { type: 'success', message: 'Username sent to your email. Please check your inbox.' });
    return res.redirect('/login');
  } catch (err) {
    console.log(err);
    req.flash('flashAlert', { type: 'error', message: 'Error retrieving your username. Please try again.' });
    return res.redirect('/forgot-password');
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
  res.render('forgotPassword', {
    messageType: messageType,
    passwordMessage: passwordMessage
  });
});




// Set up rate limiter to prevent brute force attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes"
});


router.post('/forgot-password', limiter, async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email })

    if (!user) {
      req.flash('flashAlert', { type: 'error', message: 'No account with that email address exists.' });
      return res.redirect('/forgot-password');
    }

    const token = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    user.save()


    const html = `Almost there ${user.username}! Click this link to reset your password: <a href="https://www.mathgenius.ca/reset-password/${token}">Reset Password</a>`;
    await sendEmail(email, 'Password reset request', html);
    req.flash('flashAlert', { type: 'success', message: 'Email Sent. Please Check your inbox' });
    return res.redirect('/forgot-password');

  }
  catch (err) {
    console.log(err);
    req.flash('flashAlert', { type: 'error', message: 'Error occurred resetting your password.' });
    return res.redirect('/forgot-password');
  }
});




router.get('/reset-password/:token', async (req, res) => {

  try {
    const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })

    if (!user) {

      req.flash('flashAlert', {
        type: 'error', message: 'Password reset token is invalid or has expired.'
      })
      return res.redirect('/forgot-password');
    }
    req.flash('flashAlert', {
      type: 'success', message: 'Resetting Password.'
    })
    const flashMessage = req.flash('flashAlert')[0]
    var passwordMessage = ''
    var messageType = ''
    if (flashMessage) {
      messageType = flashMessage.type;
      passwordMessage = flashMessage.message;
    }

    res.render('resetPassword', {
      messageType: messageType,
      passwordMessage: passwordMessage,
      token: req.params.token
    });

  }
  catch (err) {
    console.error(err);
    req.flash('flashAlert', {
      type: 'error', message: 'An error occurred while resetting your password.'
    })
  }
});


router.post('/reset-password/:token', async (req, res) => {

  try {
    const user = await User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } })

    if (!user) {

      req.flash('flashAlert', { type: 'error', message: 'Password reset token is invalid or has expired.' });
      return res.redirect('/forgot-password');

    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save()


    req.logIn(user, (err) => {
      if (err) {
        req.flash('flashAlert', { type: 'error', message: 'Error logging in with new password.' });
        return res.redirect('/login');
      } else {
        req.flash('flashAlert', { type: 'success', message: 'Password successfully reset.' });
        return res.redirect('/login');
      }
    });
  }
  catch (err) {
    console.log(err);
    req.flash('flashAlert', { type: 'error', message: 'Error occurred resetting your password.' });
    return res.redirect('/forgot-password');
  }
});




// Tests Menu
router.get('/tests', requireAuth, (req, res) => {

  var flashData = req.flash('flashData')[0]

  const userData = req.session.userData || {};
  res.render('testsMenu', { flashData, userData });
});

// Practice Menu
router.get('/practice', requireAuth, (req, res) => {

  var flashData = req.flash('flashData')[0]

  const userData = req.session.userData || {};
  res.render('practiceMenu', { flashData, userData });
});



// Games
router.get('/flash', requireAuth, (req, res) => {
  res.render('flash');
});

router.get('/multiple-choice', requireAuth, (req, res) => {
  res.render('multipleChoice');
});

router.get('/multiple-choice-quiz', requireAuth, (req, res) => {
  res.render('multipleChoiceQuiz');
});

router.get('/pop-quiz', requireAuth, (req, res) => {
  res.render('popQuiz');
});

router.get('/high-score-challenge', requireAuth, (req, res) => {
  res.render('highScoreChallenge');
});



















// Profile Page APIs



router.patch('/update-image', requireAuth,async (req, res) => {
  const {userId, newSrc } = req.body;


  try {
    await User.findByIdAndUpdate(userId, { imageSrc: newSrc });
    req.session.userData.imageSrc = newSrc;
    res.send('Image source updated successfully!');
  } catch (error) {
    console.error(`Error updating image source: ${error}`);
    res.status(500).send('Error updating image source!');
  }
});

router.get('/user-id', requireAuth,async (req, res) => {

  const userId = req.session.userData.userId;

  res.json({ userId });
});

router.get('/get-avatar', requireAuth, async (req, res) => {
  try {
    const userId = req.session.userData.userId;
    const user = await User.findById(userId);
    const avatarSrc = user.imageSrc;

    res.json({ avatarSrc });
  } catch (error) {
    console.error(`Error fetching avatar: ${error}`);
    res.status(500).send('Error fetching avatar');
  }
});

router.get('/get-badges', requireAuth, async (req, res) => {
  try {
    const userId = req.session.userData.userId;

    const user = await User.findById(userId);

    const badges = user.badges;
    res.json({ badges });
  } catch (error) {
    console.error(`Error fetching badges: ${error}`);
    res.status(500).send('Error fetching badges');
  }
});
router.patch('/update-badges', requireAuth,async (req, res) => {
  const {userId, updatedBadges } = req.body;

  try {
    await User.findByIdAndUpdate(userId, { badges: updatedBadges });

    res.send('Badges updated successfully!');
  } catch (error) {
    console.error(`Error updating badges: ${error}`);
    res.status(500).send('Error updating badges!');
  }
});
module.exports = router;
