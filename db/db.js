const mongoose = require('mongoose');
const mongoURI = 'mongodb://localhost:27017/mathgenius';

mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(`MongoDB Error: ${err}`));

const db = mongoose.connection;

module.exports = db;
