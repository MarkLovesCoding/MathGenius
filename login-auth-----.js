const express = require('express');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcrypt');
const MongoClient = require('mongodb').MongoClient;
const app = express();

// Set up session middleware
app.use(session({
  secret: 'your-session-secret',
  resave: false,
  saveUninitialized: false,
}));

// Set up passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Set up MongoDB connection
MongoClient.connect('mongodb://localhost:27017', { useUnifiedTopology: true }, (err, client) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const db = client.db('mydatabase');

  // Set up local authentication strategy
  passport.use(new LocalStrategy((username, password, done) => {
    db.collection('users').findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }));

  // Set up Google authentication strategy
  passport.use(new GoogleStrategy({
    clientID: 'your-client-id',
    clientSecret: 'your-client-secret',
    callbackURL: 'http://localhost:3000/auth/google/callback',
  }, (accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value;
    db.collection('users').findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        // If the user doesn't exist, create a new user with their Google account info
        const newUser = {
          email: email,
          username: profile.displayName,
          password: bcrypt.hashSync('password', 10), // Generate a random password for the user
        };
        db.collection('users').insertOne(newUser, (err) => {
          if (err) {
            return done(err);
          }
          return done(null, newUser);
        });
      } else {
        return done(null, user);
      }
    });
  }));

  // Set up passport serialization and deserialization functions
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    db.collection('users').findOne({ _id: ObjectId(id) }, (err, user) => {
      done(err, user);
    });
  });

  // Set up routes
  const loginRoute = require('./public/routes/login');
  app.use('/', loginRoute(db));
});

// Start server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
