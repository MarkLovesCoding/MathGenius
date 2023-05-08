// const mongoose = require('mongoose');
// var mongoURI
// if(process.env.NODE_ENV == 'development'){
  
//   mongoURI = process.env.MONGOURI_DEV

// }
//  if(process.env.NODE_ENV == 'production'){
//   mongoURI = process.env.MONGOURI_PROD
// }

// mongoose.connect(mongoURI, { useNewUrlParser: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(`MongoDB Error: ${err}`));

// const db = mongoose.connection;

// module.exports = db;







// const mongoose = require('mongoose');
// const session = require('express-session');
// const connectMongo = require('connect-mongo');
// // const MongoStore = connectMongo(session);


// const mongoURI = process.env.NODE_ENV === 'production' 
//   ? process.env.MONGOURI_PROD 
//   : process.env.MONGOURI_DEV;

// mongoose.connect(mongoURI, { useNewUrlParser: true })
//   .then(() => console.log('MongoDB Connected'))
//   .catch(err => console.log(`MongoDB Error: ${err}`));

// const store =  new connectMongo(session)({
//   mongooseConnection: mongoose.connection,
//   dbName: 'mathgenius',
//   collection: 'sessions'
// });

// store.on('error', (error) => {
//   console.error(`MongoDB Store Error: ${error}`);
// });

// module.exports = {
//   db: mongoose.connection,
//   store
// };

const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')

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
