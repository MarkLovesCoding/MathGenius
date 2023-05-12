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




var validateEmail = function (email) {

  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};





const UserSchema = new mongoose.Schema({
  guest: { type: Boolean, default: false },
  username: {
    type: String,
    minLength: [6, "Username must be 6 or more characters"],
    maxLength: [16, "Username too long."],
    required: function () {
      return this.authType === 'local';
    }
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    validate: function () {
      if (this.authtype === ' google') return true

      return [validateEmail, 'Please fill a valid email address']
    }


    ,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    required: function () {
      return this.authType === 'local';
    }

  },
  password: {
    type: String,
    minLength: [6, "Password must be atleast 6 characters"],
    required: function () {
      return this.authType === 'local';
    }
  },
  authType: {
    type: String,
    enum: ['local', 'google', 'guest'],
    required: true
  },
  googleId: {
    type: String,
    required: function () {
      return this.authType === 'google';
    }
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  session: {
    type: Object,
  },
  badges: {
    type: Array,

  },
  imageSrc: {
    type: String,
    required: false,
    default:'../assets/cat.png'
  }
  // token:{
  //   type:String,
  //   unique:true
  // }
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

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};



// Compare user's password with hashed password
// UserSchema.methods.comparePassword = function (passw, cb) {

//   bcrypt.compare(passw, this.password, (err, isMatch) => {
//     if (err) {
//       return cb(err);
//     }
//     cb(null, isMatch);
//   });
// };





const User = mongoose.model('User', UserSchema);




UserSchema.statics.updateImageSrc = function (userId, newSrc) {
  User.findByIdAndUpdate(userId, { imageSrc: newSrc }, (err, image) => {
    if (err) {
      console.error(`Error updating image source: ${err}`);
    } else {
      console.log(`Image source updated: ${image}`);
    }
  });
};







module.exports = User;
