

const passport = require('passport');
require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User'); // assuming you have a user model defined in a separate file

function passportConfig(passport) {
  // Configure serialization and deserialization of users

  // Serialize user object to store in the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserialize user object from the session
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  // Configure local strategy
  passport.use(new LocalStrategy(async (username, password, done) => {
    console.log("LOCAL STRATEGY:");
    try {
      // Find the user with the provided username and authentication type 'local'
      const user = await User.findOne({ username: username, authType: 'local' });
      console.log("user, local", user);
      if (!user) {
        // User not found
        return done(null, false);
      }
      if (!user.comparePassword(password)) {
        // Password does not match
        return done(null, false);
      }
      // Authentication successful, return the user
      return done(null, user);
    } catch (err) {
      console.log("err, local", username);
      return done(err);
    }
  }));

  // Configure Google strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'https://mathgenius.ca/auth/google/callback'
    // callbackURL: 'localhost:4000/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Find the user with the provided Google ID
      const user = await User.findOne({ googleId: profile.id });
      if (!user) {
        // User not found, create a new user with Google profile data
        const newUser = new User({
          username: profile.displayName ? profile.displayName : profile.id,
          email: profile.emails && profile.emails.length ? profile.emails[0].value : profile.id + "@google.com",
          googleId: profile.id,
          authType: 'google',
          session: {},
          badges: {
            "game": {
              1: false,
              2: false,
              3: false,
              4: false,
              5: false,
            },
            "quiz": {
              1: false,
              2: false,
              3: false,
              4: false,
              5: false,
            },
            "mcquiz": {
              1: false,
              2: false,
              3: false,
              4: false,
              5: false,
            }
          },
        });
        console.log(newUser);
        await newUser.save();
        return done(null, newUser);
      }
      // User found, return the user
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }));

  // Configure guest strategy
  passport.use('guest', new LocalStrategy(async (req, username, done) => {
    try {
      // Check if a guest user with the provided username exists
      const existingUser = await User.findOne({ username: username, authType: 'guest' });
      if (existingUser && existingUser.guest) {
        // Guest user found, return the user
        return done(null,existingUser);
      } else {
        // Guest user not found
        return done(null, false);
      }
    } catch (error) {
      return done(error);
    }
  }));

}

module.exports = passportConfig;

