const passport = require('passport');
require('dotenv').config()
const LocalStrategy = require('passport-local').Strategy;

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User'); // assuming you have a user model defined in a separate file


function passportConfig(passport) {
  // configure serialization and deserialization of users
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});
  

  


  passport.use(new LocalStrategy(async (username, password, done) => {
    console.log("LOCAL STRATEGY:")
    try {
      const user = await User.findOne({ username: username, authType: 'local' });
      console.log("user , local",user)
      if (!user) {
        return done(null, false);
      }
      if (!user.comparePassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      console.log("err , local",username)
      return done(err);
    }
  }));
  


 // configure Google strategy

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret:process.env.CLIENT_SECRET,
 
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ googleId: profile.id });
    if (!user) {
      const newUser = new User({
        username: profile.displayName ? profile.displayName : profile.id,
         email: profile.emails && profile.emails.length ? profile.emails[0].value : '',
        googleId: profile.id,
        authType:'google',
        session:{},
        badges:[]
      });
      await newUser.save();
      return done(null, newUser);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));


// try out guest login:


passport.use('guest', new LocalStrategy( async (req, username, done) => {
  try {
    const existingUser = await User.findOne({ username: username ,authType:'guest'});
    if (existingUser && existingUser.guest) {
      return done(null, existingUser);
    } else {
      const newUser = new User({
        username: username,
        guest: true,
        authType:'guest',
        session:{},
        badges:[]
      });
      await newUser.save();
      console.log("newuser")
      return done(null, newUser);
    }
  } catch (error) {
    return done(error);
  }
}));



}
module.exports = passportConfig;
