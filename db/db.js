const mongoose = require('mongoose');
var mongoURI
if(process.env.NODE_ENV = 'development'){
  
  mongoURI = process.env.MONGOURI_PROD
}
if(process.env.NODE_ENV = 'production'){
  mongoURI = process.env.MONGOURI_PROD
}

mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(`MongoDB Error: ${err}`));

const db = mongoose.connection;

module.exports = db;
