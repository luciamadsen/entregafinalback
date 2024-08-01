const mongoose = require('mongoose');
const config = require('./config');
const logger = require('../utils/logger');

const connectDB = async () => {
  try {
    await mongoose.connect(config.dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    logger.info('Database connected successfully');
  } catch (err) {
    logger.error('Database connection failed', err);
    process.exit(1);
  }
};

module.exports = connectDB;
