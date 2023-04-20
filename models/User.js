const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// const UserSchema = new mongoose.Schema({
//   username:{
//     type:String,
//     required:true,
//     unique:true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   googleId:{
//     type:String,
//     unique:true
//   }
// });

const UserSchema = new mongoose.Schema({
  username:{
type:String,
required:function() {
  return this.authType === 'local';
}
  },
  email: {
    type: String,
    required: function() {
      return this.authType === 'local';
    },
    unique: true
  },
  password: {
    type: String,
    required: function() {
      return this.authType === 'local';
    }
  },
  authType: {
    type: String,
    enum: ['local', 'google'],
    required: true
  },
  googleId: {
    type: String,
    required: function() {
      return this.authType === 'google';
    }}
});










// Hash the password before saving the user
UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.password || !user.isModified('password')) {
    return next();
  }

  // Skip password hashing if user is logging in through Google
  if (user.googleId) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

// Compare user's password with hashed password
UserSchema.methods.comparePassword = function (passw, cb) {

  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);

module.exports = User;
