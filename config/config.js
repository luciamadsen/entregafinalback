require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  dbUri: process.env.DB_URI,
  jwtSecret: process.env.JWT_SECRET,
  emailService: process.env.EMAIL_SERVICE,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS
};
