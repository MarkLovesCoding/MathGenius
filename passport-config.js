const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// replace this with your database or user model
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
  { id: 3, username: 'user3', password: 'password3' },
];

// serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// deserialize user from session
passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

// use LocalStrategy for username/password authentication
passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  (username, password, done) => {
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      return done(null, false, { message: 'Invalid username or password' });
    }
    return done(null, user);
  }
));

///or


passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await User.findOne({ username });
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        const isMatch = await user.checkPassword(password);
        if (!isMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  );

const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    // lookup user by email address in database
    User.findOne({ email: profile.emails[0].value }, function (err, user) {
      if (err) { return cb(err); }
      if (!user) {
        // create new user with profile data
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value
        });
        user.save(function (err) {
          if (err) console.log(err);
          return cb(err, user);
        });
      } else {
        // user already exists, return user object
        return cb(err, user);
      }
    });
  }
));


//////
//////
///////
/////

























/////////////
//////


const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const User = require('./models/user'); // assuming you have a user model defined in a separate file

function passportConfig(passport) {
  // configure serialization and deserialization of users
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
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
    clientID: 'your-client-id',
    clientSecret: 'your-client-secret',
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
