// const mongoose = require('mongoose');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')
require('dotenv').config({ path: '../environmental/mg/.env' });

const mongoURI = process.env.NODE_ENV === 'production'
  ? process.env.MONGOURI_PROD
  : process.env.MONGOURI_DEV;

mongoose.connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(`MongoDB Error: ${err}`));

const store = new MongoStore({
  mongoUrl: mongoURI,
  collectionName: 'sessions',
  ttl:24*60*60
});

store.on('error', (error) => {
  console.error(`MongoDB Store Error: ${error}`);
});

module.exports = {
  db: mongoose.connection,
  store,
};
