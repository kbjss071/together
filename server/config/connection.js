const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/together', {
  useNewUrlParser: true,
});

module.exports = mongoose.connection;
