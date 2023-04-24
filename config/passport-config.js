const passport = require('passport');
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
    try {
      const user = await User.findOne({ username: username, authType: 'local' });
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.comparePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));
  


 // configure Google strategy

passport.use(new GoogleStrategy({
  clientID: "1005807464121-k2r2f22oiemmc5o16936b3so662i02vm.apps.googleusercontent.com",
  clientSecret:"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",
  callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
  try {
    const user = await User.findOne({ googleId: profile.id });
    if (!user) {
      const newUser = new User({
        username: profile.displayName ? profile.displayName : profile.id,
         email: profile.emails && profile.emails.length ? profile.emails[0].value : '',
        googleId: profile.id,
        authType:'google'
      });
      await newUser.save();
      return done(null, newUser);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));




}
module.exports = passportConfig;
