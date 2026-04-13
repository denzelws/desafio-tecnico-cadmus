const mongoose = require('mongoose');

const connect = async () => {
  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/contacts';
  
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB');
};

module.exports = { connect };
