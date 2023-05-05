const nodemailer = require('nodemailer');
const crypto = require('crypto');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'admin@mathgenius.ca',
    pass: process.env.EMAILPASS
  }
});

const token = crypto.randomBytes(20).toString('hex');

app.post('/forgot-password', (req, res) => {
  const { email } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      req.flash('error', 'No account with that email address exists.');
      return res.redirect('/forgot-password');
    }

    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    user.save((err) => {
      if (err) {
        req.flash('error', 'Error saving user with reset token.');
        return res.redirect('/forgot-password');
      }

      const mailOptions = {
        from: 'admin@mathgenius.ca',
        to: email,
        subject: 'Password reset request',
        html: `Please click this link to reset your password: <a href="http://localhost:4000/reset-password/${token}">Reset Password</a>`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          req.flash('error', 'Error sending password reset email.');
          return res.redirect('/forgot-password');
        } else {
          console.log('Email sent: ' + info.response);
          req.flash('success', 'Password reset email sent. Check your inbox.');
          return res.redirect('/forgot-password');
        }
      });
    });
  });
});

app.get('/reset-password/:token', (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('/forgot-password');
    }
    res.render('reset-password', { token: req.params.token });
  });
});

app.post('/reset-password/:token', (req, res) => {
  User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (!user) {
      req.flash('error', 'Password reset token is invalid or has expired.');
      return res.redirect('back');
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    user.save((err) => {
      if (err) {
        req.flash('error', 'Error saving new password.');
        return res.redirect('/reset-password');
      }
      req.logIn(user, (err) => {
        if (err) {
          req.flash('error', 'Error logging in with new password.');
          return res.redirect('/login');
        } else {
          req.flash('success', 'Password successfully reset.');
          return res.redirect('/dashboard');
        }
      });
    });
  });
});
