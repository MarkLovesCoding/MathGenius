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
  
  // configure Local strategy
  passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }));

  // configure Google strategy
  passport.use(new GoogleStrategy({
    clientID: "1005807464121-k2r2f22oiemmc5o16936b3so662i02vm.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id }, (err, user) => {
      if (err) { return done(err); }
      if (!user) {
        const newUser = new User({
          username: profile.displayName,
          googleId: profile.id
        });
        newUser.save((err) => {
          if (err) { return done(err); }
          return done(null, newUser);
        });
      }
      return done(null, user);
    });
  }));
}

module.exports = passportConfig;
