const mongoose = require('mongoose');

// Replace <database-name> with the name of your database
mongoose.connect('mongodb://localhost:27017/<database-name>', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.log(`Error connecting to MongoDB: ${err}`);
});
